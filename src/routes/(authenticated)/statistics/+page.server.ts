import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // Calculate the date one year ago from today
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Fetch consumption sessions and aggregate data in one query
    const [beersdrank, zuipsessies, consumptionSessions, biggestDrinkers] = await Promise.all([
        prisma.consumption.aggregate({
            _sum: { quantity: true }
        }),
        prisma.consumptionSession.findMany({
            include: { _count: { select: { consumption: true } } }
        }),
        prisma.consumptionSession.findMany({
            where: { date: { gte: oneYearAgo } },
            include: { consumption: true }
        }),
        prisma.consumption.groupBy({
            by: ['consumerId'],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'desc' } },
            take: 3  // Only get the top 3 drinkers
        })
    ]);

    // Process the total beers drank
    const totalBeersDrank = beersdrank._sum.quantity || 0;

    // Initialize arrays to hold the total beers drank and sessions for each month
    const monthlyBeersDrank = Array(12).fill(0);
    const monthlySessions = Array(12).fill(0);

    // Process the fetched data to calculate the total beers drank and sessions per month
    consumptionSessions.forEach(session => {
        const month = session.date.getMonth(); // getMonth returns 0-based index
        session.consumption.forEach(consumption => {
            monthlyBeersDrank[month] += consumption.quantity;
        });
        monthlySessions[month] += 1;
    });

    // Fetch user names for the top 3 drinkers
    const top3 = new Map<string, number>();
    await Promise.all(biggestDrinkers.map(async drinker => {
        const user = await prisma.user.findUnique({
            where: { id: drinker.consumerId },
            select: { name: true }
        });
        if (user && drinker._sum.quantity) {
            top3.set(user.name, drinker._sum.quantity);
        }
    }));

    return {
        totalBeersDrank, zuipsessies, monthlyBeersDrank, monthlySessions, top3
    };
};

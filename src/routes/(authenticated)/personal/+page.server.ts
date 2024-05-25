
import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
    const userId = locals.user?.id
    // Aggregate the total beers consumed by the specific user
    const beersdrank = await prisma.consumption.aggregate({
        _sum: {
            quantity: true,  // We want to sum the 'quantity' field
        },
        where: {
            consumerId: userId,  // Filtering to only include consumptions by the specific user
        },
    });

    // The result object includes a _sum object with the total quantity
    const totalBeersDrank = beersdrank._sum.quantity || 0;  // Handle null just in case no data is found

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const beersDrankThisMonth = await prisma.consumption.aggregate({
        _sum: {
            quantity: true,  // We want to sum the 'quantity' field
        },
        where: {
            consumerId: userId,  // Filtering to only include consumptions by the specific user
            session: {
                date: { gte: oneMonthAgo},  // Filtering to include consumptions from the last month
            },
        },
    });
    const totalBeersDrankThisMonth = beersDrankThisMonth._sum.quantity || 0

    // Query to find all drinking sessions in the past month for a specific user
    const drinkingSessions= await prisma.consumptionSession.findMany({
        where: {
            consumption: {
                some: { // Use 'some' to find sessions where at least one consumption matches
                    consumerId: userId,
                },
            },
        },
        include: {
            _count: {
                select: { consumption: true } // Count of consumptions matching the filter
            },
        },
    });

    const allSessions = drinkingSessions.length
    const averageBeersPerSession = totalBeersDrank / allSessions


    const drinkingSessionsThisMonth = await prisma.consumptionSession.findMany({
        where: {
            AND: [
                {
                    consumption: {
                        some: { // Use 'some' to find sessions where at least one consumption matches
                            consumerId: userId,
                        },
                    },
                },
                {
                    date: {
                        gte: oneMonthAgo,  // Filtering to include sessions from the last month
                    },
                },
            ],
        },
        include: {
            _count: {
                select: { consumption: true } // Count of consumptions matching the filter
            },
        },
    });

    const totalDrinkingSessionsThisMonth = drinkingSessionsThisMonth.length

    return {
        totalBeersDrank, drinkingSessions, averageBeersPerSession, totalDrinkingSessionsThisMonth, totalBeersDrankThisMonth,
    };
};

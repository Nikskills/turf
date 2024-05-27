import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const beersdrank = await prisma.consumption.aggregate({
        _sum: {
            quantity: true,
        }
    });

    const totalBeersDrank = beersdrank._sum.quantity || 0;

    const zuipsessies = await prisma.consumptionSession.findMany({
        include: {
            _count: {
                select: {consumption: true}
            }
        }
    })

    const consumptionSessions = await prisma.consumptionSession.findMany({
        include: {
            consumption: true,
        },

    });

    // Initialize an array to hold the total beers drank for each month
    const monthlyBeersDrank = Array(12).fill(0);
    const monthlySessions = Array(12).fill(0);
    // Process the fetched data to calculate the total beers drank per month
    consumptionSessions.forEach(session => {
        const month = session.date.getMonth(); // getMonth returns 0-based index
        session.consumption.forEach(consumption => {
            monthlyBeersDrank[month] += consumption.quantity;
        });
    });

    consumptionSessions.forEach(session => {
        const month = session.date.getMonth();
        monthlySessions[month] += 1
    })



    return {
        totalBeersDrank, zuipsessies, monthlyBeersDrank, monthlySessions
    }

}
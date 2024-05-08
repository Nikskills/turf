
import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // Assuming `userId` is passed as a parameter to this page/server route
    // ADD params into async function
    //const userId = params.userId; 
    const userId = '230641c9-6add-4b12-b690-2e71c91665c5'
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

    // Query to find all drinking sessions in the past month for a specific user
    const drinkingSessions = await prisma.consumptionSession.findMany({
        where: {
            date: {
                gte: oneMonthAgo, // gte - greater than or equal to one month ago
            },
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

    return {
        totalBeersDrank, drinkingSessions
    };
};

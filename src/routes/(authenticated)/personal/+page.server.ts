
import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // Assuming `userId` is passed as a parameter to this page/server route
    // ADD params into async function
    //const userId = params.userId; 
    const userId = '230641c9-6add-4b12-b690-2e71c91665c5'
    // Aggregate the total beers consumed by the specific user
    const result = await prisma.consumption.aggregate({
        _sum: {
            quantity: true,  // We want to sum the 'quantity' field
        },
        where: {
            consumerId: userId,  // Filtering to only include consumptions by the specific user
        },
    });

    // The result object includes a _sum object with the total quantity
    const totalBeersDrank = result._sum.quantity || 0;  // Handle null just in case no data is found

    return {
        totalBeersDrank
    };
};

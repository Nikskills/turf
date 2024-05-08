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
    return {
        totalBeersDrank, zuipsessies
    }

}
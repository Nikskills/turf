import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
    const stockTransactions = await prisma.stockTransaction.findMany({
        select: {
            transactionDate: true,
            transactionType: true,
            quantity: true,
            user: true,
        }
    })

    const consumptions = await prisma.consumption.findMany({
        select: {
            drinker: true,
            quantity: true,
            session: true,
        }
    })

    return {
        stockTransactions, consumptions
    }

}
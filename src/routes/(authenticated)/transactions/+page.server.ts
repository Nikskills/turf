import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
    const stockTransactions = await prisma.stockTransaction.findMany({
        select: {
            transactionDate: true,
            transactionType: true,
            change_amount: true
        }
    })

    const consumptions = await prisma.consumption.findMany()

    return {
        stockTransactions, consumptions
    }

}
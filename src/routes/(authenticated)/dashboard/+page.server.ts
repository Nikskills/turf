import prisma from '$lib/prisma'
import type { PageServerLoad } from './$types'


export const load: PageServerLoad = async () => {
    const sessions = await prisma.consumptionSession.findMany({
        select: {
            description: true,
            date: true,
            consumption: {
                select: {
                    quantity: true,
                    drinker: {
                        select: {
                            name: true
                        }
                    },
                }
            }
        }
    })
    
    const transactions = await prisma.stockTransaction.findMany();
    let totalStock = 0;
    transactions.forEach(transaction => {
        totalStock += transaction.quantity
    });
    return {sessions, totalStock}
}






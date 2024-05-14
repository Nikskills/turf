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


    const beers =  await prisma.stockTransaction.findMany({
        where: {
            transactionType: 'CONSUMPTION'
        },
        select: {
            quantity: true
        }
    });

    let totalBeersDrank = 0;
    beers.forEach(beer => {
        totalBeersDrank -= beer.quantity
    })

    return {sessions, totalStock, totalBeersDrank}
}







import { redirect, type Actions } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
        // If not authenticated, redirect to login page
        throw redirect(302, "/login");
    }

    if (locals.user?.name !== "Huis") {
        throw redirect(302, '/login')
    }

    const users = await prisma.user.findMany({
        select: {
            name: true,
            //image must be rendered
        }
        
    })

    const sessions = await prisma.consumptionSession.findMany({
        orderBy: {
            date: 'desc'
        },
        take: 6,
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

    return {
        users, sessions
    };
};


export const actions: Actions = {
    default: async ({request}) => {
        const formData = await request.formData();
        const counts: Record<string, number> = {};

        formData.forEach((value, key) => {
            counts[key] = Number(value)
        })

        for (const user in counts) {
            if (counts[user] != 0){
                const drinkerId = await prisma.user.findFirst({
                    where: { name: user},
                    select: {id: true}
                })
                if (drinkerId != null){ 
                    createConsumptionSessionAndTransactions("", drinkerId?.id, counts[user])
                }
               
            }
        }
    }
}

async function createConsumptionSessionAndTransactions(description: string, userId: string, count: number){
    const result = await prisma.consumptionSession.create({
        data: {
            description: description,
            date: new Date(),
            creator: {
                connect: { id: userId } 
            },
            consumption: {
                create: [
                    {
                        drinker: {
                            connect: { id: userId }
                        },
                        quantity: count,
                    },
                ]
            }
        },
        include: {
            consumption: true // Optionally include related consumptions in the result
        }
    });

    const result2 = await prisma.stockTransaction.create({
        data: {
            user: {
                connect: { id: userId }
            },
            quantity: -count, 
            cost: null, 
            purchaseDate: null, 
            transactionType: "CONSUMPTION",
            transactionDate: new Date()
        }
    })
    console.log("Created consumption session and transactions", result);
    console.log("Created transaction", result2)
    const price = await prisma.stockTransaction.findFirst({
        select: {
            cost: true,
            quantity: true
        }
    })
    if (price != null && price.cost != null) {
        const pricePerBeer = price.cost / price.quantity
        await prisma.user.update({
            where: { id: userId},
            data : {
                balance: {
                    increment: -(count * pricePerBeer).toPrecision(3)
                }
            }
        })
    }
     
}

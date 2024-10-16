import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit'

export const load: PageServerLoad = async () => {
    const users = await prisma.user.findMany({
        select: { name: true },
    });
    return { users };
};




export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const description = formData.get('beschrijving') as string;
        const counts:  Record<string, number> = {};
        
        formData.forEach((value, key) => {
            if (key !== 'beschrijving') {
                counts[key] = Number(value);
            }
        });


        for (const user in counts) {
            if (counts[user] != 0){
                const drinkerId = await prisma.user.findFirst({
                    where: { name: user},
                    select: {id: true}
                })
                if (drinkerId != null){ 
                    createConsumptionSessionAndTransactions(description, drinkerId?.id, counts[user])
                }
               
            }
        }
        console.log('Received counts:', counts);
        console.log('Received description:', description);

        return redirect(303, '/dashboard')

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
            consumption: true 
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
        where: {
            transactionType: 'PURCHASE',
        },
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


  
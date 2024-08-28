import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
    const userId = locals.user?.id as string
    // This months
    const{beersDrank, zuipsessies, dailyBeersDrank} = await thisMonth(userId)
    const{beersDrankForever, allZuipsessies} = await forever(userId)
    return {beersDrank, zuipsessies, dailyBeersDrank, beersDrankForever, allZuipsessies}
};

async function thisMonth(userId: string){
    //Define the current month
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    //Fetch the basic metrics
    const [beersDrank, zuipsessies] = await Promise.all([
        prisma.consumption.aggregate({
            where: {
                session: {
                    date: {gte: oneMonthAgo}
                },
                consumerId: userId,
                
            },
            _sum: { quantity: true }
        }),
        prisma.consumptionSession.findMany({
            where: { 
                date: { gte: oneMonthAgo },
                consumption: {
                    every: {consumerId: userId}
                } 
            },
            include: { consumption: true }
        }),
    ]);
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const dailyBeersDrank = Array(daysInMonth).fill(0)
    zuipsessies.forEach(session => {
        const day = new Date(session.date).getDate()-1;        
        console.log(day)
        session.consumption.forEach(consumption => {
            dailyBeersDrank[day] += consumption.quantity
        })

    })
    return {beersDrank, zuipsessies, dailyBeersDrank}
}

async function forever(userId: string){
    const [beersDrankForever, allZuipsessies] = await Promise.all([
        prisma.consumption.aggregate({
            where: {
                consumerId: userId,
                
            },
            _sum: { quantity: true }
        }),
        prisma.consumptionSession.findMany({
            where: { 
                consumption: {
                    every: {consumerId: userId}
                } 
            },
            include: { consumption: true }
        }),
    ]);
    return {beersDrankForever, allZuipsessies }
}

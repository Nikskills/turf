import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({request}) => {
    const data = await request.json();

    const settlementId= await prisma.settlement.findFirst({
        where: {
            debtorId: data.debtorId,
            creditorId: data.creditorId,
            paid: false,
        },
        select: {
            id: true,
        }
    })

    if(typeof(settlementId?.id) === 'string'){
        await prisma.settlement.update({
            where: {
                id: settlementId.id,
            },
            data: {
                paid: true
            }
        })
    }

    const settlements = await prisma.settlement.findMany({
        where: {
            amount: {
                not: 0
            }
        }
    }
    )

    await prisma.user.update({
        where: {
            id: data.creditorId,
        },
        data: {
            balance: {decrement: parseFloat(data.amount)}
        }
    })

    await prisma.user.update({
        where: {
            id: data.debtorId,
        },
        data: {
            balance: {increment: parseFloat(data.amount)}
        }
    })

    return new Response(JSON.stringify(settlements), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    
}
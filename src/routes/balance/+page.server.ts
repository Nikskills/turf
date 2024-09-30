import { redirect, } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';
import prisma from "$lib/prisma";


export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
        throw redirect(302, "/login");
    }

    if (locals.user?.name !== "Huis") {
        throw redirect(302, '/dashboard')
    }

    const users = await prisma.user.findMany({
        select: {
            name: true,
            balance: true
        }
    })

    const remainingBeers = await getRemainingBeers()

    return {users, remainingBeers}

}

async function getRemainingBeers() {
    // Step 1: Sum of purchased beers (quantity from StockTransaction where transactionType is PURCHASE)
    const totalPurchased = await prisma.stockTransaction.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        transactionType: 'PURCHASE',
      },
    });
  
    // Step 2: Sum of consumed beers (quantity from Consumption)
    const totalConsumed = await prisma.consumption.aggregate({
      _sum: {
        quantity: true,
      },
    });
  
    // Step 3: Calculate remaining stock
    const remainingBeers = (totalPurchased._sum.quantity ?? 0) - (totalConsumed._sum.quantity ?? 0);
  
    return remainingBeers;
  }
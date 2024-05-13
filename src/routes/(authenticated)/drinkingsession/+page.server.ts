import prisma from '$lib/prisma';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

// Load action
export const load: PageServerLoad = async () => {
    const users = await prisma.user.findMany({
        select: { name: true },
    });
    return { users };
};

// Actions
export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const hoeveelheid = parseInt(data.get('hoeveelheid') as string);
        const gebruiker = data.get('namen') as string;
        const kosten = parseFloat(data.get('kosten') as string);
        const gekochtOp = data.get('datum') as string;

        if (!hoeveelheid || !gebruiker || !kosten || !gekochtOp) {
            return new Response("All fields must be filled out.", { status: 400 });
        }

        const buyer = await prisma.user.findFirst({
            where: { name: gebruiker },
            select: { id: true },
        });

        if (!buyer) {
            return new Response(JSON.stringify({ error: "User not found." }), { status: 400, headers: {'Content-Type': 'application/json'} });
        }

        const gekochtOpDate = new Date(gekochtOp);
        if (isNaN(gekochtOpDate.getTime())) {
            return new Response(JSON.stringify({ error: "Invalid date format." }), { status: 400, headers: {'Content-Type': 'application/json'} });
        }

        await prisma.stockTransaction.create({
            data: {
                quantity: hoeveelheid,
                user: { connect: { id: buyer.id } },
                purchaseDate: gekochtOpDate,
                cost: kosten,
                transactionType: 'PURCHASE',
                transactionDate: new Date()
            }
        });
        return redirect(303, `/dashboard`);
    }
};

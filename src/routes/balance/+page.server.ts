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

    return {users}

}
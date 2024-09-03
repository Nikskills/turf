
import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

import type { PageServerLoad } from "../$types";

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



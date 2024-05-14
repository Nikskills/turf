import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const users = await prisma.user.findMany({
        select: { name: true },
    });
    return { users };
};


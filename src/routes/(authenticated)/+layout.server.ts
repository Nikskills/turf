
import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals }) => {
    console.log("checked")
	if (!locals.session) {
        // If not authenticated, redirect to login page
        throw redirect(302, "/login");
    }

    // Fetch user data if needed
    const user = locals.session.userId;

    return {
        user
    };
};

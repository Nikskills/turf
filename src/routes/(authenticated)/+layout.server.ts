
import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.session) {
        // If not authenticated, redirect to login page
        throw redirect(302, "/login");
    }

    const currentPath = url.pathname;  // Get the server-side URL path

    if (locals.user?.name === "Huis" && !currentPath.includes('/newsupply') && !currentPath.includes('/balance')) {
        throw redirect(302, '/kassa');
    }

    // Fetch user data if needed
    const user = locals.session.userId;

    return {
        user
    };
};

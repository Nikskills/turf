
import { lucia } from "$lib/server/auth";
import { json } from "@sveltejs/kit";



export const POST = async ({locals, cookies }) => {
    if (!locals.session) {
        return json({ error: "Not authenticated" }, { status: 401 });
    }
		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		return json({ success: true, redirect: '/login' });
}
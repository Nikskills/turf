import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { hash } from "@node-rs/argon2";
import type { Actions } from "../$types";
import prisma from '$lib/prisma'

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get("email");
		const password = formData.get("password");
        const name = formData.get("name") as string;
		// email must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive

		if (
            typeof email !== "string" ||
            email.length < 3 ||
            email.length > 60 ||
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ) {
            console.log("invalid email")
			return fail(400, {
				message: "Invalid email"
			});
		}
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: "Invalid password"
			});
		}

		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		// TODO: check if email is already used
        const userExists = await prisma.user.findUnique({
            where: {email: email}
        })
        if (!userExists) {
            await prisma.user.create({
                data: {
                    email: email,
                    password: passwordHash,
                    balance: 0,
                    name: name,
                }
            });
        }else {
            return new Response("user already exists exists")
        }
        const userId = await prisma.user.findUnique({
            where: {email: email},
            select: {id: true}
        })

        if (userId){
            console.log("User created")
            const session = await lucia.createSession(userId?.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
    
            redirect(302, "/login");
        }
        return new Response()
        

	}
};
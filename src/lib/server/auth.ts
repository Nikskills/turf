// src/lib/server/auth.ts
import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from '$lib/prisma'


interface DatabaseUserAttributes {
    email: string;
    name: string,
    balance: number
}

const adapter = new PrismaAdapter(prisma.session, prisma.user)
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
    getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			email: attributes.email,
            name: attributes.name,
            balance: attributes.balance
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}



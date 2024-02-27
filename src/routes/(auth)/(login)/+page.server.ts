import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { db } from '$lib/db';
import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const exist = await db.query.userTable.findFirst({
			where: (users, { eq }) => eq(users.username, form.data.username)
		});

		if (!exist) {
			error(400, 'Wrong Username or Password');
		}

		const validPassword = await new Argon2id().verify(exist.password!, form.data.password);
		if (!validPassword) {
			error(400, 'Wrong Username or Password');
		}

		const session = await lucia.createSession(exist.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return {
			form
		};
	}
};

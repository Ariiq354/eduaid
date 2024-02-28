import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/');
	return {
		username: event.locals.user.username,
		role: event.locals.user.role
	};
};

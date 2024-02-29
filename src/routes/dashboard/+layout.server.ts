import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	return {
		role: event.locals.user!.role
	};
}) satisfies LayoutServerLoad;

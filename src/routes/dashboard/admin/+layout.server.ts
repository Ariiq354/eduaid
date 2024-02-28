import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/');
	if (event.locals.user.role !== 2) redirect(302, '/dashboard');
};
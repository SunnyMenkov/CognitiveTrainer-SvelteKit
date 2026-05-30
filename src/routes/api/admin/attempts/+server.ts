import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { testAttempt } from '$lib/server/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET({ url }) {
	try {
		const slug = url.searchParams.get('slug');
		const userId = url.searchParams.get('userId');

		let query = db.select().from(testAttempt).orderBy(desc(testAttempt.startedAt));

		const conditions = [];
		if (slug) conditions.push(eq(testAttempt.testSlug, slug));
		if (userId) conditions.push(eq(testAttempt.userId, userId));

		if (conditions.length > 0) {
			query = query.where(and(...conditions));
		}

		const attempts = await query;
		return json(attempts);
	} catch (error) {
		console.error('Error fetching attempts:', error);
		return json({ error: 'Failed to fetch attempts' }, { status: 500 });
	}
}

export async function DELETE({ params }) {
	try {
		const { id } = params;
		await db.delete(testAttempt).where(eq(testAttempt.id, id));
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting attempt:', error);
		return json({ error: 'Failed to delete attempt' }, { status: 500 });
	}
}

import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';

export async function GET() {
    try {
        const users = await db
            .select({
                id: user.id,
                name: user.name,
                email: user.email
            })
            .from(user)
            .orderBy(user.name);

        return json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
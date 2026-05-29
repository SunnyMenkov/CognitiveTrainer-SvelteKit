import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    // Проверяем авторизацию
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    // Если не админ, но авторизован - показываем личную статистику
    if (!locals.user.isAdmin) {
        return {
            isAdmin: false,
            currentUserId: locals.user.id
        };
    }

    // Админ видит все
    return {
        isAdmin: true,
        currentUserId: null
    };
}
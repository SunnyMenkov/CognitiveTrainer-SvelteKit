<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutServerData } from './$types';

	let { children, data }: { children: any; data: LayoutServerData } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<!-- Навбар сверху -->
<nav class="navbar">
	<div class="nav-container">
		<!-- Левая группа кнопок -->
		<div class="nav-left">
			<a class="nav-button" href="/">Главная</a>
			<a class="nav-button" href="/about">О тестах</a>
			{#if data.user?.isAdmin}
				<a class="nav-button" href="/admin">Админ-панель</a>
			{:else}
				<a class="nav-button" href="/admin">Статистика</a>
			{/if}
		</div>

		<!-- Правая группа: логин / информация о пользователе -->
		<div class="nav-right">
			{#if data.user}
				<span class="user-name">Привет, {data.user.name}!</span>
				<form method="post" action="/logout">
					<button class="nav-button logout" type="submit">Выйти</button>
				</form>
			{:else}
				<a class="nav-button login" href="/login">Войти</a>
			{/if}
		</div>
	</div>
</nav>


{@render children()}

<style>
	/* Сброс базовых отступов и установка box-sizing */
	/* :global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	} */

	:global(body) {
        margin: 0;
		font-family: Arial, sans-serif;
		background-color: #253c5f;
	}
.navbar {
		background-color: #22334d;
		padding: 15px 0;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		width: 100%;
		z-index: 1000;
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
		display: flex;
		align-items: center;
		justify-content: space-between; /* Раздвигает левую и правую группы */
		gap: 20px;
		flex-wrap: wrap; /* Позволяет переносить кнопки на узких экранах */
	}

	/* Левая группа кнопок */
	.nav-left {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap; /* Кнопки переносятся, если не влазят */
	}

	/* Правая группа с логином / профилем */
	.nav-right {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-shrink: 0; /* Не сжимается, чтобы логин всегда был виден справа */
	}

	.nav-button {
		background-color: white;
		color: black;
		border: none;
		padding: 8px 16px;
		font-size: 16px;
		cursor: pointer;
		border-radius: 5px;
		transition:
			background-color 0.3s ease,
			transform 0.1s ease;
		display: inline-block;
		text-decoration: none;
		font-family: inherit;
		white-space: nowrap;
		text-align: center;
	}

	.nav-button:hover {
		background-color: rgb(162, 162, 162);
	}

	.nav-button:active {
		transform: scale(0.98);
	}

	.nav-button.login {
		background-color: #4caf50;
		color: white;
        /* margin-top: 4%; */
	}

	.nav-button.login:hover {
		background-color: #43a047;
	}

	.nav-button.logout {
		background-color: transparent;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.4);
        margin-top: 4%;

	}

	.nav-button.logout:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.user-name {
		color: white;
		font-size: 14px;
		font-weight: 500;
	}

	:global(a:link),
	:global(a:visited) {
		color: black;
		text-decoration: none;
	}
</style>

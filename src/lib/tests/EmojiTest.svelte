<script lang="ts">
	const EMOJIS = [
		'😀',
		'😃',
		'😄',
		'😁',
		'😆',
		'😅',
		'😂',
		'🙂',
		'🙃',
		'😉',
		'😊',
		'😇',
		'😍',
		'😘',
		'😗',
		'😙',
		'😚',
		'😋',
		'😛',
		'😜',
		'🤓',
		'😎',
		'😏',
		'😐',
		'😑',
		'🙂',
		'🙄',
		'😬',
		'🤥',
		'😶',
		'🤠',
		'😳',
	];

	const TEST_DURATION = 1;

	let currentEmoji = $state('😀');
	let previousEmoji = $state('😀');

	let started = $state(false);
	let finished = $state(false);

	let timeLeft = $state(TEST_DURATION);

	let score = $state(0);
	let mistakes = $state(0);
	let totalAnswers = $state(0);

	let actualChanged = $state(false);

	let timerInterval: number;

	function randomEmoji(exclude?: string) {
		let filtered = exclude
			? EMOJIS.filter((e) => e !== exclude)
			: EMOJIS;

		return filtered[
			Math.floor(Math.random() * filtered.length)
		];
	}

	function generateNextEmoji() {
		previousEmoji = currentEmoji;

		// 50% шанс изменения
		actualChanged = Math.random() > 0.5;

		if (actualChanged) {
			currentEmoji = randomEmoji(currentEmoji);
		} else {
			currentEmoji = previousEmoji;
		}
	}

	function answer(userThinksChanged: boolean) {
		if (!started || finished) return;

		totalAnswers++;

		if (userThinksChanged === actualChanged) {
			score++;
		} else {
			mistakes++;
		}

		generateNextEmoji();
	}

	function startTest() {
		cleanup();

		started = true;
		finished = false;

		score = 0;
		mistakes = 0;
		totalAnswers = 0;

		timeLeft = TEST_DURATION;

		currentEmoji = randomEmoji();
		previousEmoji = currentEmoji;

		generateNextEmoji();

		timerInterval = window.setInterval(() => {
			timeLeft--;

			if (timeLeft <= 0) {
				finishTest();
			}
		}, 1000);
	}

	function finishTest() {
		finished = true;
		started = false;

		cleanup();
	}

	function cleanup() {
		clearInterval(timerInterval);
	}

	const accuracy = $derived(
		totalAnswers === 0
			? 0
			: Math.round((score / totalAnswers) * 100)
	);
</script>

<svelte:head>
	<title>Emoji Cognitive Test</title>
</svelte:head>

<div class="wrapper">
	<div class="stats">
		<div>
			<span>Время</span>
			<strong>{timeLeft}s</strong>
		</div>

		<div>
			<span>Очки</span>
			<strong>{score}</strong>
		</div>

		<div>
			<span>Ошибки</span>
			<strong>{mistakes}</strong>
		</div>

		<div>
			<span>Точность</span>
			<strong>{accuracy}%</strong>
		</div>
	</div>

	<div class="emoji-card">
		<div class="emoji">
			{currentEmoji}
		</div>
	</div>

	{#if !started && !finished}
		<button class="start" onclick={startTest}>
			Начать тест
		</button>
	{/if}

	{#if started}
		<div class="buttons">
			<button onclick={() => answer(true)}>
				Изменился
			</button>

			<button onclick={() => answer(false)}>
				Не изменился
			</button>
		</div>
	{/if}

	{#if finished}
		<div class="result">
			<h2>Тест завершён</h2>

			<p class="right">Правильных: {score}</p>
			<p class="error">Ошибок: {mistakes}</p>
			<p>Точность: {accuracy}%</p>

			<button class="restart" onclick={startTest}>
				Пройти снова
			</button>
		</div>
	{/if}

</div>

<style>
	.wrapper {
		margin: 0;
		font-family: Inter, sans-serif;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 24px;
		gap: 24px;
	}

	h1 {
		margin: 0;
		font-size: 2rem;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		width: 100%;
		max-width: 700px;
	}

	.stats div {
		/* background: #1e293b; */
		background: #364b6c;
		padding: 16px;
		border-radius: 16px;
		text-align: center;
	}

	.stats span {
		display: block;
		opacity: 0.7;
		margin-bottom: 8px;
	}

	.stats strong {
		font-size: 1.5rem;
	}

	.emoji-card {
		width: 260px;
		height: 260px;
		background: #364b6c;
		border-radius: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10px 30px rgba(0,0,0,0.3);
	}

	.emoji {
        font-family: sans-serif;
        font-variant-emoji: text;
		font-size: 7rem;
		user-select: none;
	}

	.buttons {
		display: flex;
		gap: 16px;
	}

	button {
		border: none;
		border-radius: 14px;
		padding: 14px 22px;
		font-size: 1rem;
		cursor: pointer;
		transition: 0.2s;
		font-weight: 600;
	}

	button:hover {
		transform: translateY(-2px);
	}

	.start,
	.restart {
		background: #22c55e;
		color: white;
	}

	.buttons button:first-child {
		background: #3b82f6;
		color: white;
	}

	.buttons button:last-child {
		background: #ef4444;
		color: white;
	}

	.result {
		background: #364b6c;
		padding: 24px;
		border-radius: 20px;
		text-align: center;
		min-width: 280px;
	}

	.error {
		color: #ff4d4d !important;
	}

	.right {
		color: #4caf50 !important;
	}


	.result h2 {
		margin-top: 0;
	}
</style>
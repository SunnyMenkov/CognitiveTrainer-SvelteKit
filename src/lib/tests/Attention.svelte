<script>
	// Svelte 5 runes
	let n = $state(30); // сколько чисел всего
	let m = $state(5);  // сколько нужно найти

	let numbers = $state([]);
	let targets = $state(new Set());
	let found = $state(new Set());

	let started = $state(false);
	let startTime = $state(0);
	let elapsed = $state(0);
	let intervalId = null;

	function generateTest() {
		if (m > n) {
			alert("m не может быть больше n");
			return;
		}

		// генерируем уникальные числа
		const arr = new Set();
		while (arr.size < n) {
			arr.add(Math.floor(Math.random() * 1000));
		}
		numbers = Array.from(arr);

		// выбираем m случайных целей
		const shuffled = [...numbers].sort(() => Math.random() - 0.5);
		targets = new Set(shuffled.slice(0, m));

		found = new Set();
		started = false;
		stopTimer();
		elapsed = 0;
	}

	function startTest() {
		started = true;
		startTime = Date.now();

		intervalId = setInterval(() => {
			elapsed = Math.floor((Date.now() - startTime) / 1000);
		}, 1000);
	}

	function stopTimer() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}

	function handleClick(num) {
		if (!started) return;

		if (targets.has(num)) {
			found.add(num);
			found = new Set(found);

			// завершение теста
			if (found.size === targets.size) {
				stopTimer();
				alert(`Готово! Время: ${elapsed} сек`);
			}
		}
	}
</script>

<div class="controls">
	<label>
		Всего чисел (n):
		<input type="number" bind:value={n} min="1" />
	</label>

	<label>
		Найти чисел (m):
		<input type="number" bind:value={m} min="1" />
	</label>

	<button on:click={generateTest}>Сгенерировать</button>
	<button on:click={startTest} disabled={!numbers.length || started}>
		Старт
	</button>
</div>

<p>Время: {elapsed} сек</p>
<p>Найдено: {found.size} / {targets.size}</p>

{#if started}
	<p><strong>Найди числа:</strong> {[...targets].join(', ')}</p>
{/if}

<div class="grid">
	{#each numbers as num}
		<button
			class:selected={found.has(num)}
			on:click={() => handleClick(num)}
		>
			{num}
		</button>
	{/each}
</div>


<style>
	:global(body) {
		margin: 0;
		font-family: Arial, sans-serif;
		background: #0c1452;
		color: black;
	}

	h1 {
		text-align: center;
		margin-bottom: 20px;
	}

	.controls,
	.grid,
	p {
		max-width: 900px;
		margin-inline: auto;
	}

	.controls {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
		flex-wrap: wrap;
		padding: 20px;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 20px;
		backdrop-filter: blur(8px);
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	input {
		padding: 8px 12px;
		border: none;
		border-radius: 12px;
		outline: none;
	}

	button {
		padding: 10px 14px;
		border: none;
		border-radius: 14px;
		cursor: pointer;
		font-size: 16px;
		transition: 0.2s;
	}

	button:hover {
		transform: scale(1.03);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
		gap: 12px;
		padding: 20px;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 24px;
		backdrop-filter: blur(8px);
		margin-top: 20px;
	}

	.grid button {
		background: white;
		color: #0c1452;
		font-weight: bold;
		min-height: 60px;
	}

	.selected {
		background: #4caf50 !important;
		color: black !important;
	}
</style>
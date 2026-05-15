<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<body>
  <!-- Навбар сверху -->
    <nav class="navbar">
        <div class="nav-container">
            <a class="nav-button" href="../">Главная</a>
            <a class="nav-button" href="../about/">О тестах</a>
        </div>
    </nav>
</body>

<style>


/* Сброс базовых отступов и установка box-sizing */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #253c5f; 
    /* bcc1c8 */
}

/* Стили для навбара */
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
    justify-content: center;
    gap: 20px;
}

/* Стили для кнопки "Главная" */
.nav-button {
    background-color:white;
    color: black;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.1s ease;
}


a:link, a:visited {
    color: black;
    text-decoration: none;
    
}

/* Эффекты при наведении и нажатии */
.nav-button:hover {
    background-color:rgb(162, 162, 162);
}

.nav-button:active {
    transform: scale(0.98);
}

</style>

{@render children()}

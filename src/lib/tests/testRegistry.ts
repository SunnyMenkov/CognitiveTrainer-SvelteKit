export const testRegistry = {
    emoji: {
        title: "Тест на смену эмодзи",
        description: "Определите, изменился ли эмодзи или остался прежним",
        component: () => import("$lib/tests/EmojiTest.svelte")

    },
    attention: {
        title: "Тест на внимание",
        description: "Найти m из n чисел как можно быстрее",
        component: () => import("$lib/tests/Attention.svelte")
    }
}
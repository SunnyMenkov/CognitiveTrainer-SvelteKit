export const testRegistry = {
    stroop: {
        title: "Тест струпа",
        description: "Это тест на цвет слова",
        component: () => import("$lib/tests/StroopTest.svelte")

    },
    attention: {
        title: "Тест на внимание",
        description: "Найти m из n чисел как можно быстрее",
        component: () => import("$lib/tests/Attention.svelte")
    }
}
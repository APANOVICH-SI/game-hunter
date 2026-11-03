console.log("1. 👍 Файл script.js успішно підтягнувся браузером і почав виконуватися!");

document.addEventListener('DOMContentLoaded', () => {
    console.log("2. 🕒 Подія DOMContentLoaded спрацювала. Сторінка повністю завантажилась.");

    // Шукаємо всі блоки .card, які мають атрибут data-href
    const cards = document.querySelectorAll('.card[data-href]');
    
    console.log(`3. 🔎 Знайдено карток із атрибутом data-href: ${cards.length}`);
    
    if (cards.length === 0) {
        console.warn("⚠️ УВАГА: Скрипт не знайшов жодної картки! Перевірте, чи правильно написаний атрибут data-href в HTML.");
    }

    cards.forEach((card, index) => {
        const url = card.getAttribute('data-href');
        console.log(`   👉 Картка №${index + 1}: успішно прив'язано клік до URL: "${url}"`);

        card.addEventListener('click', () => {
            console.log(`4. 🖱️ Зафіксовано КЛІК по картці №${index + 1}! Намагаюся перейти на: ${url}`);
            
            if (url) {
                window.location.href = url;
            } else {
                console.error("❌ Помилка: Клік відбувся, але URL порожній!");
            }
        });
    });
});
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
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const thumbs = document.querySelectorAll('.thumb');

// Функція перемикання слайдів стрілками
function moveSlide(direction) {
    let newIndex = currentSlideIndex + direction;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;
    setSlide(newIndex);
}

// Функція встановлення конкретного слайда
function setSlide(index) {
    slides[currentSlideIndex].classList.remove('active-slide');
    thumbs[currentSlideIndex].classList.remove('active-thumb');
    
    currentSlideIndex = index;
    
    slides[currentSlideIndex].classList.add('active-slide');
    thumbs[currentSlideIndex].classList.add('active-thumb');
    
    // Поставити відео на паузу, якщо ми перемкнулися на картинку
    const iframe = slides[index].querySelector('iframe');
    if (!iframe) {
        const activeIframe = document.querySelector('iframe');
        if (activeIframe) {
            const src = activeIframe.src;
            activeIframe.src = src; // перезавантажує iframe, зупиняючи відео
        }
    }
}

// Ефект Лупи: Рух збільшеної картинки за мишкою
function zoomImage(event) {
    const slide = event.currentTarget;
    const img = slide.querySelector('img');
    if (!img) return;
    
    // Отримуємо координати мишки відносно контейнера слайда
    const rect = slide.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Переводимо у відсотки
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    // Зміщуємо центр трансформації (звідки робиться зум)
    img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
}

// Скидання зуму, коли мишка йде геть
function resetZoom(event) {
    const img = event.currentTarget.querySelector('img');
    if (img) {
        img.style.transformOrigin = 'center center';
    }
}

function openTab(event, tabId) {
    // 1. Приховуємо всі вкладки
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(panel => panel.classList.remove('active'));

    // 2. Робимо всі кнопки неактивними
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 3. Показуємо поточну вкладку та активуємо кнопку
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}
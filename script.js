// Скрипт для свадебного сайта
console.log('Свадебный сайт загружен');

// Таймер отсчета до свадьбы
function updateCountdown() {
    const weddingDate = new Date('2026-06-08T15:30:00'); // 8 июня 2026, 15:30
    const now = new Date();
    
    const diff = weddingDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Форматирование с ведущими нулями
        document.getElementById('days').textContent = days.toString().padStart(3, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // Если дата свадьбы наступила
        document.querySelector('.countdown-timer').innerHTML = '<div class="wedding-day-message">СВАДЬБА СЕГОДНЯ! ❤️</div>';
    }
}

// Простое появление элементов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Запускаем таймер
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Добавьте этот код в функцию, которая выполняется при загрузке DOM
    
    // Проверка наличия фото даты (4.png)
    const datePhoto = document.querySelector('.date-photo');
    if (datePhoto) {
        const dateImg = new Image();
        dateImg.src = '4.png';
        
        dateImg.onload = function() {
            console.log('Фото даты "4.png" успешно загружено');
        };
        
        dateImg.onerror = function() {
            console.warn('Фото даты "4.png" не найдено');
            console.log('Поместите файл "4.png" в ту же папку, что и index.html');
            
            // Запасное изображение
            datePhoto.src = 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
        };
    }
    

    
    // Проверка наличия фонового изображения для hero
    const hero = document.querySelector('.hero');
    if (hero) {
        const bgImage = new Image();
        bgImage.src = '1.png';
        
        bgImage.onload = function() {
            console.log('Фоновое изображение "1.jpg" успешно загружено');
        };
        
        bgImage.onerror = function() {
            console.warn('Фоновое изображение "1.jpg" не найдено');
            console.log('Поместите файл "1.jpg" в ту же папку, что и index.html');
            
            // Запасной фон если фото не найдено
            hero.style.backgroundImage = 'url(https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)';
        };
    }
    
    // Проверка наличия фото локации
    const locationPhoto = document.querySelector('.location-photo');
    if (locationPhoto) {
        const locationImg = new Image();
        locationImg.src = '2.png';
        
        locationImg.onload = function() {
            console.log('Фото локации "2.png" успешно загружено');
        };
        
        locationImg.onerror = function() {
            console.warn('Фото локации "2.png" не найдено');
            console.log('Поместите файл "2.png" в ту же папку, что и index.html');
            
            // Запасное фото
            locationPhoto.src = 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
        };
    }
    
    // Проверка наличия фото палитры
    const paletteImage = document.querySelector('.palette-image');
    if (paletteImage) {
        const palette = new Image();
        palette.src = '3.png';
        
        palette.onload = function() {
            console.log('Палитра "3.png" успешно загружена');
        };
        
        palette.onerror = function() {
            console.warn('Палитра "3.png" не найдена');
            console.log('Поместите файл "3.png" в ту же папку, что и index.html');
            
            // Запасное изображение палитры
            paletteImage.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
        };
    }
    
    // Обработчик для кнопки "Посмотреть на карте" (уже есть в HTML)
    
    // Обработчик формы RSVP
    // Обработчик формы RSVP
    const rsvpForm = document.querySelector('.rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                guests: this.querySelector('.form-select').value || '1',
                attendance: this.querySelector('input[name="attendance"]:checked')?.value
            };
            
            // Проверка заполнения полей
            if (!formData.name || !formData.phone || !formData.attendance) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            console.log('Данные формы:', formData);
            
            // URL вашего Google Apps Script (ЗАМЕНИТЕ НА СВОЙ ПОСЛЕ РАЗВЕРТЫВАНИЯ)
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxaAw2PYdxwHj8aL4Fsr1F2x2vYx2A10ee4FzD-jpgdQheMrgv0TdJ5JD48QXs_Wh57/exec';
            
            try {
                // Отправка данных на Google Apps Script
                const response = await fetch(scriptURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    if (formData.attendance === 'yes') {
                        alert('Спасибо! Мы будем ждать вас на нашей свадьбе 8 июня 2026 года!');
                    } else {
                        alert('Спасибо за ваш ответ! Жаль, что вы не сможете быть с нами в этот день.');
                    }
                    console.log('Данные сохранены в таблицу:', result.spreadsheetUrl);
                    
                    // Очистка формы
                    this.reset();
                } else {
                    alert('Ошибка при сохранении данных: ' + result.message);
                }
                
            } catch (error) {
                console.error('Ошибка отправки:', error);
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
            }
        });
    }
});


// Музыкальный плеер с круговым текстом
const playButton = document.getElementById('playButton');
const weddingMusic = document.getElementById('weddingMusic');
const circlePlayer = document.querySelector('.circle-player');

let isPlaying = false;

if (playButton && weddingMusic && circlePlayer) {
    playButton.addEventListener('click', function() {
        this.classList.toggle('playing');
        if (isPlaying) {
            // Останавливаем музыку
            weddingMusic.pause();
            weddingMusic.currentTime = 0;
            playButton.classList.remove('playing');
            circlePlayer.classList.remove('music-playing');
            playButton.innerHTML = '<svg class="play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
        } else {
            // Запускаем музыку
            weddingMusic.play()
                .then(() => {
                    playButton.classList.add('playing');
                    circlePlayer.classList.add('music-playing');
                    playButton.innerHTML = '<svg class="play-icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
                    isPlaying = true;
                })
                .catch(error => {
                    console.log('Для воспроизведения нажмите еще раз');
                    // В демо-режиме просто меняем иконку
                    playButton.classList.add('playing');
                    circlePlayer.classList.add('music-playing');
                    playButton.innerHTML = '<svg class="play-icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
                    isPlaying = true;
                });
        }
        isPlaying = !isPlaying;
    });
    
    // Останавливаем при скрытии страницы
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            weddingMusic.pause();
            weddingMusic.currentTime = 0;
            isPlaying = false;
            playButton.classList.remove('playing');
            circlePlayer.classList.remove('music-playing');
            playButton.innerHTML = '<svg class="play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
        }
    });
}

// Скрипт для свадебного сайта
document.addEventListener('DOMContentLoaded', function() {
    console.log('Свадебный сайт загружен');
    
    // Таймер
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Инициализация плеера
    initMusicPlayer();
    
    // Инициализация формы RSVP
    initRSVPForm();
});

// Таймер отсчета до свадьбы
function updateCountdown() {
    const weddingDate = new Date('2026-06-08T15:30:00');
    const now = new Date();
    const diff = weddingDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(3, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
}

// Музыкальный плеер
function initMusicPlayer() {
    const playButton = document.getElementById('playButton');
    const weddingMusic = document.getElementById('weddingMusic');
    const circlePlayer = document.querySelector('.circle-player');
    
    if (!playButton || !weddingMusic || !circlePlayer) return;
    
    let isPlaying = false;
    
    playButton.addEventListener('click', function() {
        if (isPlaying) {
            weddingMusic.pause();
            weddingMusic.currentTime = 0;
            playButton.classList.remove('playing');
            circlePlayer.classList.remove('music-playing');
            isPlaying = false;
        } else {
            weddingMusic.play()
                .then(() => {
                    playButton.classList.add('playing');
                    circlePlayer.classList.add('music-playing');
                    isPlaying = true;
                })
                .catch(error => {
                    console.log('Для воспроизведения нажмите еще раз');
                    playButton.classList.add('playing');
                    circlePlayer.classList.add('music-playing');
                    isPlaying = true;
                });
        }
    });
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            weddingMusic.pause();
            weddingMusic.currentTime = 0;
            isPlaying = false;
            playButton.classList.remove('playing');
            circlePlayer.classList.remove('music-playing');
        }
    });
}

// Обработчик формы RSVP
function initRSVPForm() {
    const rsvpForm = document.querySelector('.rsvp-form');
    if (!rsvpForm) return;
    
    // URL вашего Google Apps Script (ЗАМЕНИТЕ НА СВОЙ!)
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxWlK5YjMG8W8C9D8W1KIjqyEf8Mb1FFOOtgJqcNPc7NdnjFiyGegEAce0aAT7Ynfnq/exec';
    
    rsvpForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Показать индикатор загрузки
        const submitBtn = this.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        try {
            // Сбор данных формы
            const formData = {
                name: this.querySelector('input[type="text"]').value.trim(),
                phone: this.querySelector('input[type="tel"]').value.trim(),
                guests: this.querySelector('.form-select').value || '1',
                attendance: this.querySelector('input[name="attendance"]:checked')?.value
            };
            
            console.log('Отправляемые данные:', formData);
            
            // Проверка
            if (!formData.name || !formData.phone || !formData.attendance) {
                throw new Error('Пожалуйста, заполните все обязательные поля');
            }
            
            // Отправка на Google Apps Script
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'cors', // Используем cors режим
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('Ответ сервера:', result);
            
            if (result.success) {
                if (formData.attendance === 'yes') {
                    alert('✅ Спасибо! Мы будем ждать вас на нашей свадьбе 8 июня 2026 года!');
                } else {
                    alert('📝 Спасибо за ваш ответ!');
                }
                
                // Очистка формы
                rsvpForm.reset();
            } else {
                throw new Error(result.message || 'Ошибка при сохранении');
            }
            
        } catch (error) {
            console.error('Ошибка отправки:', error);
            alert(`❌ Ошибка: ${error.message}`);
        } finally {
            // Восстановить кнопку
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Проверка подключения к Google Sheets
async function testConnection() {
    try {
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxWlK5YjMG8W8C9D8W1KIjqyEf8Mb1FFOOtgJqcNPc7NdnjFiyGegEAce0aAT7Ynfnq/exec';
        
        const response = await fetch(SCRIPT_URL, {
            method: 'GET',
            mode: 'cors'
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Тест подключения:', result);
            alert('✅ Подключение к Google Sheets работает!');
        } else {
            console.error('Ошибка подключения');
            alert('❌ Ошибка подключения к серверу');
        }
    } catch (error) {
        console.error('Ошибка тестирования:', error);
        alert('❌ Не удалось подключиться');
    }
}

// Для отладки: вызовите testConnection() в консоли браузера
window.testConnection = testConnection;

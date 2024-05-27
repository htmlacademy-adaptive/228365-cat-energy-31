window.addEventListener('pageshow', (event) => {
  if (!event.persisted) {
    // Страница не из bfcache, загружаем iframe
    setTimeout(() => {
      const mapPlaceholder = document.getElementById('map-placeholder');
      const iframe = document.createElement('iframe');
      iframe.className = 'map__frame';
      iframe.src = 'https://yandex.ru/map-widget/v1/?um=constructor%3A1e01fcb9e2d8c07c526bb53341fe31b72de6b512a0f40072987b74fc0b1c7dca&source=constructor';
      iframe.width = '1440';
      iframe.height = '400';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      iframe.title = 'Карта с нашим местоположением';
      mapPlaceholder.appendChild(iframe);

      // Обработчик успешной загрузки iframe
      iframe.onload = () => {
        // Скрываем запасное изображение
        const mapFallback = document.querySelector('.map__fallback');
        mapFallback.style.display = 'none';
      };

      // Обработчик ошибки загрузки iframe
      iframe.onerror = () => {
        // Отображаем запасное изображение
        const mapFallback = document.querySelector('.map__fallback');
        mapFallback.style.display = 'block';
        // Устанавливаем свойство display на inline-block для .map__image
        const mapImage = document.querySelector('.map__image');
        mapImage.style.display = 'inline-block';
      };
    }, 3000);
  }
});

window.addEventListener('load', () => {
  // Проверяем, загружен ли iframe
  const iframe = document.querySelector('.map__frame');
  if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
    // Если iframe загружен, скрываем запасное изображение
    document.querySelector('.map__fallback').style.display = 'none';
  }
});

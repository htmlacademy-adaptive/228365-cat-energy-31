document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.before-after__handle');
  const beforeImage = document.querySelector('.before-after__image--before');
  const afterImage = document.querySelector('.before-after__image--after');
  const sliderWrapper = document.querySelector('.before-after__handle-wrapper');

  // Функция для обновления clip-path
  function updateClipPath(newLeft) {
    const sliderWrapperWidth = sliderWrapper.offsetWidth;
    const clipPercentage = (newLeft / (sliderWrapperWidth - slider.offsetWidth)) * 100;
    beforeImage.style.clipPath = `polygon(0 0, ${clipPercentage}% 0, ${clipPercentage}% 100%, 0 100%)`;
    afterImage.style.clipPath = `polygon(${clipPercentage}% 0, 100% 0, 100% 100%, ${clipPercentage}% 100%)`;
  }

  // Обработчик событий для мыши
  slider.onmousedown = function (mouseDownEvent) {
    mouseDownEvent.preventDefault();

    const sliderWrapperRect = sliderWrapper.getBoundingClientRect();
    const sliderWrapperWidth = sliderWrapperRect.width;

    document.onmousemove = function (mouseMoveEvent) {
      let newLeft = mouseMoveEvent.clientX - sliderWrapperRect.left;

      // Ограничение движения ползунка внутри slider-wrapper
      if (newLeft < 0) {
        newLeft = 0;
      }
      const rightEdge = sliderWrapperWidth - slider.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      slider.style.left = `${newLeft}px`;
      updateClipPath(newLeft); // Обновить clip-path
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  // Обработчик событий для touch-устройств
  slider.ontouchstart = function (touchStartEvent) {
    const startTouch = touchStartEvent.touches[0];
    const startTouchX = startTouch.clientX;

    sliderWrapper.ontouchmove = function (touchMoveEvent) {
      const moveTouch = touchMoveEvent.touches[0];
      let newLeft = moveTouch.clientX - startTouchX + slider.offsetLeft;

      // Ограничения, как и для mousemove
      if (newLeft < 0) {
        newLeft = 0;
      }
      const rightEdge = sliderWrapper.offsetWidth - slider.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      slider.style.left = `${newLeft}px`;
      updateClipPath(newLeft); // Обновить clip-path
    };

    sliderWrapper.ontouchend = function () {
      sliderWrapper.ontouchmove = null;
      sliderWrapper.ontouchend = null;
    };
  };

  // Обработчик событий для клавиатуры
  slider.onkeydown = function (keyDownEvent) {
    const step = 50; // Шаг перемещения ползунка в пикселях
    const sliderWrapperRect = sliderWrapper.getBoundingClientRect();
    let newLeft = slider.offsetLeft;

    if (keyDownEvent.key === 'ArrowLeft') {
      newLeft -= step; // Переместить ползунок влево
    } else if (keyDownEvent.key === 'ArrowRight') {
      newLeft += step; // Переместить ползунок вправо
    }

    // Ограничение движения ползунка внутри slider-wrapper
    if (newLeft < 0) {
      newLeft = 0;
    }
    const rightEdge = sliderWrapperRect.width - slider.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    slider.style.left = `${newLeft}px`;
    updateClipPath(newLeft); // Обновить clip-path
  };

  // Установить tabindex для ползунка, чтобы он мог получать фокус
  slider.setAttribute('tabindex', '0');
});

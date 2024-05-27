/* Выподающее меню */
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.navigation__toggle');
  const menuList = document.querySelector('.navigation__list');
  const toggleIcon = document.querySelector('.toggle-icon'); // Получаем ссылку на .toggle-icon

  menuList.classList.remove('navigation__list--nojs');

  toggleButton.addEventListener('click', () => {
    // Переключение классов, которые отвечают за открытие/закрытие меню и изменение вида иконки
    menuList.classList.toggle('navigation__list--open');
    menuList.classList.toggle('navigation__list--close');
    toggleIcon.classList.toggle('open'); // Переключаем класс 'open' для .toggle-icon

    // Обновление доступного описания для кнопки
    const isOpen = menuList.classList.contains('navigation__list--open');
    toggleButton.querySelector('.visually-hidden').textContent = isOpen ? 'Закрыть меню' : 'Открыть меню';
  });
});

const opener = document.getElementById('open');
const closer = document.getElementById('close');
const container = document.querySelector('.container');

opener.addEventListener('click', () => container.classList.add('show-nav'));
closer.addEventListener('click', () => container.classList.remove('show-nav'));
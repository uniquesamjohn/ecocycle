document.addEventListener('DOMContentLoaded', function() {
  const notifToggle = document.querySelector('.notification-icon').parentElement.querySelector('.back-btn i');
  let isOn = localStorage.getItem('notifOn') === 'true';

  function updateToggle() {
    if (isOn) {
      notifToggle.classList.remove('ri-toggle-line');
      notifToggle.classList.add('ri-toggle-fill');
      notifToggle.style.color = '#26e07f';
    } else {
      notifToggle.classList.remove('ri-toggle-fill');
      notifToggle.classList.add('ri-toggle-line');
      notifToggle.style.color = '';
    }
  }

  notifToggle.parentElement.addEventListener('click', function() {
    isOn = !isOn;
    localStorage.setItem('notifOn', isOn);
    updateToggle();
  });

  updateToggle();
});
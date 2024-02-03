export const NotificationComponent = (() => {
  const appTag = document.getElementById('app');
  const notificationTag = document.createElement('section');
  notificationTag.classList.add('notification-tag');

  const type = {
    error: 'notifation-tag--error',
    loading: 'notifation-tag--loading',
    success: 'notifation-tag--success',
  };

  const load = (message, notificationType) => {
    if (notificationType) {
      notificationTag.classList.add(notificationType);
    }
    notificationTag.id = 'loading-tag';

    notificationTag.innerText = message;
    appTag.appendChild(notificationTag);

    setTimeout(() => destroy(), 3000);
  };

  const destroy = () => notificationTag.remove();

  return {
    type,
    load,
    destroy,
  };
})();

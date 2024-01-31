export const NotificationComponent = (() => {
  const appTag = document.getElementById('app');

  const load = () => {
    const loadingTag = document.createElement('section');
    loadingTag.classList.add('loading-tag');
    loadingTag.id = 'loading-tag';

    loadingTag.innerText = 'loading, please wait ...';
    appTag.appendChild(loadingTag);
  };
  const destroy = () => {
    const loadingTag = document.getElementById('loading-tag');
    loadingTag.remove();
  };

  return {
    load,
    destroy,
  };
})();

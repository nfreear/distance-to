import DistanceToAppElement from './DistanceToAppElement.js';
import LoadPlaceDataElement from './LoadPlaceDataElement.js';

const { customElements } = window;

customElements.define('distance-to-app', DistanceToAppElement);
customElements.define('load-place-data', LoadPlaceDataElement);

/**
* @see https://developers.google.com/web/fundamentals/primers/service-workers/registration
* @see https://stackoverflow.com/questions/35780397/understanding-service-worker-scope/48068714#
*/

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js', { type: 'module' })
      .then(() => console.warn('Distance To App: service-worker.js registered OK!'));
  });
}

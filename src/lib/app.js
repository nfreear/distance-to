/**
 * Distance To Web App.
 *
 * @copyright ©2026 Nick Freear.
 */

import DistanceToAppElement from './DistanceToAppElement.js';
import LoadPlaceDataElement from './LoadPlaceDataElement.js';

const { customElements } = window;
const deleteButton = document.querySelector('#deleteButton');

customElements.define('distance-to-app', DistanceToAppElement);
customElements.define('load-place-data', LoadPlaceDataElement);

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

/**
* @see https://developers.google.com/web/fundamentals/primers/service-workers/registration
* @see https://stackoverflow.com/questions/35780397/understanding-service-worker-scope/48068714#
*/

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js', { type: 'module' })
      .then((registration) => {
        registration.addEventListener('updatefound', (ev) => {
          console.debug('updatefound:', ev);
        });

        deleteButton.addEventListener('click', (ev) => {
          registration.active.postMessage('cache:delete');
        });

        console.warn('Distance To App: service-worker.js registered OK!', registration);
      });
  });
}

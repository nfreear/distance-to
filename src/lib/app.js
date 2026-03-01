/**
 * Distance To Web App.
 *
 * @copyright ©2026 Nick Freear.
 */

import DeleteCacheButtonElement from './DeleteCacheButtonElement.js';
import DistanceToAppElement from './DistanceToAppElement.js';
import LoadPlaceDataElement from './LoadPlaceDataElement.js';
import WakeLockElement from './WakeLockElement.js';

const { customElements } = window;
const serviceWorkerJS = import.meta.resolve('../service-worker.js');
// const deleteButton = document.querySelector('#deleteButton');
const deleteCacheButton = document.querySelector('delete-cache-button');

customElements.define('distance-to-app', DistanceToAppElement);
customElements.define('load-place-data', LoadPlaceDataElement);
customElements.define('wake-lock', WakeLockElement);
customElements.define('delete-cache-button', DeleteCacheButtonElement);

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

/**
* @see https://developers.google.com/web/fundamentals/primers/service-workers/registration
* @see https://stackoverflow.com/questions/35780397/understanding-service-worker-scope/48068714#
*/

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(serviceWorkerJS, { type: 'module' })
      .then((registration) => {
        registration.addEventListener('updatefound', (ev) => {
          console.debug('updatefound:', ev);
        });

        deleteCacheButton.onconfirm = () => {
          registration.active.postMessage('cache:delete');
        };

        console.warn('Distance To App: service-worker.js registered OK!', registration);
      });
  });

  navigator.serviceWorker.addEventListener('message', (ev) => {
    console.debug('app.js ~ Message:', ev);
  });
}

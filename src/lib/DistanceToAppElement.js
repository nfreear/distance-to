import { LatLng } from '../leaflet/geo/LatLng.js';
import geoData from '../data/gbr-place-data.js';

const { HTMLElement, navigator } = window;

/**
 *
 * @see https://codepen.io/nfreear/pen/KwMbYwe
 * @see https://leafletjs.com/reference-2.0.0.html#latlng - Latlng.distanceTo();
 * @see https://github.com/Leaflet/Leaflet/blob/main/src/geo/LatLng.js#L140
 * @see https://en.wikipedia.org/wiki/Haversine_formula
 */
export default class DistanceToAppElement extends HTMLElement {
  #distanceKM;

  get #geoData () { return geoData; }
  get #geolocation () { return navigator.geolocation; }

  get #form () { return this.querySelector('form'); }
  get #fieldsetElem () { return this.#form.elements.fs; }
  get #placeField () { return this.#form.elements.place; }
  get #outputElem () { return this.#form.elements.output; }

  get #placeId () { return this.#placeField.value; }

  // https://www.wikihow.com/Convert-Kilometers-to-Miles
  get #distanceMiles () { return this.#format(this.#distanceKM * 0.62137273664981); }

  connectedCallback () {
    this.#form.addEventListener('submit', (ev) => this.#submitEventHandler(ev));

    console.debug('distance-to-app:', [this]);
  }

  #submitEventHandler (ev) {
    ev.preventDefault();

    this.#geolocation.watchPosition((pos) => this.#distanceCallback(pos));

    this.#fieldsetElem.addEventListener('change', (ev) => {
      console.log('change:', ev);
      this.#geolocation.getCurrentPosition((pos) => this.#distanceCallback(pos));
    });
  }

  #distanceCallback (pos) {
    const date = new Date(pos.timestamp);
    const { latitude, longitude } = pos.coords; // 53.777, -1.5797 -- Leeds.
    const fromLatlng = new LatLng([latitude, longitude]);

    // const placeID = this.#placeField.value;
    const toLatlng = new LatLng(this.#getLatLng(this.#placeId));

    const distanceM = fromLatlng.distanceTo(toLatlng);
    this.#distanceKM = this.#format(distanceM / 1000);
    // WAS: const distanceKM = calculateDistance(fromLatlng, toLatlng);

    this.#outputElem.value = `${this.#distanceKM} km (${this.#distanceMiles} miles) to ${this.#placeId}`;

    console.log('coords:', this.#distanceKM, 'km', this.#placeId, fromLatlng, date, pos);
  }

  #getLatLng (placeId) {
    const found = this.#geoData.find((it) => it.id.toLowerCase() === placeId.toLowerCase());
    console.assert(found, `Place not found: ${placeId}`);
    return found.latlng;
  }

  /** @DEPRECATED https://www.mathsisfun.com/algebra/distance-2-points.html
  */
  #calculateDistance (fromLatlng, toLatlng) {
    const [xa, ya] = fromLatlng;
    const [xb, yb] = toLatlng;

    const delX = Math.pow(xa - xb, 2);
    const delY = Math.pow(ya - yb, 2);
    const RESULT = Math.sqrt(delX + delY);
    return RESULT * this.#factorKM();
  }

  #factorKM () {
    return 214.06 / 1.9205730502321912;
  }

  #format (number) {
    return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(
      number
    );
  }
}

import { LatLng } from '../leaflet/geo/LatLng.js';
import geoData from '../data/gbr-place-data.js';

const { HTMLElement, navigator } = window;

/**
 *
 * @see https://codepen.io/nfreear/pen/KwMbYwe
 */
export default class DistanceToAppElement extends HTMLElement {
  #distanceKM;
  #timerNum = 0;
  #timerID;
  #opt = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  get #geoData () { return geoData; }
  get #geolocation () { return navigator.geolocation; }

  get #form () { return this.querySelector('#formID'); }
  get #fieldsetElem () { return this.#form.elements.fs; }
  get #placeField () { return this.#form.elements.place; }
  get #outputElem () { return this.#form.elements.output; }
  get #timerElem () { return this.#form.elements.timer; }
  get #speedElem () { return this.#form.elements.speed; }
  get #headingElem () { return this.#form.elements.heading; }

  get #placeId () { return this.#placeField.value; }

  // https://www.wikihow.com/Convert-Kilometers-to-Miles
  get #distanceMiles () { return formatNum(this.#distanceKM * 0.62137273664981); }

  connectedCallback () {
    this.#form.addEventListener('submit', (ev) => this.#submitEventHandler(ev));

    console.debug('distance-to-app:', [this]);
  }

  #submitEventHandler (ev) {
    ev.preventDefault();

    this.#geolocation.watchPosition((pos) => this.#locationCallback(pos), (er) => this.#errorCallback(er, 'watch'), this.#opt);

    this.#fieldsetElem.addEventListener('change', (ev) => {
      console.log('change:', ev);
      this.#geolocation.getCurrentPosition((pos) => this.#locationCallback(pos), (er) => this.#errorCallback(er, 'get'), this.#opt);
    });
  }

  #locationCallback (pos) {
    const date = new Date(pos.timestamp);
    const { fromLatlng, distance } = this.#calculateDistance(pos);

    this.#distanceKM = formatNum(distance / 1000);

    this.#outputElem.value = `${this.#distanceKM} km (${this.#distanceMiles} miles) to ${this.#placeLabel}`;

    this.#setSpeedHeading(pos);
    this.#runTimer();

    console.log('coords:', this.#distanceKM, 'km', this.#placeId, fromLatlng, date, pos);
  }

  #errorCallback (error, source) {
    const { code, message } = error;
    console.error('Geolocation Error:', code, source, message);

    this.dataset.errorCode = code;
    this.dataset.errorMessage = message;
  }

  #calculateDistance (geoPos) {
    const { latitude, longitude } = geoPos.coords; // 53.777, -1.5797 -- Leeds.
    const fromLatlng = new LatLng([latitude, longitude]);
    // const placeID = this.#placeField.value;
    const toLatlng = new LatLng(this.#getLatLng(this.#placeId));

    const distance = fromLatlng.distanceTo(toLatlng);

    return { fromLatlng, toLatlng, distance };
  }

  #setSpeedHeading (pos) {
    const { heading, speed } = pos.coords;

    this.#headingElem.value = `${formatNum(heading)}°` ?? '?'; // degrees; 0deg == North.
    this.#speedElem.value = formatNum(speed) ?? '?'; // m/s.
  }

  #runTimer (intervalMS = 1000) {
    if (this.#timerID) {
      clearInterval(this.#timerID);
      this.#timerNum = 0;
    }
    this.#timerID = setInterval(() => {
      this.#timerNum++;
      this.#timerElem.value = `${this.#timerNum}s`;
    },
    intervalMS);
  }

  #find (placeId) {
    const found = this.#geoData.find((it) => it.id.toLowerCase() === placeId.toLowerCase());
    console.assert(found, `Place not found: ${placeId}`);
    return found;
  }

  #getLatLng (placeId) { return this.#find(placeId).latlng; }

  get #placeLabel () { return this.#find(this.#placeId).label; }

  /** @DEPRECATED https://www.mathsisfun.com/algebra/distance-2-points.html
  */
  #oldCalculateDistance2D (fromLatlng, toLatlng) {
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
}

export function formatNum (number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits }).format(
    number
  );
}

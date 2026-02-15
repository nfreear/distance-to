import geoData from '../data/gbr-place-data.js';

const { HTMLElement } = window;

/**
 *
 */
export default class LoadPlaceDataElement extends HTMLElement {
  #elements;

  get #geoData () { return geoData; }

  connectedCallback () {
    this.#elements = this.#geoData.map((it) => this.#createPlaceElement(it));

    this.textContent = '';

    this.#elements.forEach((elem) => this.appendChild(elem));

    console.debug('load-place-data:', [this]);
  }

  #createPlaceElement (place) {
    const { id } = place;

    const labelElem = document.createElement('label');
    const inputElem = document.createElement('input');
    const textElem = document.createElement('span');

    inputElem.type = 'radio';
    inputElem.name = 'place';
    inputElem.value = id;

    textElem.textContent = id;

    labelElem.appendChild(inputElem);
    labelElem.appendChild(textElem);

    return labelElem;
  }
}

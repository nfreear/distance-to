import geoData from '../data/gbr-place-data.js';

const { HTMLElement } = window;

/**
 *
 */
export default class LoadPlaceDataElement extends HTMLElement {
  #elements;

  get #geoData () { return geoData.sort((a, b) => this.#sortAlpha(a, b)); }

  #sortAlpha (a, b) {
    if (a.label > b.label) {
      return 1;
    }
    if (a.label < b.label) {
      return -1;
    }
    return 0;
  }

  connectedCallback () {
    this.#elements = this.#geoData.map((it) => this.#createPlaceElement(it));

    this.textContent = '';

    this.#elements.forEach((elem) => this.appendChild(elem));

    console.debug('load-place-data:', [this]);
  }

  #createPlaceElement (place) {
    const { id, label } = place;

    const labelElem = document.createElement('label');
    const inputElem = document.createElement('input');
    const textElem = document.createElement('span');

    inputElem.type = 'radio';
    inputElem.name = 'place';
    inputElem.value = id;

    textElem.textContent = label;

    labelElem.appendChild(inputElem);
    labelElem.appendChild(textElem);

    return labelElem;
  }
}

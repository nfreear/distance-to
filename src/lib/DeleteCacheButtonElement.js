const { confirm, HTMLElement } = window;

export default class DeleteCacheButtonElement extends HTMLElement {
  #defaultSlotText = 'Clear cache';
  #button;
  #callbackFN;

  set onconfirm (callbackFN) {
    console.assert(typeof callbackFN === 'function');
    this.#callbackFN = callbackFN;
  }

  get onconfirm () { return this.#callbackFN; }

  get #confirmText () {
    return this.getAttribute('confirm-text') ?? 'Are you sure you want to delete the cache?';
  }

  connectedCallback () {
    this.#button = this.#createElements();
    this.attachShadow({ mode: 'open' }).appendChild(this.#button);

    this.#button.addEventListener('click', (ev) => this.#clickEventHandler(ev));
  }

  #clickEventHandler (ev) {
    ev.preventDefault();

    if (confirm(this.#confirmText)) {
      this.#callbackFN(ev);
    }
  }

  #createElements () {
    const buttonElem = document.createElement('button');
    const slotElem = document.createElement('slot');

    slotElem.textContent = this.#defaultSlotText;
    buttonElem.setAttribute('part', 'button');
    buttonElem.appendChild(slotElem);

    return buttonElem;
  }
}

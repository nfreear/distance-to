const { HTMLElement, navigator } = window;

/**
 * Use a checkbox to control the Screen Wake Lock API, to prevent devices
 * from dimming or locking the screen (uses Shadow DOM).
 * @copyright © 2026 Nick Freear.
 */
export default class WakeLockElement extends HTMLElement {
  #label = 'Stay awake';
  #inputElem;
  #outputElem;
  #wakeLock = null;

  get #supportsWakeLock () { return 'wakeLock' in navigator; }

  get #successText () { return this.getAttribute('success-text') ?? 'Wake lock is active!'; }
  get #releaseText () { return this.getAttribute('release-text') ?? 'Wake lock released!'; }

  connectedCallback () {
    if (!this.#supportsWakeLock) {
      console.warn('Wake lock not supported.');
      return;
    }

    const { label, input, output } = this.#createElements();

    this.attachShadow({ mode: 'open' }).appendChild(label);

    input.addEventListener('change', (ev) => this.#changeEventHandler(ev));

    this.#inputElem = input;
    this.#outputElem = output;

    console.debug('wake-lock:', [this]);
  }

  #changeEventHandler (ev) {
    if (ev.target.checked) {
      this.#acquireLock(ev);
    } else {
      this.#releaseLock(ev);
    }
  }

  async #acquireLock (ev) {
    try {
      this.#wakeLock = await navigator.wakeLock.request('screen');
      this.#outputElem.textContent = this.#successText;
      this.dataset.active = true;
      console.debug('Wake lock active', ev);
    } catch (err) {
      // The Wake Lock request has failed - usually system related, such as battery.
      this.#outputElem.textContent = `${err.name}, ${err.message}`;
      this.dataset.error = err;
      console.error('WakeLock Error:', err);
    }
  }

  #releaseLock (ev) {
    this.#wakeLock.release().then(() => {
      this.#wakeLock = null;
      this.#outputElem.textContent = this.#releaseText;
      this.dataset.active = false;
      console.debug('Wake lock released', ev);
    });
  }

  #createElements () {
    const input = document.createElement('input');
    const label = document.createElement('label');
    const span = document.createElement('span');
    const output = document.createElement('output');
    const slot = document.createElement('slot');

    input.type = 'checkbox';
    input.setAttribute('part', 'checkbox');
    output.setAttribute('part', 'output');
    label.setAttribute('part', 'label');
    span.setAttribute('part', 'labelText');
    slot.textContent = this.#label;

    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(output);
    span.appendChild(slot);

    return { label, input, output };
  }
}

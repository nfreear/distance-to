const { HTMLElement, navigator } = window;

export default class WakeLockElement extends HTMLElement {
  #outputElem;
  #wakeLock = null;

  get #supportsWakeLock () { return 'wakeLock' in navigator; }

  get #label () { return this.getAttribute('label') ?? 'Stay awake'; }
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

    this.#outputElem = output;

    console.debug('wake-lock:', [this]);
  }

  #changeEventHandler (ev) {
    if (ev.target.checked) {
      this.#acquireWakeLock(ev);
    } else {
      this.#wakeLock.release().then(() => {
        this.#wakeLock = null;
        this.#outputElem.textContent = this.#releaseText;
        this.dataset.active = false;
        console.debug('Wake lock released', ev);
      });
    }
  }

  async #acquireWakeLock (ev) {
    try {
      this.#wakeLock = await navigator.wakeLock.request('screen');
      this.#outputElem.textContent = this.#successText;
      this.dataset.active = true;
      console.debug('Wake lock active', ev);
    } catch (err) {
      // The Wake Lock request has failed - usually system related, such as battery.
      this.#outputElem.textContent = `${err.name}, ${err.message}`;
      console.error('WakeLock Error:', err);
    }
  }

  #createElements () {
    const input = document.createElement('input');
    const label = document.createElement('label');
    const span = document.createElement('span');
    const output = document.createElement('output');

    input.type = 'checkbox';
    input.setAttribute('part', 'checkbox');
    output.setAttribute('part', 'output');
    label.setAttribute('part', 'label');
    span.setAttribute('part', 'labelText');
    span.textContent = this.#label;

    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(output);

    return { label, input, output };
  }
}

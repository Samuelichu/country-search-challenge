import { LitElement, html, css } from 'lit';

export class CountryList extends LitElement {
  static properties = {
    countries: { type: Array },
    status: { type: String },
  };

  static styles = css`
    :host {
      display: block;
    }
    input {
      padding: 8px;
      background-color: #c71717;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 8px 16px;
      background-color: #000000;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
    }
    .skeleton-item {
      background-color: #e0e0e0;
      height: 20px;
      margin: 10px 0;
      border-radius: 4px;
      animation: skeleton-loading 1.5s infinite linear;
    }

    .skeleton-item {
      background-color: #e0e0e0;
      height: 20px;
      margin: 10px 0;
      border-radius: 4px;
      animation: skeleton-loading 1.5s infinite linear;
    }

    @keyframes skeleton-loading {
      0% {
        background-color: #e0e0e0;
      }
      50% {
        background-color: #c0c0c0;
      }
      100% {
        background-color: #e0e0e0;
      }
    }
  `;

  constructor() {
    super();
    this.countries = [];
    this.limit = 12;
    this.status = '';
  }

  countriesLoad() {
    switch (this.status) {
      case 'start':
        return html`
          <ul class="countries-list">
            ${this.countries.slice(0, this.limit).map(
              c =>
                html`<li>
                  <button @click="${() => this.chooseCountry(c.name.common)}">
                    ${c.name.common}
                  </button>
                </li>`,
            )}
          </ul>
        `;
      case 'again':
        return html`
          <div class="again-item">lo tienes que intentar otra vez</div>
        `;
      default:
        return html`
          <ul class="countries-list">
            ${Array(12)
              .fill(0)
              .map(() => html`<li><div class="skeleton-item"></div></li>`)}
          </ul>
        `;
    }
  }

  chooseCountry(name) {
    this.dispatchEvent(
      new CustomEvent('country-select', {
        bubbles: true,
        detail: { selectedCountry: name },
        composed: true,
      }),
    );
  }

  render() {
    return html` ${this.countriesLoad()} `;
  }
}

customElements.define('country-list', CountryList);

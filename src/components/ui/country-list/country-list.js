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

    .countries-list {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      list-style: none;
      padding: 0;
    }
    .card-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 12px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      text-align: left;
      gap: 15px;
    }

    .card-container:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }

    .card-image img {
      width: 100%;
      height: 30px;
      object-fit: contain;
      border-radius: 4px;
    }

    .card-info {
      display: flex;
      flex-direction: column;
      color: #333;
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
              c => html`
                <li class="card-item">
                  <button
                    class="card-container"
                    @click="${() => this.chooseCountry(c)}"
                  >
                    <div class="card-image">
                      <img
                        src="${c.flags?.png}"
                        alt="Bandera de ${c.name.common}"
                      />
                    </div>
                    <div class="card-info">
                      <span>${c.name.official}</span>
                      <span>${c.capital[0]}</span>
                      <span>${c.region}</span>
                    </div>
                  </button>
                </li>
              `,
            )}
          </ul>
        `;
      case 'again':
        return html`
          <div class="again-item">
            No se pudo obtener informacion sobre tu busqueda. Intentalo de nuevo
          </div>
          <button @click="${this._loadSearch}">Volver a cargar</button>
        `;
      case 'empty':
        return html`
          <slot name="message-empty" class="again-item">
            No encontramos un país el nombre que buscas.
          </slot>
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

  

  chooseCountry(country) {
    this.dispatchEvent(
      new CustomEvent('country-select', {
        bubbles: true,
        detail: country,
        composed: true,
      }),
    );
  }

  render() {
    return html` ${this.countriesLoad()} `;
  }
}

customElements.define('country-list', CountryList);

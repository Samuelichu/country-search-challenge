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

    button {
      padding: 8px 16px;
      background-color: var(--color-primary);
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
    }

    .countries-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-md);
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
    }

    .card-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: var(--spacing-sm);
      background: var(--color-secondary);
      border: 1px solid var(--color-secondary);
      border-radius: var(--spacing-sm);
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      text-align: left;
      gap: 15px;
    }

    .card-container:hover {
      box-shadow: 0 4px 12px var(--color-primary);
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
      justify-content: center;
      align-items: center;
      gap: 4px;
    }
    .card-item-name {
      font-family: var(--font-primary);
      font-size: var(--font-size-lg);
      text-align: center;
      font-weight: 600;
      color: var(--color-accent);
    }

    .card-info-group {
      display: flex;
      justify-content: center;
      gap: var(--spacing-sm);
      flex-wrap: wrap;
    }

    .card-info-item {
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
      background: var(--color-secondary);
      padding: 2px var(--spacing-sm);
      border-radius: 20px;
    }

    .state-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);
      padding: var(--spacing-lg);
      text-align: center;
    }

    .state-message {
      font-family: var(--font-secondary);
      font-size: var(--font-size-md);
      color: #555;
      max-width: 320px;
      line-height: 1.4;
    }

    .retry-button {
      padding: var(--spacing-sm) var(--spacing-md);
      background-color: var(--color-primary);
      color: white;
      border: none;
      border-radius: 6px;
      font-family: var(--font-primary);
      font-size: var(--font-size-md);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .retry-button:hover {
      opacity: 0.85;
      transform: translateY(-1px);
    }

    .retry-button:active {
      transform: scale(0.98);
    }

    .skeleton-item {
      display: block;
      width: 250px;
      height: 120px;
      min-height: 80px;
      background-color: var(--color-skeleton);
      border-radius: 12px;
      animation: skeleton-loading 1.5s infinite linear;
    }

    @keyframes skeleton-loading {
      0% {
        background-color: var(--color-skeleton);
      }
      50% {
        background-color: #c0c0c0;
      }
      100% {
        background-color: var(--color-skeleton);
      }
    }

    @media (max-width: 480px) {
      .countries-list {
        grid-template-columns: 1fr;
      }

      .card-container {
        padding: 8px;
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
    // DECISION: El componente solo se enfoca en la presentación, se limita a mostrar máximo 12 resultados
    //  por carga para optimizar el renderizado.
    switch (this.status) {
      case 'start':
        return html`
          <ul class="countries-list" aria-label="Lista de países">
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
                      <span class="card-item-name">${c.name.official}</span>
                      <div class="card-info-group">
                        <span class="card-info-item">
                          <strong>Capital:</strong> ${c.capital?.[0] ??
                          'Sin capital'}
                        </span>
                        <span class="card-info-item">
                          <strong>Región:</strong> ${c.region}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              `,
            )}
          </ul>
        `;
      case 'again':
        return html`
          <div class="state-container" role="alert" aria-live="assertive">
            <p class="state-message">
              No se pudo obtener la información. Inténtalo nuevamente.
            </p>
            <button class="retry-button" @click="${this._reloadSearch}">
              Reintentar
            </button>
          </div>
        `;
      case 'empty':
        return html`
          <div class="state-container">
            <slot name="message-empty">
              <p class="state-message">
                No se encontraron resultados para tu búsqueda.
              </p>
            </slot>
          </div>
        `;
      default:
        return html`
          <ul
            class="countries-list"
            aria-label="Cargando países"
            aria-busy="true"
          >
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

  // DECISION: Se emite el evento ya que el padre es el encargado de realizar esta peticion,
  // el componente vuelve a seguir su flujo normal.
  _reloadSearch() {
    this.dispatchEvent(
      new CustomEvent('country-search-reload', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html` ${this.countriesLoad()} `;
  }
}

customElements.define('country-list', CountryList);

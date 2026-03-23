import { LitElement, html, css } from 'lit';

export class CountryDetail extends LitElement {
  static properties = {
    selectedCountry: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
    }
    section {
      padding: 2.5rem;
      background-image: linear-gradient(to bottom left, #e0e4e5, #f2f6f9);
      border-radius: 2rem;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
      font-family: var(--font-secondary);
      color: var(--color-primary);
      box-shadow:
        inset -2px 2px hsl(0 0% 100% / 1),
        -20px 20px 40px hsl(0 0% 0% / 0.25);
      max-width: 600px;
      width: 100%;
    }

    h2 {
      font-size: var(--font-size-lg);
      font-weight: bold;
      margin: 0;
    }

    .country-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-md);
    }

    p {
      margin: 0;
      font-size: var(--font-size-md);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    span {
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
    }

    button {
      align-self: flex-end;
      padding: var(--spacing-sm) var(--spacing-md);
      background: var(--color-primary);
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      font-size: var(--font-size-sm);
      transition: opacity 0.2s ease;
    }

    button:hover {
      opacity: 0.85;
    }

    button:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 2px;
    }

    @media (max-width: 480px) {
      section {
        padding: var(--spacing-md);
        border-radius: 1rem;
        box-shadow: -10px 10px 20px hsl(0 0% 0% / 0.15);
      }

      .country-info {
        grid-template-columns: 1fr;
      }

      h2 {
        font-size: var(--font-size-md);
      }

      button {
        width: 100%;
        text-align: center;
      }
    }
  `;

  constructor() {
    super();
    this.selectedCountry = null;
    this._handleKeydown = null;
  }

  connectedCallback() {
    super.connectedCallback();
    // DECISION: Se busca mejorar la accesibilidad añadiendo un listener
    // de teclado para permitir cerrar el modal con la tecla Escape
    this._handleKeydown = e => {
      if (e.key === 'Escape') {
        this.backPage();
      }
    };
    window.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // DECISION: Se elimina el listener al desmontar el componente para
    // evitar fugas de memoria y errores al intentar acceder a un componente que ya no existe
    window.removeEventListener('keydown', this._handleKeydown);
  }

  backPage() {
    this.dispatchEvent(
      new CustomEvent('country-detail-back', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <section aria-label="Modal detalle del país">
        <h2>Detalle del país</h2>
        <div
          class="country-info"
          aria-label="Información del país ${this.selectedCountry?.name
            ?.common}"
        >
          <p><strong>Población:</strong> ${this.selectedCountry?.population}</p>
          <p><strong>Área:</strong> ${this.selectedCountry?.area}</p>
          <p>
            <strong>Idiomas:</strong>
            <span aria-label="Idiomas del país">
              ${Object.values(this.selectedCountry?.languages ?? {}).join(', ')}
            </span>
          </p>
          <p>
            <strong>Monedas:</strong>
            <span aria-label="Monedas del país">
              ${Object.values(this.selectedCountry?.currencies ?? {})
                .map(c => `${c.name} (${c.symbol})`)
                .join(', ')}
            </span>
          </p>
          <p>
            <strong>Zonas horarias:</strong>
            <span aria-label="Zonas horarias del país">
              ${this.selectedCountry?.timezones?.join(', ')}
            </span>
          </p>
        </div>
        <button
          aria-label="Volver a la lista de países"
          @click=${this.backPage}
        >
          Volver
        </button>
      </section>
    `;
  }
}

customElements.define('country-detail', CountryDetail);

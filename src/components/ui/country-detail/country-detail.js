import { LitElement, html, css } from 'lit';

export class CountryDetail extends LitElement {
  static properties = {
    selectedCountry: { type: Object },
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
    this.isLoading = true;
    this.selectedCountry = null;
  }

  connectedCallback() {
    super.connectedCallback();
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
    <h2>Detalle del país</h2>
    <div>
      <p><strong>Población:</strong> ${this.selectedCountry?.population}</p>
      <p><strong>Área:</strong> ${this.selectedCountry?.area}</p>
      <p><strong>Idiomas:</strong></p>
      <ul>
        ${Object.values(this.selectedCountry?.languages ?? {}).map(l => html`<li>${l}</li>`)}
      </ul>
      <p><strong>Monedas:</strong></p>
      <ul>
        ${Object.values(this.selectedCountry?.currencies ?? {}).map(c => html`<li>${c.name} (${c.symbol})</li>`)}
      </ul>
      <p><strong>Zonas horarias:</strong></p>
      <ul>
        ${this.selectedCountry?.timezones?.map(t => html`<li>${t}</li>`)}
      </ul>
    </div>
    <button @click=${this.backPage}>Volver atrás</button>
  `;
}
}

customElements.define('country-detail', CountryDetail);

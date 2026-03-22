import { LitElement, html, css } from 'lit';

export class CountryDetail extends LitElement {
  static properties = {
    selectedCountry: { type: Object },
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
      <button @click="${this.backPage}">Volver atrás</button>
    `;
  }
}

customElements.define('country-detail', CountryDetail);

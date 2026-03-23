import { LitElement, html, css } from 'lit';

export class CountrySearch extends LitElement {
  static properties = {
    searchValue: { type: String },
    _isLoading: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
    }

    .search-container {
      position: relative;
      padding-top: var(--spacing-sm);
    }

    input {
      border: 2px solid #d1d5db;
      background-color: var(--color-background);
      height: 40px;
      padding: 0 var(--spacing-md);
      border-radius: 8px;
      font-size: var(--font-size-md);
      font-family: var(--font-primary);
      outline: none;
      min-width: 250px;
    }

    input:focus {
      border-color: #6b7280;
    }

    .search-text {
      font-size: var(--font-size-sm);
      color: #6b7280;
      margin: 4px 0 0 0;
    }

    @media (max-width: 480px) {
      input {
        height: 36px;
        font-size: var(--font-size-sm);
      }
    }
  `;

  constructor() {
    super();
    this.searchValue = '';
    this._isLoading = false;
    this.timeout = null;
  }

  debounceUpdate(e) {
    // DECISION: Se aplica debounce para evitar disparar eventos en cada tecla.
    // se utiliza con el único fin de reducirde procesamiento y
    // peticiones innecesarias en el componenteal padre.
    this._isLoading = true;
    this.searchValue = e.target.value;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this._isLoading = false;
      this.dispatchEvent(
        new CustomEvent('country-search-change', {
          bubbles: true,
          composed: true,
          detail: { info: this.searchValue },
        }),
      );
    }, 300);
  }

  render() {
    return html`
      <div class="search-container" role="search">
        <input
          type="search"
          aria-label="Buscador de un país"
          @input=${this.debounceUpdate}
          .value=${this.searchValue}
          placeholder="Buscar un país..."
        />
        ${this._isLoading ? html`<p class="search-text">Buscando...</p>` : ''}
      </div>
    `;
  }
}

customElements.define('country-search', CountrySearch);

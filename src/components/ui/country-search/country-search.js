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
      padding-top: 8px;
    }

    input {
      border: 2px solid #d1d5db;
      background-color: #ffffff;
      height: 40px;
      padding: 0 20px;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
    }

    input:focus {
      border-color: #6b7280;
    }

    .search-text {
      font-size: 12px;
      color: #6b7280;
      margin: 4px 0 0 0;
    }
  `;

  constructor() {
    super();
    this.searchValue = '';
    this._isLoading = false;
    this.timeout = null;
  }

  debounceUpdate(e) {
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
    }, 9000);
  }

  render() {
    return html`
      <div class="search-container">
        <input
          type="search"
          @input=${this.debounceUpdate}
          .value=${this.searchValue}
          placeholder="Buscar un país..."
        />
        ${this._isLoading
          ? html`<p class="search-text">Buscando...</p>`
          : ''}
      </div>
    `;
  }
}

customElements.define('country-search', CountrySearch);

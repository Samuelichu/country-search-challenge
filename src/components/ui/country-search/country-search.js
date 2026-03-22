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
    input {
      padding: 8px;
      background-color: #c71717;
      border: 1px solid #ccc;
      border-radius: 4px;
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
      <input
        type="search"
        @input=${this.debounceUpdate}
        .value=${this.searchValue}
        placeholder="Buscar un país..."
      />

      ${this._isLoading ? html`<p>Buscando...</p>` : ''}
    `;
  }
}

customElements.define('country-search', CountrySearch);

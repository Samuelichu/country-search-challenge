import { LitElement, html, css } from 'lit';

export class CountrySearch extends LitElement {
  static properties = {
    searchValue: { type: String },
    countries: { type: Array },
    isLoading: { type: Boolean },
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
    this.countries = ['opción 1', 'opción 2', 'opción 3'];
    this.isLoading = true;
  }

  debounceUpdate(e) {
    this.searchValue = e.target.value;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 9000);

    this.dispatchEvent(
      new CustomEvent('country-search-change', {
        bubbles: true,
        detail: { info: this.searchValue },
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <input
        type="text"
        list="countries-list"
        @input="${this.debounceUpdate}"
        .value="${this.searchValue}"
        placeholder="buscando..."
      />
      <datalist id="countries-list">
        ${this.isLoading
          ? html`<option value="Cargando..."></option>`
          : this.countries.map(c => html`<option value="${c}"></option>`)}
      </datalist>
    `;
  }
}

customElements.define('country-search', CountrySearch);

import { LitElement, html, css } from 'lit';
import '../../ui/country-search/country-search.js';
import '../../ui/country-list/country-list.js';
import { getCountries, getCountry } from '../../../api/router.js';
class CountryExplorer extends LitElement {
  static properties = {
    _countries: { type: Array },
    _countriesFiltered: { type: Array },
    _status: { type: String },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--country-search-challenge-background-color);
    }

    main {
      flex-grow: 1;
    }

    .logo {
      margin-top: 36px;
      animation: app-logo-spin infinite 20s linear;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  constructor() {
    super();
    this._countries = [];
    this._countriesFiltered = [];
    this._status = '';
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
    this._loadSearch();
    }, 2000);
  }

  async _loadSearch() {
    try {
      const data = await getCountries();
      this._countries = data;
      this._status = 'start';
    } catch (error) {
      this._status = 'again';
    }
  }

  _filterCountries(e) {
    const searchValue = e.detail.info;
    this._countriesFiltered = searchValue
      ? this._countries.filter(c =>
          c.name.common.toLowerCase().includes(searchValue.toLowerCase()),
        )
      : this._countries;
  }

  render() {
    return html`
      <country-search
        @country-search-change="${this._filterCountries}"
      ></country-search>
      <country-list
        .countries="${this._countriesFiltered}"
        .status="${this._status}"
      ></country-list>
    `;
  }
}

customElements.define('country-explorer', CountryExplorer);

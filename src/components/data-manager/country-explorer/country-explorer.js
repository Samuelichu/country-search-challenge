import { LitElement, html, css } from 'lit';
import '../../ui/country-search/country-search.js';
import '../../ui/country-list/country-list.js';
import '../../ui/country-detail/country-detail.js';
import { getCountries, getCountry } from '../../../api/router.js';
class CountryExplorer extends LitElement {
  static properties = {
    _countries: { type: Array },
    _countriesFiltered: { type: Array },
    _status: { type: String },
    _selectedCountry: { type: Object },
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
    this._selectedCountry = null;
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
      this._countriesFiltered = data;
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
    this._status = this._countriesFiltered.length === 0 ? 'empty' : 'start';
  }

  async getCountryDetail(country) {
    try {
      const dataCountry = await getCountry(country.detail.name.common);
      console.log('el pais es', dataCountry);
      this._selectedCountry = dataCountry;
    } catch (error) {
      console.error('Error al cargar el detalle del país:', error);
    }
  }

  _handleBack() {
    this._selectedCountry = null;
  }

  render() {
    return html`
      <country-search
        @country-search-change=${this._filterCountries}
      ></country-search>
      <country-list
        @country-select=${this.getCountryDetail}
        .countries=${this._countriesFiltered}
        .status=${this._status}
      ></country-list>

      ${this._selectedCountry
        ? html`
            <country-detail
              @country-detail-back=${this._handleBack}
              .selectedCountry=${this._selectedCountry}
            ></country-detail>
          `
        : ''}
    `;
  }
}

customElements.define('country-explorer', CountryExplorer);

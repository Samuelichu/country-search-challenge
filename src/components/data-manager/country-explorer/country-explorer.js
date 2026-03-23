import { LitElement, html, css } from 'lit';
import '../../ui/country-search/country-search.js';
import '../../ui/country-list/country-list.js';
import '../../ui/country-detail/country-detail.js';
import { getCountries, getCountry } from '../../../api/requests.js';
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

    .main-page {
      transition:
        filter 0.4s ease,
        transform 0.4s ease,
        opacity 0.4s ease;
      width: 100%;
    }
    .hide-list {
      filter: blur(8px);
      opacity: 0.6;
      transform: scale(0.96);
      pointer-events: none;
    }

    .detail-page {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease-out;
    }
  `;

  constructor() {
    super();
    this._countries = [];
    this._countriesFiltered = [];
    this._status = 'loading';
    this._selectedCountry = null;
    this._abortController = new AbortController();
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      this._loadSearch();
    }, 2000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._abortController.abort();
  }

  async _loadSearch() {
    try {
      const data = await getCountries(this._abortController.signal);
      this._countries = data;
      this._countriesFiltered = data;
      this._status = 'start';
    } catch (error) {
      if (error.name === 'AbortError') return;
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
      const nameCountry = country.detail.name.common;
      const dataCountry = await getCountry(
        nameCountry,
        this._abortController.signal,
      );
      this._selectedCountry = dataCountry;

      await this.updateComplete;
      this.shadowRoot.querySelector('country-detail').focus();
    } catch (error) {
      console.error('Error al cargar el detalle del país:', error);
    }
  }

  async _handleBack() {
    this._selectedCountry = null;
    await this.updateComplete;
    this.shadowRoot.querySelector('country-search').focus();
  }

  render() {
    return html`
      <div
        class="main-page ${this._selectedCountry ? 'hide-list' : ''}"
        aria-hidden=${this._selectedCountry ? 'true' : 'false'}
      >
        <country-search
          @country-search-change=${this._filterCountries}
        ></country-search>

        <country-list
          .countries=${this._countriesFiltered}
          .status=${this._status}
          @country-select=${this.getCountryDetail}
          ><div slot="message-empty" class="custom-error">
            No pudimos obtener información sobre el país
            "${this._selectedCountry?.name?.common}", parece que no existe.
          </div></country-list
        >
      </div>

      ${this._selectedCountry
        ? html`
            <div
              class="detail-page"
              role="dialog"
              aria-modal="true"
              aria-label="Detalle del país ${this._selectedCountry?.name
                ?.common}"
            >
              <country-detail
                .selectedCountry=${this._selectedCountry}
                @country-detail-back=${this._handleBack}
              ></country-detail>
            </div>
          `
        : ''}
    `;
  }
}

customElements.define('country-explorer', CountryExplorer);

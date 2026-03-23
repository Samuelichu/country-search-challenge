import { LitElement, html, css } from 'lit';
import './components/data-manager/country-explorer/country-explorer.js';
class CountrySearchChallenge extends LitElement {
  static properties = {
    header: { type: String },
  };

  static styles = css`
    :host {
      box-sizing: border-box;
      margin: 0;
      paddding: 0;
      min-height: 100vh;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      margin: 0 auto;
      text-align: center;
      background-color: var(--color-secondary);
    }

    main {
      flex-grow: 1;
    }

    .logo {
      margin-top: 36px;
      animation: app-logo-spin infinite 20s linear;
    }
  `;

  constructor() {
    super();
    this.header = 'My app';
  }

  render() {
    return html`
      <main>
        <country-explorer></country-explorer>
      </main>
    `;
  }
}

customElements.define('country-search-challenge', CountrySearchChallenge);

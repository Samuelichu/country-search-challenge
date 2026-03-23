import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/components/ui/country-list/country-list.js';

const countries = [
  {
    name: { common: 'Colombia', official: 'República de Colombia' },
    capital: ['Bogotá'],
    flags: { png: 'https://flagcdn.com/w320/co.png' },
    region: 'Americas',
  },
  {
    name: { common: 'Perú', official: 'República del Perú' },
    capital: ['Lima'],
    flags: { png: 'https://flagcdn.com/w320/pe.png' },
    region: 'Americas',
  },
];

describe('CountryList', () => {
  it('should display a retry message when the API request fails', async () => {
    const countryComponent = await fixture(html`
      <country-list .status=${'again'}></country-list>
    `);

    const errorMsg = countryComponent.shadowRoot.querySelector('.again-item');
    expect(errorMsg).to.exist;
    expect(errorMsg.textContent).to.include('Intentalo de nuevo');
  });

  it('should render country list on successful API response', async () => {
    const countryComponent = await fixture(html`
      <country-list .countries=${countries} .status=${'start'}></country-list>
    `);

    const countryItems = countryComponent.shadowRoot.querySelectorAll('.card-item');
    expect(countryItems.length).to.equal(2);
  });
});

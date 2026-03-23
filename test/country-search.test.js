import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/components/ui/country-search/country-search.js';

it('should dispatch "country-search-change" event on input change', async () => {
  const el = await fixture(html`<country-search></country-search>`);

  let eventDetail = null;
  el.addEventListener('country-search-change', e => {
    eventDetail = e.detail;
  });

  const input = el.shadowRoot.querySelector('input');
  input.value = 'Colombia';
  input.dispatchEvent(new Event('input'));

  await new Promise(resolve => setTimeout(resolve, 350));

  expect(eventDetail).to.exist;
  expect(eventDetail.info).to.equal('Colombia');
});

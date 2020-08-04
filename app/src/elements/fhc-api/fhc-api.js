import * as api from 'fhc-api/dist/fhcApi'

import {PolymerElement, html} from '@polymer/polymer';
class FhcApi extends PolymerElement {
  static get template() {
    return html`
        <style>
        </style>
`;
  }

  static get is() {
      return "fhc-api";
  }

  static get properties() {
      return {
          headers: {
              type: Object,
              value: { "Content-Type": "application/json",  "Authorization": "Basic: ZGU5ODcyYjUtNWNiMC00ODQ2LThjNGMtOThhMjFhYmViNWUzOlQwcEB6RmhjWnRm" }
          },
          host: {
              type: String
          }
      };
  }

  static get observers() {
      return ["refresh(headers, headers.*, host)"];
  }

  ready() {
      super.ready();

      if (this.host != null && this.headers != null) this.refresh();
  }

  refresh() {
      this.addressbookcontrollerfhc = new api.fhcAddressbookControllerApi(this.host, this.headers);
      this.consentcontrollerfhc = new api.fhcConsentControllerApi(this.host, this.headers);
      this.chaptercontrollerfhc = new api.fhcChapterControllerApi(this.host, this.headers);
      this.dmgcontrollerfhc = new api.fhcDmgControllerApi(this.host, this.headers);
      this.eattestcontrollerfhc = new api.fhcEattestControllerApi(this.host, this.headers);
      this.eattestv2controllerfhc = new api.fhcEattestvControllerApi(this.host, this.headers);
      this.ehboxcontrollerfhc = new api.fhcEhboxControllerApi(this.host, this.headers);
      this.efactcontrollerfhc = new api.fhcEfactControllerApi(this.host, this.headers);
      this.geninscontrollerfhc = new api.fhcGeninsControllerApi(this.host, this.headers);
      this.hubcontrollerfhc = new api.fhcHubControllerApi(this.host, this.headers);
      this.recipecontrollerfhc = new api.fhcRecipeControllerApi(this.host, this.headers);
      this.stscontrollerfhc = new api.fhcStsControllerApi(this.host, this.headers);
      this.tarificationcontrollerfhc = new api.fhcTarificationControllerApi(this.host, this.headers);
      this.therlinkcontrollerfhc = new api.fhcTherlinkControllerApi(this.host, this.headers);
      this.rnconsultcontrollerfhc = new api.fhcConsultrnControllerApi(this.host, this.headers);
      this.memberdatacontrollerfhc = new api.fhcMemberdataControllerApi(this.host, this.headers);
      this.mhmcontrollerfhc = new api.fhcMhmControllerApi(this.host, this.headers);

      this.dispatchEvent(new CustomEvent('refresh', {detail: {}}))
  }

  constructor() {
      super();
  }

    Addressbookcontroller() { return this.addressbookcontrollerfhc }
    Consentcontroller() { return this.consentcontrollerfhc }
    Chaptercontroller() { return this.chaptercontrollerfhc }
    Dmgcontroller() { return this.dmgcontrollerfhc }
    Eattestcontroller() { return this.eattestcontrollerfhc }
    Eattestv2controller() { return this.eattestv2controllerfhc }
    Efactcontroller() { return this.efactcontrollerfhc  }
    Ehboxcontroller() { return this.ehboxcontrollerfhc }
    Geninscontroller() { return this.geninscontrollerfhc }
    Hubcontroller() { return this.hubcontrollerfhc }
    Recipecontroller() { return this.recipecontrollerfhc }
    Stscontroller() { return this.stscontrollerfhc }
    Tarificationcontroller() { return this.tarificationcontrollerfhc }
    Therlinkcontroller() { return this.therlinkcontrollerfhc }
    RnConsultController(){return this.rnconsultcontrollerfhc}
    MemberDataController(){return this.memberdatacontrollerfhc}
    MhmController(){return this.mhmcontrollerfhc}
}

customElements.define(FhcApi.is, FhcApi);

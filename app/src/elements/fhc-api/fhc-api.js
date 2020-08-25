import * as api from '@taktik/fhc-api/dist/fhcApi'

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
      this.addressbookfhc = new api.fhcAddressbookApi(this.host, this.headers);
      this.consentfhc = new api.fhcConsentApi(this.host, this.headers);
      this.chapterfhc = new api.fhcChapter4Api(this.host, this.headers);
      this.dmgfhc = new api.fhcDmgApi(this.host, this.headers);
      this.eattestfhc = new api.fhcEattestApi(this.host, this.headers);
      this.eattestv2fhc = new api.fhcEattestV2Api(this.host, this.headers);
      this.ehboxfhc = new api.fhcEhboxApi(this.host, this.headers);
      this.ehboxV3fhc = new api.fhcEhboxV3Api(this.host, this.headers);
      this.efactfhc = new api.fhcEfactApi(this.host, this.headers);
      this.geninsfhc = new api.fhcGenInsApi(this.host, this.headers);
      this.hubfhc = new api.fhcHubApi(this.host, this.headers);
      this.recipefhc = new api.fhcRecipeApi(this.host, this.headers);
      this.stsfhc = new api.fhcStsApi(this.host, this.headers);
      this.tarificationfhc = new api.fhcTarificationApi(this.host, this.headers);
      this.therlinkfhc = new api.fhcTherLinkApi(this.host, this.headers);
      this.rnconsultfhc = new api.fhcConsultrnApi(this.host, this.headers);
      this.memberdatafhc = new api.fhcMemberDataApi(this.host, this.headers);
      this.mhmfhc = new api.fhcMhmApi(this.host, this.headers);

      this.dispatchEvent(new CustomEvent('refresh', {detail: {}}))
  }

  constructor() {
      super();
  }

    Addressbook() { return this.addressbookfhc }
    Consent() { return this.consentfhc }
    ChapterIV() { return this.chapterfhc }
    Dmg() { return this.dmgfhc }
    Eattest() { return this.eattestfhc }
    Eattestv2() { return this.eattestv2fhc }
    Efact() { return this.efactfhc  }
    Ehbox() { return this.ehboxfhc }
    EhboxV3() {return this.ehboxV3fhc}
    Genins() { return this.geninsfhc }
    Hub() { return this.hubfhc }
    Recipe() { return this.recipefhc }
    Sts() { return this.stsfhc }
    Tarification() { return this.tarificationfhc }
    Therlink() { return this.therlinkfhc }
    RnConsult(){return this.rnconsultfhc}
    MemberData(){return this.memberdatafhc}
    Mhm(){return this.mhmfhc}
}

customElements.define(FhcApi.is, FhcApi);

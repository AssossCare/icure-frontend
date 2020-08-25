import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class DynamicPill extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="icpc-styles">
            span.he-pill {
                border-radius: 10px;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                padding: 0px 6px 1px 8px;
                background-color: white;
                max-width: 100px;
                width: auto;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 1;
                margin-right: 4px;
                height: 12px;
                cursor: pointer;
            }

            span.he-pill-highlighted {
                color: var(--app-text-color-light);
            }
            .ICPC-2-fallback { color: var(--paper-blue-grey-500) !important;}
            .ICPC-2-fallback-back { background: black !important; color: white !important; }
            .ICPC-2-fallback span{ background: white !important; }

            .closePillsBtn{
                height: 10px;
                width: 10px;
            }

            .exclude{
                text-decoration: line-through;
            }
        </style>

        <template is="dom-repeat" items="[[healthElements]]" as="he">
            <template is="dom-if" if="[[he.descr]]">
                <span id="pill-[[he.id]]" class\$="form-title-bar-btn he-pill [[_heColourStyle(he, highlightedHes.*)]] [[_isExcluded(he)]]" on-tap="_highlight">[[he.descr]]<iron-icon id="pill-[[he.id]]" class="closePillsBtn" icon="vaadin:close" on-tap="_deletePills"></iron-icon></span>

            </template>
        </template>
`;
  }

  static get is() {
      return 'dynamic-pills';
  }

  static get properties() {
      return {
          highlightedHes: {
              type: Array,
              notify: true,
              value: () => []
          },
          healthElements: {
              type: Array,
              value: () => []
          }
      };
  }

  static get observers() {
      return [];
  }

  ready() {
      super.ready();
  }

  _highlight(e) {
      const id = e.target.id.substr(5)
      const hHe = this.highlightedHes.find(he => he.id === id)
      if (!hHe) {
          const newHe = this.healthElements.find(he => he.id === id)
          newHe && this.push('highlightedHes', newHe)
      } else {
          this.splice('highlightedHes', this.highlightedHes.indexOf(hHe), 1)
      }
  }

  _heColourStyle(he) {
      return this.highlightedHes.includes(he) ? "he-pill-highlighted " + (he.colour || "ICPC-2-fallback") + "-back" : (he.colour || "ICPC-2-fallback")
  }

  _deletePills(e){
      e.stopPropagation()
      if(e.target.id){
          const id = e.target.id.substr(5)
          const heIndex = _.findIndex(this.healthElements,he => he.id === id)
          const he = this.splice('healthElements', heIndex, 1)
          this.dispatchEvent(new CustomEvent('unlink-to-health-element', { bubbles: true, composed: true, detail: { healthElement: he[0] } }));
      }
  }

  _isExcluded(he){
      return _.get(he, 'tags', []).find(t => t.type === "CD-CERTAINTY" && t.code === "excluded") ? "exclude" : null
  }
}
customElements.define(DynamicPill.is, DynamicPill);

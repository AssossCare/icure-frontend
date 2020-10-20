import '../../styles/shared-styles.js';
import '../../styles/buttons-style.js';
import '../../styles/paper-input-style.js';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class HtRegimen extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="dialog-style buttons-style">
            .dose-tag {
                --dose-tag-text: {
                    font-weight: 500;
                    text-align: center;
                    font-size: var(--font-size-normal);
                    line-height: 24px;
                    padding: 0;
                    margin: 0;
                    display: block;
                    border-width: 0;
                };

                box-sizing: border-box;
                background: var(--app-input-background-color);
                color: var(--app-text-color-dark);
                height: 24px;
                padding: 0;
                margin-right: 8px;
                border-radius: 4px;
                border-width: 0;
                border-style: none;
                overflow: hidden;
                float: left;
                display: flex;
            }

            .time-label {
                @apply --dose-tag-text;
                padding: 0 16px;
                margin: 0;
            }

            .quantity-label {
                @apply --dose-tag-text;
                background: var(--app-secondary-color);
                color: var(--app-text-color-light);
                padding: 0 16px;
                margin: 0;
            }
            .quantity-label:hover {
                background: var(--app-secondary-color-dark);
            }

            .quantity-label:focus {
                background: var(--app-secondary-color-dark);
                color: #fafafa;
            }

            .control-button {
                --paper-icon-button: {
                    height: 24px;
                    width: 20px;
                    background: var(--app-secondary-color);
                    color: var(--app-text-color-light);
                    padding: 2px;
                };
            }

            .control-button:hover {
                background: var(--app-secondary-color-dark);

            }
            .control-button:focus {
                background: var(--app-secondary-color-dark);
                color: #fafafa;
            }

            /*.decrease-button:hover {*/
            /*    --paper-icon-button: {*/
            /*        background: var(--app-text-color-light);*/
            /*        color: var(--app-secondary-color);*/
            /*    }*/
            /*}*/
            /*.decrease-button:focus {*/
            /*    --paper-icon-button: {*/
            /*        background: #fafafa;*/
            /*    }*/
            /*}*/

            .grid-container {
                display: grid;
                grid-template-columns: auto auto auto auto;
                grid-template-rows: 24px;
                grid-template-areas: "time_tag button_decrease quantity_label button_increase";
            }

            .time_tag { grid-area: time_tag; }
            .button_increase { grid-area: button_increase; }
            .quantity_label { grid-area: quantity_label; }
            .button_decrease { grid-area: button_decrease; }

        </style>

        <!--
        <div id="container" class="extra">
            <span>[[extra.quantity]] prise(s) à [[time]]</span>
            <paper-icon-button icon="icons:close" on-tap="_delete">
            </paper-icon-button>
        </div>
        -->

        <div class="grid-container dose-tag">
            <div class="time_tag time-label">[[time]]</div>
            <div class="button_decrease"><paper-icon-button class="control-button" icon="icons:remove" on-tap="decrease"></paper-icon-button></div>
            <div class="quantity_label quantity-label" on-tap="increase">[[extra.quantity]]</div>
            <div class="button_increase"><paper-icon-button class="control-button" icon="icons:add" on-tap="increase"></paper-icon-button></div>
        </div>

<!--        <div class="dose-tag">-->
<!--            <div class="time-label">[[time]]</div>-->
<!--            <div>-->
<!--                <paper-icon-button class="control-button" icon="icons:add" on-tap="increase"></paper-icon-button>-->
<!--            </div>-->
<!--            <div id="counter-label" class="quantity-label" on-tap="increase">[[extra.quantity]]</div>-->
<!--            <div>-->
<!--                <paper-icon-button class="control-button" icon="icons:remove" on-tap="decrease"></paper-icon-button>-->
<!--            </div>-->
<!--        </div>-->
`;
  }

  static get is() {
      return 'ht-regimen';
  }

  static get properties() {
      return {
          api: {
              type: Object
          },
          user: {
              type: Object
          },
          time: {
              type: String
          },
          extra: {
              type: Object,
              value: () => {}
          },
          unit: {
              type: String
          },
          quantityFactor: {
              type: Object,
              notify: true,
              value: null
          }

      };
  }

  static get observers() {
      return [
          "_extraChanged(extra)"
      ];
  }

  constructor() {
      super();
      this.unit = this.localize("uni", "Unités");
  }

  ready() {
      super.ready();
  }

  // refresh() {
  //     console.log("refresh " + this.extra.code);
  //     this.notifyPath("extra.quantity");
  // }

  increase() {
      if (this.quantityFactor && this.quantityFactor.denominator > 1) {
          this.set("extra.quantity", this.quantityFactor.numLabel);
      } else {
          const quantityValue = parseInt(this.extra.quantity) || 0;
          this.set("extra.quantity", quantityValue + 1);
      }
  }

  decrease() {
      if (this.quantityFactor && this.quantityFactor.denominator > 1) {
          this.set("extra.quantity", 0);
      } else {
          const quantityValue = parseInt(this.extra.quantity) || 0;
          if (quantityValue > 0) {
              this.set("extra.quantity", quantityValue - 1);
          }
      }
  }

  // _delete() {
  //     this.dispatchEvent(new CustomEvent("delete-extra", {
  //         detail: {extra: this.extra},
  //         bubbles: true
  //     }));
  // }

  _extraChanged() {
      console.log("extraChanged");
      this.set("time",
          (Math.floor(this.extra.code / 10000) % 100).toString().padStart(2, '0') + ":" +
          (Math.floor(this.extra.code / 100) % 100).toString().padStart(2, '0'));
  }
}

customElements.define(HtRegimen.is, HtRegimen);

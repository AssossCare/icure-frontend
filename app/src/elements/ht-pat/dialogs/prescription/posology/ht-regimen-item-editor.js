import '../../../../../styles/shared-styles.js';
import '../../../../../styles/buttons-style.js';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../../../tk-localizer";
class HtRegimenItemEditor extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="buttons-style">
            .base {
                box-sizing: border-box;
                width: 100%;
                height: var(--counter-height);
                color: transparent;
                /*background: var(--app-input-background-color);*/
                background: var(--app-background-color-dark);
                padding: 0;
                margin: 0;
                /*border-style: solid;*/
                /*border-color: var(--app-background-color-light);*/
                /*border-top-width: var(--counter-border-top-width);*/
                /*border-left-width: var(--counter-border-left-width);*/
                /*border-right-width: var(--counter-border-right-width);*/
                /*border-bottom-width: var(--counter-border-bottom-width);*/
                border-radius: var(--counter-border-radius);
                -webkit-user-select: none;

                display: flex;
            }

            .base:hover {
                background: rgba(255, 80, 0, .2);
            }

            .base:focus {
                background: rgba(221, 52, 21, .2);
            }

            .positive {
                background: var(--app-secondary-color);
                color: var(--app-text-color-light);
            }

            .positive:hover {
                background: var(--app-secondary-color-dark);
            }

            .positive:focus {
                background: var(--app-secondary-color-dark);
                color: #fafafa;
            }

            .control-button {
                --control-button-positive: {
                    height: var(--counter-height);
                    width: calc(var(--counter-height) - 4px);
                    background: var(--app-secondary-color);
                    color: var(--app-text-color-light);
                    padding: 2px;
                };

                --paper-icon-button: {
                    height: 0;
                    width: 0;
                    padding: 0;
                    margin: 0;
                };
            }
            .control-button.positive {
                --paper-icon-button: {
                    @apply --control-button-positive;
                };
            }
            .control-button.left {
                border-radius: var(--counter-border-radius);
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
            .control-button.right {
                border-radius: var(--counter-border-radius);
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }

            .quantity-label {
                width: 100%;
                line-height: var(--counter-height);
                font-weight: 500;
                font-size: var(--font-size-normal);
                padding: 0;
                margin: 0;
                text-align: center;
                display: block;
                border-width: 0;
                /*border-right-width: 0;*/
                /*border-right-style: solid;*/
                /*border-right-color: var(--app-secondary-color-dark);*/
                /*border-left-width: 0;*/
                /*border-left-style: solid;*/
                /*border-left-color: var(--app-secondary-color-dark);*/
            }
            .quantity-label.positive {
                width: calc(100% - var(--counter-height));
                /*border-right-width: 1px;*/
                /*border-left-width: 1px;*/
            }

        </style>
        <div id="counter" class\$="base [[custom]]">
            <div>
                <paper-icon-button class\$="control-button right [[custom]]" icon="icons:remove" on-tap="decrease"></paper-icon-button>
            </div>
            <div id="counter-label" class\$="quantity-label [[custom]]">[[quantity]]</div>
            <div>
                <paper-icon-button class\$="control-button left [[custom]]" icon="icons:add" on-tap="increase"></paper-icon-button>
            </div>
        </div>
`;
  }

  static get is() {
      return 'ht-regimen-item-editor';
  }

  static get properties() {
      return {
          api: {
              type: Object
          },
          user: {
              type: Object
          },
          custom: {
              type: String,
              value: 'normal'
          },
          quantity: {
              type: String,
              value: "",
              notify: true
          },
          mouseIsDown: {
              type: Boolean,
              value: false
          },
          resetTimer: {
              type: Object,
              value: null
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
          "_quantityChanged(quantity)"
      ];
  }

  constructor() {
      super();
  }

  ready() {
      super.ready();
      const counter = this.$['counter-label'];
      if (!counter) return;
      counter.addEventListener('mousedown', this.mouseDown.bind(this), false);
      counter.addEventListener('mouseup', this.mouseUp.bind(this), false);
  }

  reset() {
      if (this.mouseIsDown) {
          this.set("quantity", 0);
          this.mouseIsDown = false;
      }
  }

  decrease() {
      if (this.quantityFactor && this.quantityFactor.denominator > 1) {
          this.set("quantity", 0);
      } else {
          const quantityValue = parseInt(this.quantity) || 0;
          if (quantityValue > 0) {
              this.set("quantity", quantityValue - 1);
          }
      }
  }

  increase() {
      if (this.quantityFactor && this.quantityFactor.denominator > 1) {
          this.set("quantity", this.quantityFactor.numLabel);
      } else {
          const quantityValue = parseInt(this.quantity) || 0;
          this.set("quantity", quantityValue + 1);
      }
  }

  mouseDown(e) {
      if (this.resetTimer) {
          clearTimeout(this.resetTimer);
          this.resetTimer = null;
      }
      if (!this.mouseIsDown) {
          this.mouseIsDown = true;
          this.resetTimer = setTimeout(this.reset.bind(this), 500);
      }
  }

  mouseUp(e) {
      if (this.mouseIsDown) {
          if (this.quantityFactor && this.quantityFactor.denominator > 1) {
              this.set("quantity", this.quantityFactor.numLabel);
          } else {
              const quantityValue = parseInt(this.quantity) || 0;
              this.set("quantity", quantityValue + 1);
          }
          this.mouseIsDown = false;
      }
  }

  _quantityChanged() {
      this.set("custom", this.quantity && "positive" || "");
  }
}

customElements.define(HtRegimenItemEditor.is, HtRegimenItemEditor);

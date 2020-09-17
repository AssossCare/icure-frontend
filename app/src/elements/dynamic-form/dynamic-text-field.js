import './dynamic-link.js';
import './validator/ht-ssin-validator.js';
import '../../styles/paper-input-style.js';
import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class DynamicTextField extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
		<style include="paper-input-style">
			:host {
				position: relative;
				flex-grow: var(--dynamic-field-width, 50);
				min-width: calc(var(--dynamic-field-width-percent, '50%') - 12px);
				margin: 0 6px;
				--paper-font-caption_-_line-height: var(--font-size-normal);
			}

			dynamic-link {
				position: absolute;
				right: 0;
				bottom: 8px;
			}

			.modified-icon {
				width: 18px;
			}

			.modified-previous-value {
				color: var(--app-text-color-disabled);
				text-decoration: line-through;
				font-style: italic;
			}

			.modified-before-out {
				color: var(--app-secondary-color-dark);
				text-align: right;
				float: right;
				font-style: italic;
				border-bottom: 1px dotted var(--app-secondary-color-dark);
			}

			.modified-after-out {
				color: var(--app-secondary-color-dark);
				text-align: right;
				float: right;
				font-style: italic;
				border-bottom: 1px dotted var(--app-secondary-color-dark);
			}

			iron-input{
				min-width: 0;
				box-sizing: border-box;
				width: 100%;
				max-width: 100%;
				position: relative;
			}

			input{
				border: none;
				width: 0;
				min-width: 0;
				outline: 0;
				padding: 0;
				font-size: var(--font-size-normal);
				box-sizing: border-box;
				max-width: calc(100% - 16px);
				width: 100%;
				position:absolute;
				height: 100%;
				background: transparent;
			}

		</style>
		<template is="dom-if" if="[[readOnly]]">
			<paper-input-container always-float-label="true">
				<label slot="label">[[localize(label,label,language)]]<slot name="label"></slot>
					<template is="dom-if" if="[[wasModified]]">
						<span class="modified-before-out">[[localize('mod','modified',language)]] [[lastModified]] <iron-icon class="modified-icon" icon="schedule"></iron-icon></span>
					</template>
					<template is="dom-if" if="[[isModifiedAfter]]">
						<span class="modified-after-out">[[localize('obs_val','obsolete value',language)]]<iron-icon class="modified-icon" icon="report-problem"></iron-icon></span>
					</template>
				</label>
				<iron-input slot="input" bind-value="{{value}}">
					<input type="text" value="{{value::input}}" readonly="">
				</iron-input>
			</paper-input-container>
		</template>
		<template is="dom-if" if="[[!readOnly]]">
			<paper-input-container always-float-label="true">
				<label slot="label">[[localize(label,label,language)]]<slot name="label"></slot>
					<template is="dom-if" if="[[wasModified]]">
						<span class="modified-before-out">[[localize('mod','modified',language)]] [[lastModified]] <iron-icon class="modified-icon" icon="schedule"></iron-icon></span>
					</template>
					<template is="dom-if" if="[[isModifiedAfter]]">
						<span class="modified-after-out">[[localize('obs_val','obsolete value',language)]]<iron-icon class="modified-icon" icon="report-problem"></iron-icon></span>
					</template>
				</label>
				<ht-ssin-validator validator-name="ht-ssin-validator"></ht-ssin-validator>
				<iron-input slot="input" auto-validate="" validator="[[_validator(pattern)]]" bind-value="{{value}}">
					<input type="text" value="{{value::input}}">
				</iron-input>
			</paper-input-container>
			<dynamic-link i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" linkables="[[linkables]]" represented-object="[[key]]" api="[[api]]"></dynamic-link>
		</template>
`;
  }

  static get is() {
      return 'dynamic-text-field';
	}

  static get properties() {
      return {
          wasModified: {
              type: Boolean
          },
          isModifiedAfter: {
              type: Boolean
          },
          readOnly: {
              type: Boolean,
              value: false
          },
          lastModified: {
              type: String
          },
          label: {
              type: String
          },
          pattern: {
              type: String
          },
          context: {
              type: String
          },
          value: {
              type: String,
              notify: true,
              observer: '_valueChanged'
          },
          input: {
              type: String
          },
          width: {
              type: Number,
              value: 48,
              observer: '_widthChanged'
          },
          healthElements: {
              type: Array,
              value: function () {
                  return [];
              }
          }
      };
	}

  constructor() {
      super();
	}

  _widthChanged(width) {
      this.updateStyles({ '--dynamic-field-width': width, '--dynamic-field-width-percent': '' + width + '%' });
	}

  _valueChanged(value) {
      this.dispatchEvent(new CustomEvent('field-changed', { detail: { context: this.context, value: value } }));
	}

  _validator(pattern) {
	    return pattern === ':ssin' ? 'ht-ssin-validator' : null
	}
}

customElements.define(DynamicTextField.is, DynamicTextField);

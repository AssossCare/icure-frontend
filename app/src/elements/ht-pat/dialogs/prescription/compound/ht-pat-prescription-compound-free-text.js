import '../../../../dynamic-form/dynamic-link.js';
import '../../../../dynamic-form/dynamic-pills.js';
import '../../../../ht-spinner/ht-spinner.js';
import '../../../../dynamic-form/dynamic-doc.js';
import '../../../../collapse-button/collapse-button.js';
import '../../../../../styles/dialog-style.js';
import '../../../../../styles/scrollbar-style.js';
import '../../../../../styles/paper-tabs-style';
import '../../../../../styles/shared-styles';
import '../../../../../styles/buttons-style';
import '../../../../../styles/atc-styles';


import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash"
class HtPatPrescriptionCompoundFreeText extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style shared-styles paper-tabs-style atc-styles spinner-style">
            .table{         
                width: auto;
                height: 100%;
                overflow: auto;
                font-size: var(--font-size-normal);
            }
            
            .tr-item{
                cursor: pointer;
            }
            
            .th{
                height: auto!important;
                font-weight: bold;
                vertical-align: middle;
            }
            
            .tr{
                display: flex;
                padding: 4px;                
            }
            
            .td{
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                flex-grow: 1;
                flex-basis: 0;
                padding: 6px;
                overflow: hidden;
                min-width: 0px;
                z-index: 2;
                word-break: break-word;
                white-space: nowrap;               
                font-size: 13px;
                text-overflow: ellipsis;
            }

            .fg0{
                flex-grow: 0.2;
            }
            
            .fg05{
                flex-grow: 0.5;
            }
            
            .fg01{
                flex-grow: 0.1;
            }
            
            .fg1{
                flex-grow: 1;
            }
            
            .fg2{
                flex-grow: 2;
            }  
            
            .fg5{
                flex-grow: 4.6;
            }
            
            .search-container{
                height: 100%;
            }
            
            .search-container-search{
                margin-left: 1%;
                margin-right: 1%;
                height: 45px;
                width: auto;
            }
            
            .search-container-result{
                margin-left: 1%;
                margin-right: 1%;
                margin-top: 1%;
                height: calc(100% - 80px);
                border: 1px solid var(--app-background-color-dark);
            }
            
            .tabIcon{
                height: 14px;
                width: 14px;
                margin-right: 6px;
            }
            
            iron-pages{
                height: calc(100% - 50px);
                overflow: auto;
            }
            
            .page-content{
            
            }
            
            .addIcon{
                background-color: var(--app-secondary-color);
                height: 14px;
                width: 14px;
                cursor: pointer;
                color: white;
            }
            
             .atcIcon{
                height: 8px;
                width: 8px;
            }
            
            ht-spinner{
                height: 100px;
                width: 100px;
            }
            
            .bold{
                font-weight: bold;
            }
            
            .compound-free-text-container{
                height: calc(100% - 10px);
                width: auto;
                margin: 5px;
            }
            
            .textarea-style{
                width: 100%;
            }
            
            .w100{
                width: 100%;
            }
            
            .mtm6{
                margin-top: -6px;
            }
            
        </style>
        
        <div class="compound-free-text-container">
            <div class="table">
                <div class="tr">
                    <div class="td fg1">
                        <vaadin-combo-box class="w100 mtm6" label="[[localize('presc-comp-class', 'Class', language)]]" filter="{{atcClassFilter}}" selected-item="{{selectedAtcClass}}" filtered-items="[[atcClassList]]" item-label-path="label.[[language]]">
                           <template>[[_getLabel(item.label)]]</template>
                        </vaadin-combo-box>
                    </div>
                    <div class="td fg2">
                        <dynamic-text-field label="[[localize('presc-comp-name', 'Name', language)]]*" value="{{selectedCompound.label}}"></dynamic-text-field>
                    </div>
                </div>
                <div class="tr">
                    <vaadin-text-area class="textarea-style" label="[[localize('presc-comp-formula','Formula',language)]]" value="{{selectedCompound.formula}}"></vaadin-text-area>
                </div>
            </div>
        </div>
       
`;
    }

    static get is() {
        return 'ht-pat-prescription-compound-free-text';
    }

    static get properties() {
        return {
            api: {
                type: Object,
                value: null
            },
            user: {
                type: Object,
                value: null
            },
            hcp:{
                type: Object,
                value: () => {}
            },
            language: {
                type: String,
                value: null
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            samVersion:{
                type: Object,
                value: () => {}
            },
            atcClassList: {
                type: Array,
                value: () => []
            },
            selectedAtcClass:{
                type: Object,
                value: () => {}
            },
            selectedCompound: {
                type: Object,
                value: () => {}
            }
        };
    }

    static get observers() {
        return ['_selectedAtcClassChanged(selectedAtcClass)'];
    }

    ready() {
        super.ready();
    }

    _reset(){

    }

    _getLabel(label){
        return label && _.get(label, this.language, null)
    }

    _selectedAtcClassChanged(){

    }

}
customElements.define(HtPatPrescriptionCompoundFreeText.is, HtPatPrescriptionCompoundFreeText);

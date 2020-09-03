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

import './ht-pat-prescription-detail-search-commercial-result'

import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash"
class HtPatPrescriptionDetailSearchAmpsByVmpGroup extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style shared-styles paper-tabs-style atc-styles spinner-style">
            .amps-by-vmp-group-container{
                height: calc(100% - 20px);
                width: auto;
                border: 1px solid var(--app-background-color-dark);
                margin: 5px;
            }
            
            .cheaper-drugs-title{
                height: 30px;
                padding: 5px;
                background: var(--app-background-color-dark);
                box-sizing: border-box;
            }
            
            .cheaper-drugs-container-content{
                height: calc(100% - 30px);
            }
            
            .bold{
                font-weight: bold;
            }
            
            .btn-close{
                float: right;
                margin-top: -4px;
                margin-right: -4px;
            }
        </style>
        
         <div class="amps-by-vmp-group-container">
            <div class="cheaper-drugs-title">
                <span class="bold">[[localize('presc-com--sub', 'Commercial drugs with substance', language)]]: </span> [[selectedMoleculeForAmps.label]]
                <paper-icon-button id="" class="button button--other btn-close" icon="icons:close" on-tap="_closeCommercialBySubstanceView"></paper-icon-button>
            </div>
            <div class="cheaper-drugs-container-content">
                <ht-pat-prescription-detail-search-commercial-result
                    id="htPatPrescriptionDetailSearchCommercialResult"
                    api="[[api]]"
                    i18n="[[i18n]]" 
                    user="[[user]]" 
                    patient="[[patient]]" 
                    language="[[language]]" 
                    resources="[[resources]]"
                    hcp="[[hcp]]"               
                    sam-version="[[samVersion]]"  
                    search-result="[[ampsByVmpGroupList]]"  
                    origin="[[origin]]"     
                ></ht-pat-prescription-detail-search-commercial-result>
            </div>
         </div>
                    
`;
    }

    static get is() {
        return 'ht-pat-prescription-detail-search-amps-by-vmp-group';
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
            ampsByVmpGroupList: {
                type: Array,
                value: () => []
            },
            selectedMoleculeForAmps:{
                type: Object,
                value: () => {}
            },
            origin:{
                type: String,
                value: "ampsByVmpGroupSearch"
            }
        };
    }

    static get observers() {
        return [];
    }

    ready() {
        super.ready();
    }


    _closeCommercialBySubstanceView(){
        this.dispatchEvent(new CustomEvent('close-commercial-by-substance-view', {
            bubbles: true,
            composed: true
        }))
    }

}
customElements.define(HtPatPrescriptionDetailSearchAmpsByVmpGroup.is, HtPatPrescriptionDetailSearchAmpsByVmpGroup);

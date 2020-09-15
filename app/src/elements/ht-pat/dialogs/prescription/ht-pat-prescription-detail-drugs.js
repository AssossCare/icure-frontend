import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash/lodash";
class HtPatPrescriptionDetailDrugs extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style">
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
                height: 22px;            
                border-bottom: 1px solid var(--app-background-color-dark);   
                padding: 4px;                
            }
            
            .tr.selected{ 
                background-color: var(--app-background-color-dark);
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
            
            .fg1{
                flex-grow: 1;
            }
            
            .fg2{
                flex-grow: 2;
            }  
            
            .fg5{
                flex-grow: 4.6;
            }
            
            .container-drugs{
               margin: 1%;
               height: calc(100% - 20px);
               border: 1px solid var(--app-background-color-dark);
            }
            
            .drugs-list{
               height: 100%;
               overflow: auto;
            }
            
            .icon-type{
                height: 12px;
                width: 12px;
            }
            
        </style>
        
        <div class="container-drugs">
            <div class="drugs-list">
                <div class="table">
                    <div class="tr th">                     
                        <div class="td fg05">[[localize('presc-qt','Quantity',language)]]</div>
                        <div class="td fg05">[[localize('presc-type','Type',language)]]</div>
                        <div class="td fg2">[[localize('presc-descr','Description',language)]]</div>
                        <div class="td fg05"></div>
                    </div>
                    <template is="dom-repeat" items="[[drugsToBePrescribe]]" id="drugList">
                        <div class$="[[_isSelected(item,selectedDrug)]]" data-id$="[[item.id]]" on-tap="_openPosologyView">
                            <div class="td fg05"></div>
                            <div class="td fg05"><iron-icon class="icon-type" icon="[[_getDrugType(item)]]"></iron-icon></div>
                            <div class="td fg2">[[_getDrugName(item.drug)]]</div>     
                            <div class="td fg05"><iron-icon class="icon-type" icon="icons:delete" on-tap="_deleteDrug"></iron-icon></div>      
                        </div>   
                    </template>
                </div>
            </div>
        </div>

`;
    }

    static get is() {
        return 'ht-pat-prescription-detail-drugs';
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
            contacts: {
                type: Array,
                value: () => []
            },
            patient: {
                type: Object,
                value: ()  => {}
            },
            currentContact: {
                type: Object,
                value: () => {}
            },
            drugsToBePrescribe:{
                type: Array,
                value: () => []
            },
            selectedDrug:{
                type: Object,
                value : () => {}
            }
        };
    }

    static get observers() {
        return [];
    }

    ready() {
        super.ready();
    }

    _refreshDrugList(){
        this.shadowRoot.querySelector("#drugList").render()
    }

    _getDrugName(drug){
        return _.get(drug, 'label', 'Error')
    }

    _getDrugType(drug){
        return _.get(drug, 'type', null) === "chronic" ? "icons:alarm-on" : _.get(drug, 'type', null) === "history" ? "vaadin:time-backward" : _.get(drug, 'type', null) === "commercial" ? "vaadin:copyright" : _.get(drug, 'type', null) === "substance" ? "vaadin:pill" : _.get(drug, 'type', null) === "compound" ? "vaadin:flask" : null
    }

    _isSelected(drug){
        return _.get(drug,"id",null)===_.get(this,"selectedDrug.id","") ? 'tr selected' :'tr'
    }

    _openPosologyView(e){
        e.stopPropagation();
        const id = _.trim(_.get(e, 'currentTarget.dataset.id'))
        const drug = this.drugsToBePrescribe.find(drug => drug.id===id)

        return !drug ? null : this.dispatchEvent(new CustomEvent('open-posology-view', {
            bubbles: true,
            composed: true,
            detail: {
                product : id===_.get(this,"selectedDrug.id","") ? {} : drug,
                bypassPosologyView: id===_.get(this,"selectedDrug.id","") || !!["history", "chronic"].find(type => type === _.get(drug, 'type', ""))
            }
        }))
    }

    _deleteDrug(e){
        e.stopPropagation()
        const id = _.get(e.path.find(ele => ele.className && ele.className.includes("tr")),"dataset.id",null)
        const drug = this.drugsToBePrescribe.find(drug => drug.id===id)
        return !drug ? null : this.dispatchEvent(new CustomEvent('delete-drug', {
            bubbles: true,
            composed: true,
            detail: {
                product : drug
            }
        }))
    }

}
customElements.define(HtPatPrescriptionDetailDrugs.is, HtPatPrescriptionDetailDrugs);

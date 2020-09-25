import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import '../../../../styles/shared-styles.js';
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
        <style include="dialog-style scrollbar-style shared-styles">
            .table{         
                width: auto;
                height: 100%;
                overflow: hidden;
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
               margin: 5px;
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
            
            .icon-type-larger {
                height: 14px;
                width: 14px;
            }
            
            .icon-quantities {
                height: 18px;
                width: 18px;
                color:var(--button--other_-_color);
            }
            
            .tr:not(.th) .td{
                cursor: pointer;
            }
            
            .singleDrugContainer{
                cursor: pointer;
                border-bottom: 1px solid var(--app-background-color-dark);   
                padding:9px 7px 12px 7px;
            }
            
            .singleDrugContainer.selected{
                background-color: var(--app-background-color-dark);                
            }
            
            .drugLabel{
                white-space:nowrap;                
            }
            
            .drugQuantities {
                text-align: center;
                margin:7px 0 0 0;
            }
            
            .boxesQuantities {
                padding:3px 15px;
                border:1px solid var(--app-background-color-darker);
                display: inline-block;
                margin-left:15px
                margin-right:15px
            }
            
        </style>
        
        <div class="container-drugs">
            <div class="drugs-list">
                <div class="table">
                
<!--                    <div class="tr th">-->
<!--                        <div class="td fg05">[[localize('presc-qt','Quantity',language)]]</div>-->
<!--                        <div class="td fg05">[[localize('presc-type','Type',language)]]</div>-->
<!--                        <div class="td fg2">[[localize('presc-descr','Description',language)]]</div>-->
<!--                        <div class="td fg05"></div>-->
<!--                    </div>-->

<!--                    <template is="dom-repeat" items="[[drugsToBePrescribe]]" id="drugList">-->
<!--                        <div class$="tr [[_isSelected(item,selectedDrug)]]" data-id$="[[item.id]]" on-tap="_selectedDrug">-->
<!--                            <div class="td fg05"><iron-icon class="icon-type" icon="icons:remove" on-tap="_removeBoxes"></iron-icon>[[item.drug.boxes]]<iron-icon class="icon-type" icon="icons:add" on-tap="_addBoxes"></iron-icon></div>-->
<!--                            <div class="td fg05"><iron-icon class="icon-type" icon="[[_getDrugType(item)]]"></iron-icon></div>-->
<!--                            <div class="td fg2">[[_getDrugName(item.drug)]]</div>     -->
<!--                            <div class="td fg05"><iron-icon class="icon-type" icon="icons:delete" on-tap="_deleteDrug"></iron-icon></div>      -->
<!--                        </div>   -->
<!--                    </template>-->
                    
                    <template is="dom-repeat" items="[[drugsToBePrescribe]]" id="drugList">
                        <div class$="singleDrugContainer [[_isSelected(item,selectedDrug)]]" data-id$="[[item.id]]" data-internal-id$="[[item.drug.internalUuid]]" on-tap="_selectedDrug">
                            <div class="drugLabel"><iron-icon class="icon-type-larger mr10" icon="[[_getDrugType(item)]]"></iron-icon>[[_getDrugName(item.drug)]]</div>     
                            <div class="drugQuantities">
                                <iron-icon class="icon-quantities" icon="icons:remove-circle-outline" on-tap="_removeBoxes"></iron-icon>
                                <span class="boxesQuantities">[[item.drug.boxes]] [[localize('boxeOrBoxes','Boxe(s)',language)]]</span>
                                <iron-icon class="icon-quantities" icon="icons:add-circle-outline" on-tap="_addBoxes"></iron-icon>
                            </div>
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
        return _.get(drug,"id",null)===_.get(this,"selectedDrug.id","") ? 'selected' :''
    }

    _selectedDrug(e){

        e.stopPropagation();

        const drugInternalId = this._getEventDatasetValue(e, "internalId")
        const drug = _.find(_.get(this,"drugsToBePrescribe"), it => _.trim(_.get(it,"drug.internalUuid")) === drugInternalId)

        return !drug ? null : this.dispatchEvent(new CustomEvent('selected-drug', { bubbles: true, composed: true, detail: {
            product : drugInternalId === _.trim(_.get(this,"selectedDrug.drug.internalUuid","")) ? {} : drug,
            bypassPosologyView: drugInternalId === _.trim(_.get(this,"selectedDrug.drug.internalUuid",""))
        }}))

    }

    _getEventDatasetValue(e, datasetKey="id") {

        return _.trim(_.get(_.find(_.get(e,"path"), it => _.some(_.get(it,"className").split(" "), cssClass => ["tr", "singleDrugContainer"].indexOf(cssClass) > -1)), "dataset." + datasetKey, null))

    }

    _deleteDrug(e){

        e.stopPropagation();

        const drugInternalId = this._getEventDatasetValue(e, "internalId")
        const drug = _.find(_.get(this,"drugsToBePrescribe", it => _.trim(_.get(it,"drug.internalUuid")) === drugInternalId))

        return !drug ? null : this.dispatchEvent(new CustomEvent('delete-drug', { bubbles: true, composed: true, detail: { product : drug }}))

    }

    _removeBoxes(e){

        e.stopPropagation();

        const drugInternalId = this._getEventDatasetValue(e, "internalId")
        const drug = _.find(_.get(this,"drugsToBePrescribe"), it => _.trim(_.get(it,"drug.internalUuid")) === drugInternalId)
        const drugIndexInDrugsToBePrescribed = _.get(this,"drugsToBePrescribe",[]).findIndex(it => _.trim(_.get(it,"drug.internalUuid")) === drugInternalId)

        return !drug ? null :
            _.get(drug,"drug.boxes") > 1 ? ((drug.drug && drug.drug.boxes && drug.drug.boxes--)||true)
                && (this.notifyPath('drugsToBePrescribe.' + drugIndexInDrugsToBePrescribed + '.drug.boxes')||true)
                && this.dispatchEvent(new CustomEvent('box-quantity-updated', { bubbles: true, composed: true, detail: { internalUuid : drugInternalId, newQuantity: _.get(drug,"drug.boxes",1) }})) :
            this._deleteDrug(e)

    }

    _addBoxes(e){

        e.stopPropagation();

        const drugInternalId = this._getEventDatasetValue(e, "internalId")
        const drug = _.find(_.get(this,"drugsToBePrescribe"), it => _.trim(_.get(it,"drug.internalUuid")) === drugInternalId)
        const drugIndexInDrugsToBePrescribed = _.get(this,"drugsToBePrescribe",[]).findIndex(it => _.trim(_.get(it,"drug.internalUuid")) === drugInternalId)

        return !drug ? null :
            ((drug.drug && drug.drug.boxes && drug.drug.boxes++)||true)
            && (this.notifyPath('drugsToBePrescribe.' + drugIndexInDrugsToBePrescribed + '.drug.boxes')||true)
            && this.dispatchEvent(new CustomEvent('box-quantity-updated', { bubbles: true, composed: true, detail: { internalUuid : drugInternalId, newQuantity: _.get(drug,"drug.boxes",1) }}))

    }

}
customElements.define(HtPatPrescriptionDetailDrugs.is, HtPatPrescriptionDetailDrugs);

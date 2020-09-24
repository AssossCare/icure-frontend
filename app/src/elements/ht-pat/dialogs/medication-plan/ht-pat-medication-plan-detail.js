import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import '../../../../styles/paper-tabs-style'
import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import './ht-pat-medication-plan-detail-prescription'


import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash"
class HtPatMedicationPlanDetail extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style paper-tabs-style">
        
        #medicationPlanDetailDialog{
            height: calc(98% - 12vh);
            width: 98%;
            max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
            min-height: 400px;
            min-width: 800px;
            top: 85px;
        }
        
        .medicationPlanDetailDialog{
            height: calc(100% - 45px);
            width: auto;
            margin: 0;
            padding: 0;
            background-color: white;
        }
        
        .content-header{
            margin-top: 0;
            display: flex;
            position: relative;
            height: 48px;
            width: 100%;
            border-bottom: 1px solid var(--app-background-color-darker);
            background-color: var(--app-background-color-dark);
            padding: 0 12px;
            flex-flow: row wrap;
            justify-content: flex-start;
            align-items: center;
            box-sizing: border-box;
        }
        
        .content-header-txt{
             font-weight: bold;
             padding: 14px 0px 0px 0px;
             width: 60%;
        }
        
        .content-header-tab{
            width: 40%;
        }

        .content{
           display: flex;
           height: calc(98% - 76px)!important;
           width: 100%;
           max-height: none;
        }
        
        iron-pages{
            height: calc(100% - 50px);
            overflow: auto;
            width: 100%;
        }
      
        .buttons{
          position: absolute;
          right: 0;
          bottom: 0;
          margin: 0;
        }
        
        </style>
        
        <paper-dialog id="medicationPlanDetailDialog" class="medicationPlanDetailDialog">
          <div class="content-header">
             <div class="content-header-txt">
                 [[localize('med-plan', 'Medication', language)]]
             </div>   
             <div class="content-header-tab">
                  <paper-tabs selected="{{tabs}}">
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="icons:time-backward"></iron-icon> [[localize('med-plan-histo','History',language)]]
                    </paper-tab> 
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="icons:doctor"></iron-icon> [[localize('med-plan-hcp-plan','Hcp plan',language)]]
                    </paper-tab> 
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="icons:user"></iron-icon> [[localize('med-plan-pat-plan','Patient plan',language)]]
                    </paper-tab> 
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="icons:time-backward"></iron-icon> [[localize('med-plan-ch4','Chapter IV',language)]]
                    </paper-tab> 
                 </paper-tabs>
            </div>      
          </div>
          <div class="content">
             <iron-pages selected="[[tabs]]">
                <page>
                    <div class="page-content">
                        <ht-pat-medication-plan-detail-prescription 
                            id="htPatMedicationPlanDetailPrescription" 
                            api="[[api]]" 
                            i18n="[[i18n]]" 
                            user="[[user]]" 
                            patient="[[patient]]" 
                            language="[[language]]" 
                            resources="[[resources]]" 
                            current-contact="[[currentContact]]" 
                            contacts="[[contacts]]" 
                            hcp="[[hcp]]" 
                            list-of-drugs="[[listOfDrugs]]"
                        ></ht-pat-medication-plan-detail-prescription>
                    </div>
                </page>
            </iron-pages>
          </div>
          <div class="buttons">
            <paper-button class="button button--other" on-tap="_closeDialog"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
          </div>
        </paper-dialog>

`;
    }

    static get is() {
        return 'ht-pat-medication-plan-detail';
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
            isLoading:{
                type: Boolean,
                value: false
            },
            tabs:{
                type: Number,
                value: 0
            },
            listOfDrugs:{
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

    _reset(){
        this.set('listOfDrugs', [])
    }

    _open(){
        this.shadowRoot.querySelector("#medicationPlanDetailDialog").open()
        this.set('listOfDrugs', _.orderBy(this._refreshHistoryList(_.flatten(_.get(this, 'contacts', []).map(ctc => ctc.services)).filter(ser => _.get(ser, 'tags', []).find(tag => _.get(tag, 'type', null) === "ICURE" && _.get(tag, 'code', null) === "PRESC"))), ["deliveryMoment"], ["desc"]))
    }


    _refreshHistoryList(){
        const historyServiceList = _.flatten(_.get(this, 'contacts', []).map(ctc => ctc.services)).filter(ser => _.get(ser, 'tags', []).find(tag => _.get(tag, 'type', null) === "ICURE" && _.get(tag, 'code', null) === "PRESC"))
        return this._refreshList(historyServiceList)
    }

    _refreshList(serviceList){
        return serviceList.map(service => {
            if(_.get(service, 'content.'+this.language+'.medicationValue', null) || _.get(service, 'content.medicationValue', null)){
                if(_.get(service, 'content.'+this.language+'.medicationValue.medicinalProduct', null) || _.get(service, 'content.medicationValue.medicinalProduct', null)){
                    const drug = _.get(service, 'content.'+this.language+'.medicationValue.medicinalProduct', null) ? _.get(service, 'content.'+this.language+'.medicationValue.medicinalProduct', null) :  _.get(service, 'content.medicationValue.medicinalProduct', null)
                    return this._composeHistory(drug, service, 'commercial')
                }else if(_.get(service, 'content.'+this.language+'.medicationValue.substanceProduct', null) || _.get(service, 'content.medicationValue.substanceProduct', null)){
                    const drug = _.get(service, 'content.'+this.language+'.medicationValue.substanceProduct', null) ? _.get(service, 'content.'+this.language+'.medicationValue.substanceProduct', null) : _.get(service, 'content.medicationValue.substanceProduct', null)
                    return this._composeHistory(drug, service, 'substance')
                }else if(_.get(service, 'content.'+this.language+'.medicationValue.compoundPrescription', null) || _.get(service, 'content.medicationValue.compoundPrescription', null)){
                    const drug = _.get(service, 'content.'+this.language+'.medicationValue.compoundPrescription', null) ? _.get(service, 'content.'+this.language+'.medicationValue.compoundPrescription', null) : _.get(service, 'content.medicationValue.compoundPrescription', null)
                    return this._composeHistory(drug, service, 'compound')
                }
            }
        })
    }

    _composeHistory(drug, service, type){
        return {
            service: service,
            rid: _.get(service, 'content.'+this.language+'.medicationValue.prescriptionRID', null),
            deliveryMoment:  _.get(service, 'content.'+this.language+'.medicationValue.deliveryMoment', null) ? _.get(service, 'content.'+this.language+'.medicationValue.deliveryMoment', null) : _.get(service, 'content.'+this.language+'.medicationValue.beginMoment', null) || "19700101",
            endExecutionMoment: _.get(service, 'content.'+this.language+'.medicationValue.endExecutionMoment', null),
            label: _.get(drug, "intendedname", null),
            posology: _.get(service, 'content.'+this.language+'.medicationValue.instructionForPatient', null),
            author: _.get(service, 'author', null),
            status: _.get(service, 'content.'+this.language+'.medicationValue.status', null),
            type: type,
            id: _.get(service, 'id', null)
        }
    }


}
customElements.define(HtPatMedicationPlanDetail.is, HtPatMedicationPlanDetail);

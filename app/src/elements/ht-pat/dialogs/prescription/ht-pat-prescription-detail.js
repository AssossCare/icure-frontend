import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import './ht-pat-prescription-detail-drugs'
import './ht-pat-prescription-detail-posology'
import './ht-pat-prescription-detail-search'
import './ht-pat-prescription-detail-cheaper-drugs'
import './ht-pat-prescription-detail-cnk-info'

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash"
class HtPatPrescriptionDetail extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style">
        
        #prescriptionDetailDialog{
            height: calc(98% - 12vh);
            width: 98%;
            max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
            min-height: 400px;
            min-width: 800px;
            top: 85px;
        }
        
        .prescriptionDetailDialog{
            height: calc(100% - 45px);
            width: auto;
            margin: 0;
            padding: 0;
            background-color: white;
        }
        
        .content-header{
            margin-top: 0;
            display: block;
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
        }

        .content{
           display: flex;
           height: calc(98% - 76px)!important;
           width: 100%;
           max-height: none;
        }
        
        .buttons{
          position: absolute;
          right: 0;
          bottom: 0;
          margin: 0;
        }
        
        .content-drugs{
            width: 20%;
        }
        
        .content-search{
            width: 80%;
        }
        
        .content-cheaper-drug{
            width: 80%;
        }
        
        .content-posology{
            width: 80%;
        }

        </style>
        
        <paper-dialog id="prescriptionDetailDialog" class="prescriptionDetailDialog">
            <div class="content-header">
                <div class="content-header-txt">
                    [[localize('presc', 'Prescription', language)]]
                </div>          
            </div>
            <div class="content">
                <div class="content-drugs">
                    <ht-pat-prescription-detail-drugs 
                        id="htPatPrescriptionDetailDrugs" 
                        api="[[api]]" 
                        i18n="[[i18n]]" 
                        user="[[user]]" 
                        patient="[[patient]]" 
                        language="[[language]]" 
                        resources="[[resources]]" 
                        current-contact="[[currentContact]]" 
                        contacts="[[contacts]]" 
                        hcp="[[hcp]]" 
                        list-of-prescription="[[listOfPrescription]]" 
                        list-of-compound="[[listOfCompound]]"
                        list-of-chronic="[[listOfChronic]]"
                        allergies="[[allergies]]"
                        drugs-to-be-prescribe="[[drugsToBePrescribe]]"
                    ></ht-pat-prescription-detail-drugs>
                </div>
                <template is="dom-if" if="[[isSearchView]]">
                    <div class="content-search">
                        <ht-pat-prescription-detail-search 
                            id="htPatPrescriptionDetailSearch" 
                            api="[[api]]" 
                            i18n="[[i18n]]" 
                            user="[[user]]" 
                            patient="[[patient]]" 
                            language="[[language]]" 
                            resources="[[resources]]" 
                            current-contact="[[currentContact]]" 
                            contacts="[[contacts]]" 
                            hcp="[[hcp]]" 
                            list-of-prescription="[[listOfPrescription]]" 
                            list-of-compound="[[listOfCompound]]"
                            list-of-chronic="[[listOfChronic]]"
                            allergies="[[allergies]]"
                            on-open-posology-view="_openPosologyView"    
                            on-search-cheaper-drugs="_searchCheaperDrugs"
                            on-cheaper-drugs-list-loaded="_openCheaperDrugsView"
                        ></ht-pat-prescription-detail-search>
                    </div>
                </template>
                 <template is="dom-if" if="[[isPosologyView]]">
                    <div class="content-posology">
                        <ht-pat-prescription-detail-posology 
                            id="htPatPrescriptionDetailPosology" 
                            api="[[api]]" 
                            i18n="[[i18n]]" 
                            user="[[user]]" 
                            patient="[[patient]]" 
                            language="[[language]]" 
                            resources="[[resources]]" 
                            current-contact="[[currentContact]]" 
                            contacts="[[contacts]]" 
                            hcp="[[hcp]]" 
                            list-of-prescription="[[listOfPrescription]]" 
                            list-of-compound="[[listOfCompound]]"
                            list-of-chronic="[[listOfChronic]]"
                            medication="[[selectedDrugForPosology]]"
                            allergies="[[allergies]]"
                            reimbursement-type-list="[[reimbursementTypeList]]"
                            on-open-additional-cnk-info="_openAdditionalCnkInfo"
                         ></ht-pat-prescription-detail-posology>
                    </div>
                </template> 
                <template is="dom-if" if="[[isCheaperDrugView]]">
                     <div class="content-cheaper-drug">
                        <ht-pat-prescription-detail-cheaper-drugs
                            id="htPatPrescriptionDetailCheaperDrug"
                            api="[[api]]"
                            i18n="[[i18n]]" 
                            user="[[user]]" 
                            patient="[[patient]]" 
                            language="[[language]]" 
                            resources="[[resources]]"
                            hcp="[[hcp]]" 
                            cheaper-drugs-list="[[cheaperDrugsList]]"
                            selected-parent-drug-for-cheaper="[[selectedParentDrugForCheaper]]"
                            on-open-posology-view="_openPosologyView"
                            on-close-cheaper-drugs-view="_closeCheaperDrugsView"
                        /></ht-pat-prescription-detail-cheaper-drugs>
                     </div>
                </template> 
                <template is="dom-if" if="[[isCnkInfoView]]">
                     <div class="content-cheaper-drug">
                        <ht-pat-prescription-detail-cnk-info
                            id="htPatPrescriptionDetailCnkInfo"
                            api="[[api]]"
                            i18n="[[i18n]]" 
                            user="[[user]]" 
                            patient="[[patient]]" 
                            language="[[language]]" 
                            resources="[[resources]]"
                            hcp="[[hcp]]"                     
                            on-close-cnk-info-view="_closeCnkInfoView"
                        /></ht-pat-prescription-detail-cnk-info>
                     </div>
                </template>                             
            </div>
            <div class="buttons">
                <paper-button class="button button--other" on-tap="_closeDialog"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                <template is="dom-if" if="[[isPosologyView]]">
                    <paper-button class="button button--other" on-tap="_closePosologyView"><iron-icon icon="icons:close"></iron-icon> [[localize('pos-clo-pos','Close posology',language)]]</paper-button>
                    <paper-button class="button button--other" on-tap="_createMedication"><iron-icon icon="icons:add-circle-outline"></iron-icon> [[localize('pos-crea-med','Create medication',language)]]</paper-button>
                    <paper-button class="button button--other" on-tap="_validatePosology"><iron-icon icon="icons:check"></iron-icon> [[localize('pos-presc','Validate posology',language)]]</paper-button>
                </template>
            </div>
        </paper-dialog>

`;
    }

    static get is() {
        return 'ht-pat-prescription-detail';
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
            allergies:{
              type: Array,
              value: () => []
            },
            isPosologyView: {
                type: Boolean,
                value: false
            },
            isSearchView: {
                type: Boolean,
                value: false
            },
            isCheaperDrugView:{
                type: Boolean,
                value: false
            },
            isCnkInfoView:{
                type: Boolean,
                value: false
            },
            listOfCompound: {
                type: Array,
                value: () => []
            },
            listOfPrescription: {
                type: Array,
                value: () => []
            },
            listOfChronic:{
                type: Array,
                value: () => []
            },
            selectedDrugForPosology:{
                type: Object,
                value: {
                    id: null,
                    type: null
                }
            },
            drugsToBePrescribe:{
                type: Array,
                value: () => []
            },
            reimbursementTypeList:{
                type: Array,
                value: () => []
            },
            cheaperDrugsList:{
                type: Array,
                value: () => []
            },
            selectedParentDrugForCheaper:{
                type: Object,
                value: () => {}
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
        this.set('isPosologyView', false)
        this.set('isSearchView', true)
        this.set('isCheaperDrugView', false)
        this.set('isCnkInfoView', false)
        this.set('selectedDrugForPosology', {
            id: null,
            type: null
        })
        this.set('listOfCompound', [])
        this.set('listOfPrescription', [])
        this.set('listOfChronic', [])
        this.set('drugsToBePrescribe', [])
        this.set('reimbursmentTypeList', [])
        this.set('cheaperDrugsList', [])
        this.set('selectedParentDrugForCheaper', {})
    }

    _open(e){
        this._reset()
        this.api.hcparty().getHealthcareParty(_.get(this, 'user.healthcarePartyId', null))
            .then(hcp => {
                this.set('hcp', hcp)
                return  this.api.code().findCodes('be', "CD-REIMBURSEMENT-RECIPE")
            })
            .then(reimbursementCode => this.set('reimbursementTypeList', reimbursementCode))
            .finally(() => {
                this.set('listOfCompound', this._refreshCompoundList())
                this.set('listOfPrescription', this._refreshHistoryList())
                this.set('listOfChronic', this._refreshChronicList())
                this.shadowRoot.querySelector('#prescriptionDetailDialog').open()
            })
    }

    _refreshHistoryList(){
        const historyServiceList = _.flatten(_.get(this, 'contacts', []).map(ctc => ctc.services)).filter(ser => _.get(ser, 'tags', []).find(tag => _.get(tag, 'type', null) === "ICURE" && _.get(tag, 'code', null) === "PRESC"))
        return this._refreshList(historyServiceList)
    }

    _refreshChronicList(){
        const chronicServiceList = _.uniqBy(_.flatten(_.get(this, 'contacts', []).map(ctc => ctc.services)).filter(ser => _.get(ser, 'tags', []).find(tag => _.get(tag, 'type', null) === "CD-ITEM" && _.get(tag, 'code', null) === 'medication')), 'id').filter(s =>!_.get(s, 'endOfLife', null) && (!(this.api.contact().medicationValue(s, this.language) || {}).endMoment || this.api.moment((this.api.contact().medicationValue(s, this.language) || {}).endMoment).isSameOrAfter(moment(),'day')))
        return this._refreshList(chronicServiceList)
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

    _refreshCompoundList(){
        return _.get(this, 'user.properties', []).find(prop => _.get(prop, 'type.identifier', null) === "org.taktik.icure.user.compounds") ? JSON.parse(_.get(_.get(this, 'user.properties', []).find(prop => _.get(prop, 'type.identifier', null) === "org.taktik.icure.user.compounds"), 'typedValue.stringValue', null)) : null
    }

    _composeHistory(drug, service, drugType){
        return {
            endDate: _.get(service, 'content.'+this.language+'.medicationValue', null) ? _.get(service, 'content.'+this.language+'.medicationValue.endMoment', null) : _.get(service, 'content.medicationValue.endMoment', null),
            startDate: _.get(service, 'content.'+this.language+'.medicationValue', null) ? _.get(service, 'content.'+this.language+'.medicationValue.beginMoment', null) : _.get(service, 'content.medicationValue.beginMoment', null),
            publicPrice: null,
            chapt4: null,
            atc: _.get(_.get(service, 'codes', []).find(cd => _.get(cd, 'type', null) === "CD-ATC"), 'code', null),
            label: _.get(drug, 'intendedname', null),
            delivery: null,
            cat: null,
            narcotic: null,
            reinPharmaVigi: null,
            pharmaVigi: null,
            severeRenalInsu: null,
            moderateRenalInsu: null,
            atcCat: _.get(_.get(service, 'codes', []).find(cd => _.get(cd, 'type', null) === "CD-ATC"), 'code', null) ? _.get(_.get(service, 'codes', []).find(cd => _.get(cd, 'type', null) === "CD-ATC"), 'code', null).substring(0,1) : null,
            id: _.get(service, 'id', null),
            status:  null,
            service: service,
            normalizedSearchTerms: _.map(_.uniq(_.compact(_.flatten(_.concat([_.trim(_.get(drug, 'intendedname', ""))])))), i =>  _.trim(i).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")).join(" "),
            drugType: drugType
        }
    }

    _closeDialog(){
        this.shadowRoot.querySelector('#prescriptionDetailDialog').close()
    }

    _openPosologyView(e){
        if(_.get(e, 'detail.id', null) && _.get(e, 'detail.type', null)){
            //chronic, history => get drug by id to check if it still exist
            //commercial, substance, compound => no need to check if it still exist
         ;(
            _.trim(_.get(e, 'detail.type')) === "chronic" || _.get(e, 'detail.type', null) === "history" ? Promise.resolve(_.get(e, 'detail.product', null)) :
            _.trim(_.get(e, 'detail.type')) === "commercial" ? Promise.resolve(_.get(e, 'detail.product', null)) :
            _.trim(_.get(e, 'detail.type')) === "substance" ?  Promise.resolve(_.get(e, 'detail.product', null)) :
            _.trim(_.get(e, 'detail.type')) === "compound" ?  Promise.resolve(_.get(e, 'detail.product', null)) : Promise.resolve({})
          ).then(drugInfo => {
              this.set('selectedDrugForPosology', {
                  id: _.get(e ,'detail.id', null),
                  type: _.get(e, 'detail.type', null),
                  drug: drugInfo
              })
              this.push('drugsToBePrescribe', {
                  drug: drugInfo,
                  type: _.get(e, 'detail.type', null),
                  posology: {}
              })
          }).finally(() => {
              if(!_.get(e, 'detail.bypassPosologyView', null)){
                  this.set('isPosologyView', true)
                  this.set('isSearchView', false)
                  this.set('isCheaperDrugView', false)
              }
              this.shadowRoot.querySelector("#htPatPrescriptionDetailDrugs")._refreshDrugList()
          })
        }
    }

    _validatePosology(){
        this.shadowRoot.querySelector("#htPatPrescriptionDetailDrugs")._validatePosology()
    }

    _createMedication(){
        this.shadowRoot.querySelector("#htPatPrescriptionDetailDrugs")._createMedication()
    }

    _closePosologyView(){
        this.set('isPosologyView', false)
        this.set('isSearchView', true)
        this.set('isCheaperDrugView', false)
        this.set('isCnkInfoView', false)
    }

    _closeCheaperDrugsView(){
        this.set('isPosologyView', false)
        this.set('isSearchView', true)
        this.set('isCheaperDrugView', false)
        this.set('isCnkInfoView', false)
    }

    _closeCnkInfoView(){
        this.set('isPosologyView', true)
        this.set('isSearchView', false)
        this.set('isCheaperDrugView', false)
        this.set('isCnkInfoView', false)
    }

    _searchCheaperDrugs(e){
        if(_.get(e ,'detail.groupId', null)){
            this.shadowRoot.querySelector("#htPatPrescriptionDetailSearch")._searchCheaperAlternative(_.get(e ,'detail.groupId', null), _.get(e ,'detail.uuid', null), _.get(e ,'detail.uuids', null), _.get(e, 'detail.drug', null))
        }
    }

    _openCheaperDrugsView(e){
        this.set('cheaperDrugsList', [])
        this.set('selectedParentDrugForCheaper',{})

        if(_.get(e, 'detail.cheaperDrugsList', [])){
            this.set('cheaperDrugsList', _.get(e, 'detail.cheaperDrugsList', []))
            this.set('selectedParentDrugForCheaper', _.get(e, 'detail.parentDrug', {}))
            this.set('isPosologyView', false)
            this.set('isSearchView', false)
            this.set('isCheaperDrugView', true)
        }

    }

    _openAdditionalCnkInfo(e) {

        const product = _.get(e,"detail.product");

        console.log("_openAdditionalCnkInfo", product)

    }

}
customElements.define(HtPatPrescriptionDetail.is, HtPatPrescriptionDetail);

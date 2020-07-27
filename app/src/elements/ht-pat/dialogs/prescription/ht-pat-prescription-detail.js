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

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
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
                            on-open-posology-view="_openPosologyView"    
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
                            selected-drug-for-posology="[[selectedDrugForPosology]]"
                         ></ht-pat-prescription-detail-posology>
                    </div>
                </template>                           
            </div>
            <div class="buttons">
                <paper-button class="button button--other" on-tap="_closeDialog"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
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
            isPosologyView: {
                type: Boolean,
                value: false
            },
            isSearchView: {
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
            selectedDrugForPosology:{
                type: Object,
                value: {
                    id: null,
                    type: null
                }
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
        this.set('selectedDrugForPosology', {
            id: null,
            type: null
        })
    }

    _open(e){
        this._reset()

        this.api.hcparty().getHealthcareParty(_.get(this, 'user.healthcarePartyId', null))
            .then(hcp => this.set('hcp', hcp))
            .finally(() => {
                this.set('listOfCompound', this._refreshCompoundList())
                this.set('listOfPrescription', this._refreshHistoryList())
                this.shadowRoot.querySelector('#prescriptionDetailDialog').open()
            })
    }

    _refreshHistoryList(){
        const serviceList = _.flatten(_.get(this, 'contacts', []).map(ctc => ctc.services)).filter(ser => _.get(ser, 'tags', []).find(tag => _.get(tag, 'type', null) === "ICURE" && _.get(tag, 'code', null) === "PRESC"))
        return serviceList.map(service => {
            if(_.get(service, 'content.'+this.language+'.medicationValue', null) || _.get(service, 'content.medicationValue', null)){
                if(_.get(service, 'content.'+this.language+'.medicationValue.medicinalProduct', null) || _.get(service, 'content.medicationValue.medicinalProduct', null)){
                    const drug = _.get(service, 'content.'+this.language+'.medicationValue.medicinalProduct', null) ? _.get(service, 'content.'+this.language+'.medicationValue.medicinalProduct', null) :  _.get(service, 'content.medicationValue.medicinalProduct', null)
                    return this._composeHistory(drug, service)
                }else if(_.get(service, 'content.'+this.language+'.medicationValue.substanceProduct', null) || _.get(service, 'content.medicationValue.substanceProduct', null)){
                    const drug = _.get(service, 'content.'+this.language+'.medicationValue.substanceProduct', null) ? _.get(service, 'content.'+this.language+'.medicationValue.substanceProduct', null) : _.get(service, 'content.medicationValue.substanceProduct', null)
                    return this._composeHistory(drug, service)
                }else if(_.get(service, 'content.'+this.language+'.medicationValue.compoundPrescription', null) || _.get(service, 'content.medicationValue.compoundPrescription', null)){
                    const drug = _.get(service, 'content.'+this.language+'.medicationValue.compoundPrescription', null) ? _.get(service, 'content.'+this.language+'.medicationValue.compoundPrescription', null) : _.get(service, 'content.medicationValue.compoundPrescription', null)
                    return this._composeHistory(drug, service)
                }
            }
        })
    }

    _refreshCompoundList(){
        return _.get(this, 'user.properties', []).find(prop => _.get(prop, 'type.identifier', null) === "org.taktik.icure.user.compounds") ? this.set('listOfCompound', JSON.parse(_.get(_.get(this, 'user.properties', []).find(prop => _.get(prop, 'type.identifier', null) === "org.taktik.icure.user.compounds"), 'typedValue.stringValue', ""))) : null
    }

    _composeHistory(drug, service){
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
            service: service
        }
    }

    _closeDialog(){
        this.shadowRoot.querySelector('#prescriptionDetailDialog').close()
    }

    _openPosologyView(e){
        if(_.get(e, 'detail.id', null) && _.get(e, 'detail.type', null)){
            this.set('selectedDrugForPosology', {
                id: _.get(e ,'detail.id', null),
                type: _.get(e, 'detail.type', null)
            })
            this.set('isPosologyView', true)
            this.set('isSearchView', false)
        }

    }

}
customElements.define(HtPatPrescriptionDetail.is, HtPatPrescriptionDetail);

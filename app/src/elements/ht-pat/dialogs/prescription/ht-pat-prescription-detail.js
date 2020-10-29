import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import './compound/ht-pat-prescription-compound-management'
import './search/ht-pat-prescription-detail-search-cheaper-drugs'
import './search/ht-pat-prescription-detail-search-amps-by-vmp-group'
import './ht-pat-prescription-detail-drugs'
import './ht-pat-prescription-detail-posology'
import './ht-pat-prescription-detail-search'
import './ht-pat-prescription-detail-cnk-info'
import '../../../../styles/spinner-style.js';
import '../../../../styles/shared-styles.js';


import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash"
class HtPatPrescriptionDetail extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style shared-styles spinner-style">
        
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
        
        .content-amps-by-vmp-group{
           width: 80%;
        }
        
        .content-posology{
           width: 80%;
        }
        
        .samVersion{
           float: right;
           font-size: 12px;
           margin-right: 10px;
           font-weight: normal;
        }
        
        .bold{
           font-weight: bold;
        }
        
        .redVersion{
           color: var(--app-status-color-nok);
        }
        
        .orangeVersion{
           color: var(--app-status-color-pending);
        }
        
        .greenVersion{
           color: var(--app-status-color-ok);
        }
        
        .samStatusIcon{
            height: 10px;
            width: 10px;
        }
        
        .content-compound-management{
          width: 80%;
        }

        </style>
        
        <paper-dialog id="prescriptionDetailDialog" class="prescriptionDetailDialog">
        
            <div class="content-header">
                <div class="content-header-txt">
                    [[localize('presc', 'Prescription', language)]]
                    <div class="samVersion">
                        <span class="bold">
                            [[localize('presc-sam-vers', 'Sam version', language)]]:
                        </span> 
                        [[samVersion.version]] ([[_formatDate(samVersion.date)]])
                        <iron-icon icon="vaadin:circle" class$="samStatusIcon [[_getStatusOfSam(samVersion)]]"></iron-icon>
                    </div>
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
                        selected-drug="[[selectedDrugForPosology]]"
                        sam-version="[[samVersion]]"
                        on-selected-drug="_selectedDrug"
                        on-delete-drug="_deleteDrug"
                        on-box-quantity-updated="_boxQuantityUpdated"
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
                            sam-version="[[samVersion]]"
                            on-open-posology-view="_openPosologyView"    
                            on-search-cheaper-drugs="_searchCheaperDrugs"
                            on-cheaper-drugs-list-loaded="_openCheaperDrugsView"
                            on-search-commercial-by-substance-view="_searchCommercialBySubstance"
                            on-amps-by-vmp-group-loaded="_openAmpsByVmpGroupView"
                            on-open-compound-management-view="_openCompoundManagement"
                            on-tab-changed="_showBtnFromTab"
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
                            open-parameters="[[openParameters]]"
                            sam-version="[[samVersion]]"
                         ></ht-pat-prescription-detail-posology>
                    </div>
                </template> 
                <template is="dom-if" if="[[isCheaperDrugView]]">
                     <div class="content-cheaper-drug">
                        <ht-pat-prescription-detail-search-cheaper-drugs
                            id="htPatPrescriptionDetailSearchCheaperDrug"
                            api="[[api]]"
                            i18n="[[i18n]]" 
                            user="[[user]]" 
                            patient="[[patient]]" 
                            language="[[language]]" 
                            resources="[[resources]]"
                            hcp="[[hcp]]" 
                            cheaper-drugs-list="[[cheaperDrugsList]]"
                            sam-version="[[samVersion]]"
                            selected-parent-drug-for-cheaper="[[selectedParentDrugForCheaper]]"
                            on-open-posology-view="_openPosologyView"
                            on-search-cheaper-drugs="_searchCheaperDrugs"
                            on-close-cheaper-drugs-view="_closeCheaperDrugsView"
                        ></ht-pat-prescription-detail-search-cheaper-drugs>
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
                            sam-version="[[samVersion]]"      
                            selected-cnk-for-information="[[selectedCnkForInformation]]"
                            on-close-cnk-info-view="_closeCnkInfoView"
                        ></ht-pat-prescription-detail-cnk-info>
                     </div>
                </template>
                <template is="dom-if" if="[[isAmpsByVmpGroupView]]">
                    <div class="content-amps-by-vmp-group">
                        <ht-pat-prescription-detail-search-amps-by-vmp-group
                            id="htPatPrescriptionDetailSearchAmpsByVmpGroup"
                            api="[[api]]"
                            i18n="[[i18n]]" 
                            user="[[user]]" 
                            patient="[[patient]]" 
                            language="[[language]]" 
                            resources="[[resources]]"
                            hcp="[[hcp]]"               
                            sam-version="[[samVersion]]" 
                            amps-by-vmp-group-list="[[ampsByVmpGroupList]]"      
                            selected-molecule-for-amps="[[selectedMoleculeForAmps]]" 
                            on-open-posology-view="_openPosologyView"
                            on-close-commercial-by-substance-view="_closeAmpsByVmpGroupView"
                        ></ht-pat-prescription-detail-search-amps-by-vmp-group>                    
                    </div>                
                </template>  
                <template is="dom-if" if="[[isCompoundManagementView]]">
                    <div class="content-compound-management">
                        <ht-pat-prescription-compound-management
                            id="htPatPrescriptionCompoundManagement"
                            api="[[api]]"
                            i18n="[[i18n]]" 
                            user="[[user]]" 
                            patient="[[patient]]" 
                            language="[[language]]" 
                            resources="[[resources]]"
                            hcp="[[hcp]]"               
                            sam-version="[[samVersion]]" 
                            on-close-compound-management-view="_closeCompoundManagementView"
                            on-hidde-compound-management-btn="_hiddeCompoundManagementBtn"
                            on-refresh-compound-list="_refreshCompoundList"
                        ></ht-pat-prescription-compound-management>                    
                    </div>                
                </template>                           
            </div>
            <div class="buttons">
                <template is="dom-if" if="[[isLoading]]" restamp="true"><div class="mw20"><ht-spinner active="[[isLoading]]"></ht-spinner></div></template>
                <template is="dom-if" if="[[!isLoading]]" restamp="true">
                    <template is="dom-if" if="[[isYellowCardIsAvailable]]">
                        <paper-button class="button button--other" on-tap="_notifyYellowCard"><iron-icon icon="vaadin:bell-o"></iron-icon> [[localize('btn-not-yell-card','Notify yellow card',language)]]</paper-button>
                    </template>      
                    <template is="dom-if" if="[[isPosologyView]]">
                        <paper-button class="button button--other" on-tap="_closePosologyView"><iron-icon icon="icons:close"></iron-icon> [[localize('pos-clo-pos','Close posology',language)]]</paper-button>
<!--                        <paper-button class="button button&#45;&#45;other" on-tap="_createMedication"><iron-icon icon="icons:add-circle-outline"></iron-icon> [[localize('pos-crea-med','Create medication',language)]]</paper-button>-->
                    </template>
                    <template is="dom-if" if="[[isCompoundSearchView]]">
                        <paper-button class="button button--other" on-tap="_openCompoundManagement"><iron-icon icon="vaadin:flask"></iron-icon> [[localize('btn-comp-mng','Create compound',language)]]</paper-button>
                    </template>
                    <paper-button class="button button--other" on-tap="_save"><iron-icon icon="icons:check"></iron-icon> [[localize('save','Save',language)]]</paper-button>
                    <paper-button class="button button--other" on-tap="_closeDialog"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
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
            isCompoundSearchView:{
              type: Boolean,
              value: false
            },
            isAmpsByVmpGroupView:{
                type: Boolean,
                value: false
            },
            isCompoundManagementView:{
                type: Boolean,
                value: false
            },
            isYellowCardIsAvailable:{
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
            },
            selectedCnkForInformation:{
                type: Object,
                value: () => {}
            },
            openParameters:{
                type: Object,
                value: () => {}
            },
            samVersion:{
                type: Object,
                value: () => {}
            },
            ampsByVmpGroupList:{
                type: Array,
                value: () => []
            },
            selectedMoleculeForAmps:{
                type: Object,
                value: () => {}
            },
            isLoading:{
                type: Boolean,
                value: false
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
        this.set('selectedDrugForPosology', { id: null, type: null })
        this.set('listOfCompound', [])
        this.set('listOfPrescription', [])
        this.set('listOfChronic', [])
        this.set('drugsToBePrescribe', [])
        this.set('reimbursmentTypeList', [])
        this.set('cheaperDrugsList', [])
        this.set('selectedParentDrugForCheaper', {})
        this.set('selectedCnkForInformation', {})
        this.set('openParameters', {})
        this.set('samVersion', null)
        this.set('isAmpsByVmpGroupView', false)
        this.set('ampsByVmpGroupList', [])
        this.set('selectedMoleculeForAmps', {})
        this.set('isCompoundManagementView', false)
        this.set('isCompoundSearchView', false)
        this.set('isYellowCardIsAvailable', false)
    }

    _open( openParameters ) {
        // c'est long
        this.shadowRoot.querySelector('#prescriptionDetailDialog') ? this.shadowRoot.querySelector('#prescriptionDetailDialog').open() : null
        return (this._reset()||true) && (this.set('openParameters', openParameters||{})||true) && this.api.hcparty().getHealthcareParty(_.get(this, 'user.healthcarePartyId', null))
            .then(hcp => (this.set('hcp', hcp)||true) && this.api.code().findCodes('be', "CD-REIMBURSEMENT-RECIPE"))
            .then(reimbursementCode => this.set('reimbursementTypeList', reimbursementCode))
            .then(() => this.api.besamv2().getSamVersion())
            .then(v => this.set('samVersion', v))
            .then(() => this._refreshCompoundList())
            .finally(() => {
                this.set('listOfPrescription', this._refreshHistoryList())
                this.set('listOfChronic', this._refreshChronicList())
            })
    }

    _refreshCompoundList(){
        this.api.entitytemplate().findEntityTemplates(this.user.id, 'org.taktik.icure.entities.embed.Medication', null, true)
            .then(compoundTemplateList => {
                const compoundFromUserList = _.get(this, 'user.properties', []).find(prop => _.get(prop, 'type.identifier', null) === "org.taktik.icure.user.compounds") ? JSON.parse(_.get(_.get(this, 'user.properties', []).find(prop => _.get(prop, 'type.identifier', null) === "org.taktik.icure.user.compounds"), 'typedValue.stringValue', null)) : []
                this.set('listOfCompound', _.map(_.concat(this._prepareCompoundFromUserForDisplay(compoundFromUserList), this._prepareCompoundFromTemplateForDisplay(compoundTemplateList))), it => _.trim(_.get(it,"internalUuid")) ? it : _.assign(it, {internalUuid: this.api.crypto().randomUuid()}))
                return true;
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

        return _
            .chain(serviceList)
            .map(service => {
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
            .map(it => _.trim(_.get(it,"internalUuid")) ? it : _.assign(it, {internalUuid: this.api.crypto().randomUuid()}))
            .value()

    }

    _prepareCompoundFromUserForDisplay(compoundFromUser){
        return compoundFromUser.map(comp => {
            return {
                origin: 'user',
                label: _.get(comp, 'title', null),
                description: null,
                formula: _.get(comp, 'formula', null),
                author: _.get(this, 'user.id', null),
                id: _.get(comp, 'id', null),
                drugType: 'compound',
                atcClass: null,
                entityTemplate: {
                    id: null,
                    userId: _.get(this, 'user.id', null),
                    descr: _.get(comp, 'title', null),
                    entityType: "org.taktik.icure.entities.embed.Medication",
                    subType: "topaz-magistral",
                    entity: [
                        {
                            "compoundPrescription": _.get(comp, 'formula', null)
                        }
                    ],
                    java_type: "org.taktik.icure.entities.EntityTemplate"
                },
                normalizedSearchTerms: _.map(_.uniq(_.compact(_.flatten(_.concat([_.trim(_.get(comp, 'descr', "")), _.trim(_.get(_.get(comp, 'entity', []).find(ent => _.get(ent, 'compoundPrescription', null)), 'compoundPrescription', ""))])))), i =>  _.trim(i).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")).join(" ")
            }
        })
    }

    _prepareCompoundFromTemplateForDisplay(compoundTemplate){
        return compoundTemplate.map(comp => {
            return {
                origin: 'formTemplate',
                label: _.get(comp, 'descr', null),
                description: null,
                formula: _.get(_.get(comp, 'entity', []).find(ent => _.get(ent, 'compoundPrescription', null)), 'compoundPrescription', null),
                author: _.get(comp, 'userId', null),
                id: _.get(comp, 'id', null),
                entityTemplate: comp,
                drugType: 'compound',
                atcClass: _.get(_.get(comp, 'entity', []).find(ent => _.get(ent, 'atcClass', null)), 'atcClass', null),
                normalizedSearchTerms: _.map(_.uniq(_.compact(_.flatten(_.concat([_.trim(_.get(comp, 'descr', "")), _.trim(_.get(_.get(comp, 'entity', []).find(ent => _.get(ent, 'compoundPrescription', null)), 'compoundPrescription', ""))])))), i =>  _.trim(i).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")).join(" ")
            }
        })
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
            drugType: drugType,
        }
    }

    _closeDialog(){
        return this.shadowRoot.querySelector('#prescriptionDetailDialog') ? this.shadowRoot.querySelector('#prescriptionDetailDialog').close() : null
    }

    _serviceDescription(s) {

        const medicationValue = this.api.contact().medicationValue(s, this.language)

        return !medicationValue ? "" : _.get(medicationValue,"compoundPrescription") ? _.get(medicationValue,"compoundPrescription") : this.api.contact().medication().medicationNameToString(_.get((this.api.contact().preferredContent(s, this.language) || {}), "medicationValue"), this.language);

    }

    _enrichChronicHistoryWithDetails(givenProduct) {

        const promResolve = Promise.resolve()

        /* Still Missing
            - amp (final)
            - ctiExtended
            - dividable
            - groupId
            - hasChildren
            - informations
            - packDisplayValue
            - parentUuid
            - posologyNote
            - reinfPharmaVigiIcon
            - samCode
            - samDate
            - uuid
            - uuids
         */

        return promResolve
            .then(() => this.api.besamv2().findAmpsByDmppCode(_.trim(_.get(givenProduct,"id"))).catch(()=>null))
            .then(amps => {

                // const amp = _
                //     .chain(amps)
                //     .filter()
                //     .value()

                const atcCodes = _
                    .chain(amps)
                    .map( amp => _.map(_.get(amp, "ampps"), ampp => _.map(_.get(ampp,"atcs"), "code")))
                    .flattenDeep()
                    .compact()
                    .uniq()
                    .map(_.trim)
                    .value()

                _.merge(givenProduct, {
                    allergies: _.filter(_.get(this,"allergies"), patAllergy => _.size(_.get(patAllergy,"codes",[])) && _.some(_.get(patAllergy,"codes",[]), code => _.trim(_.get(code,"type")) === "CD-ATC" && _.trim(_.get(code,"code")).indexOf(atcCodes) > -1 )),
                    atcCodes: [_.get(givenProduct, "atc","")],
                    officialName: [_.get(givenProduct, "label","")],
                    type: "medicine",
                })
            })
            .catch(e => console.log("[ERROR]", e))
            .finally(() => givenProduct)

    }

    _openPosologyView(e) {

        const promResolve = Promise.resolve()
        const givenProduct = _.get(e, 'detail.product', null)
        const drugInternalUuid = _.trim(_.get(e,'detail.internalUuid', null))

        return !_.trim(_.get(e, 'detail.id', null)) || !drugInternalUuid || !_.trim(_.get(e, 'detail.type', null)) ? promResolve : (
            ["chronic","history"].indexOf(_.trim(_.get(e, 'detail.type'))) > -1 ? this._enrichChronicHistoryWithDetails(givenProduct) :
            ["commercial","substance", "compound"].indexOf(_.trim(_.get(e, 'detail.type'))) > -1 ? Promise.resolve(givenProduct) :
            Promise.resolve({})
        )
            .then(drugInfo => {

                const isPrescription = _.get(this,"openParameters.isPrescription",false)
                const drugType = _.trim(_.get(drugInfo,"type")) === "medicine" ? "CD-DRUG-CNK" : _.trim(_.get(drugInfo,"type")) === "substance" ? "CD-VMPGROUP" : "compoundPrescription"
                const newMedication =  _.size(_.get(drugInfo,"service", null)) ? _.get(drugInfo,"service") : _.get(this,"openParameters.service") ? _.get(this,"openParameters.service") : {}
                const medicationValue = newMedication && this.api.contact().medicationValue(newMedication, this.language)
                const hasMedicationTag = _.find(_.get(drugInfo,"service.tags",[]), t => _.trim(_.get(t,"type"))==="CD-ITEM" && _.trim(_.get(t,"code")) === "medication")
                const prescribedProduct = {
                    priority: "low",
                    label: _.trim(_.get(drugInfo,"intendedName")) ? _.trim(_.get(drugInfo,"intendedName")) : _.trim(_.get(drugInfo,"label")),
                    intendedname: _.trim(_.get(drugInfo,"intendedName")) ? _.trim(_.get(drugInfo,"intendedName")) : _.trim(_.get(drugInfo,"label")),
                    intendedcds: [{type: drugType, code: _.trim(_.get(drugInfo,"id")) ? _.trim(_.get(drugInfo,"id")) : _.trim(_.get(drugInfo,"uuid"))}],
                }
                _.merge(drugInfo, {
                    unit: !medicationValue ? "" : _.get(medicationValue, "regimen[0].administratedQuantity.unit", this.localize("uni", "Unités")),
                    isPrescription: isPrescription,
                    content: _.get(this,"openParameters.content",null),
                    intendedName: prescribedProduct.label,
                    allergyType: _.some(_.get(this,"allergies",[]), it => _.trim(_.get(it,"type")) === "allergy") ? "allergy" : _.some(_.get(this,"allergies",[]), it => _.trim(_.get(it,"adr"))) ? "adr" : "",
                    boxes: 1, // 1! box = 1! svc
                    drugType: drugType
                })

                if(!medicationValue) {

                    _.assign(newMedication, {
                        content: _.fromPairs([[this.language, {
                            medicationValue: {
                                regimen: [],
                                substitutionAllowed: true,
                                compoundPrescription: drugType === "compoundPrescription" && (_.trim(_.get(drugInfo,"intendedName")) ? _.trim(_.get(drugInfo,"intendedName")) : _.trim(_.get(drugInfo,"label"))),
                                substanceProduct: drugType !== "compoundPrescription" && drugType === "CD-VMPGROUP" && prescribedProduct,
                                medicinalProduct: drugType !== "compoundPrescription" && drugType !== "CD-VMPGROUP" && prescribedProduct,
                            }
                        }]]),
                        codes: drugType === "compoundPrescription" ? _.get(newMedication, "codes",[]) : _
                            .chain(newMedication)
                            .get("codes",[])
                            .filter(c => [drugType, "CD-ATC"].indexOf(_.trim(_.get(c,"type"))) === -1)
                            .concat(!_.trim(_.get(drugInfo,"id")) ? false : {type: drugType, version: "1", code: _.trim(_.get(drugInfo,"id"))})
                            .concat(!_.trim(_.get(drugInfo,"atcCodes[0]")) ? false : {type: "CD-ATC", version: "1", code: _.trim(_.get(drugInfo,"atcCodes[0]"))})
                            .compact()
                            .value()
                    })

                }

                _.assign(medicationValue, {knownUsage: _.size(_.get(medicationValue,"regimen")) && !_.trim(_.get(medicationValue,"instructionForPatient"))})

                const newMedicationClone = _.assign(_.cloneDeep(newMedication), {
                    beginMoment: null,
                    endMoment: null,
                    tags: _.filter(_.get(newMedication,"tags",[]), {type:"org.taktik.icure.entities.embed.Confidentiality"})
                })
                const newMedCloneVal = this.api.contact().medicationValue(newMedicationClone, this.language) || {medicationValue: {}}

                _.assign(newMedCloneVal, {
                    beginMoment: !medicationValue ? newMedCloneVal.beginMoment : !hasMedicationTag ? parseInt(moment().format("YYYYMMDD"), 10) : newMedCloneVal.beginMoment,
                    endMoment: !medicationValue ? newMedCloneVal.endMoment : !hasMedicationTag ? null : newMedCloneVal.endMoment,
                    status: 0
                })

                _.assign(drugInfo, !this._serviceDescription(newMedicationClone) ? {} : {
                    newMedication: newMedicationClone,
                    options: {isPrescription: isPrescription, isNew: !medicationValue, createMedication: false},
                })

                // Only push when not in yet
                if(!_.size(_.find(this.drugsToBePrescribe, {internalUuid:drugInternalUuid}))) this.push('drugsToBePrescribe', {
                    id: _.trim(_.get(e ,'detail.id', null)),
                    internalUuid: drugInternalUuid,
                    type: _.get(e, 'detail.type', null),
                    drug: drugInfo
                })

                !_.get(e, 'detail.bypassPosologyView', null) && this.set('selectedDrugForPosology', _.find(this.drugsToBePrescribe, {internalUuid:drugInternalUuid}))

            })
            .finally(() => {

                if(!_.get(e, 'detail.bypassPosologyView', null)) {
                    this.set('isPosologyView', true)
                    this.set('isSearchView', false)
                    this.set('isCnkInfoView', false)
                    this.set('isCheaperDrugView', false)
                    this.set('isAmpsByVmpGroupView', false)
                    this.set('isCompoundManagementView', false)
                }

                this.shadowRoot.querySelector("#htPatPrescriptionDetailDrugs") ? this.shadowRoot.querySelector("#htPatPrescriptionDetailDrugs")._refreshDrugList() : null

            })

    }

    _goBackToSearch() {

        let prom = Promise.resolve()

        return prom
            .then(() => {
                this.set('isSearchView', true)
                this.set('isCnkInfoView', false)
                this.set('isPosologyView', false)
                this.set('isCheaperDrugView', false)
                this.set('isAmpsByVmpGroupView', false)
                this.set('isCompoundManagementView', false)
                this.set('selectedDrugForPosology', null)
            })
            .then(() => this.api.sleep(200))

    }

    _selectedDrug(e){

        const drugInternalUuid = _.trim(_.get(e,"detail.product.internalUuid"))

        return !drugInternalUuid ? this._goBackToSearch() :
            (this.set('selectedDrugForPosology', _.find(this.drugsToBePrescribe, {internalUuid:drugInternalUuid}))||true) &&
            (this.set('isPosologyView', !_.get(e, 'detail.bypassPosologyView', false))||true) &&
            (this.set('isSearchView', _.get(e, 'detail.bypassPosologyView', true))||true) &&
            (this.set('isCheaperDrugView', false)||true) &&
            this.shadowRoot.querySelector("#htPatPrescriptionDetailDrugs") &&
            this.shadowRoot.querySelector("#htPatPrescriptionDetailDrugs")._refreshDrugList()

    }

    _deleteDrug(e){

        const drugInternalUuid = _.trim(_.get(e,"detail.product.internalUuid"))

        return !drugInternalUuid ? null :
            drugInternalUuid === _.trim(_.get(this,"selectedDrugForPosology.internalUuid", null)) &&
                (this.set('selectedDrugForPosology',null)||true) &&
                (this.set('isPosologyView',  false)||true) &&
                (this.set('isSearchView', true)||true) &&
                (this.set('isCheaperDrugView', false)||true) ||
            this.set("drugsToBePrescribe", _.filter(_.get(this,"drugsToBePrescribe",[]), it => _.trim(_.get(it,"internalUuid",null)) !== drugInternalUuid))
    }

    _closePosologyView() {
        return this._goBackToSearch()
    }

    _closeCheaperDrugsView(){
        return this._goBackToSearch()
    }

    _closeCnkInfoView(){
        this.set('isSearchView', false)
        this.set('isCheaperDrugView', false)
        this.set('isCnkInfoView', false)
        this.set('isAmpsByVmpGroupView', false)
        this.set('isCompoundManagementView', false)
        this.set('isPosologyView', true)
    }

    _closeAmpsByVmpGroupView(){
        return this._goBackToSearch()
    }

    _closeCompoundManagementView(){
        return this._goBackToSearch()
    }

    _searchCheaperDrugs(e){
        if(_.get(e ,'detail.groupId', null)){
            this.shadowRoot.querySelector("#htPatPrescriptionDetailSearch") ? this.shadowRoot.querySelector("#htPatPrescriptionDetailSearch")._searchCheaperAlternative(_.get(e ,'detail.groupId', null), _.get(e ,'detail.uuid', null), _.get(e ,'detail.uuids', null), _.get(e, 'detail.drug', null)) : null
        }
    }

    _searchCommercialBySubstance(e){
        if(_.get(e, 'detail.id', null)){
            this.shadowRoot.querySelector("#htPatPrescriptionDetailSearch") ? this.shadowRoot.querySelector("#htPatPrescriptionDetailSearch")._searchAmpsByVmpGroup(_.get(e, 'detail.molecule.vmpGroup.id', null), _.get(e, 'detail.molecule')) : null
        }
    }

    _openCheaperDrugsView(e){

        this.set('cheaperDrugsList', [])
        this.set('selectedParentDrugForCheaper',{})

        if(_.get(e, 'detail.cheaperDrugsList', [])){

            // Set internalUuid when not there yet
            _.get(e,"detail.parentDrug") && !_.trim(_.get(e,"detail.parentDrug.internalUuid")) && _.merge(e.detail.parentDrug, {internalUuid: this.api.crypto().randomUuid()})
            _.map(e.detail.cheaperDrugsList, it => !_.size(it) ? false : !Array.isArray(_.head(it)) ? _.map(it, drug => !_.trim(_.get(drug,"internalUuid")) && _.assign(drug,{internalUuid: this.api.crypto().randomUuid()})) : _.map(it, drugGroup => _.map(drugGroup, drug => !_.trim(_.get(drug,"internalUuid")) && _.assign(drug,{internalUuid: this.api.crypto().randomUuid()}))))

            this.set('cheaperDrugsList', _.get(e, 'detail.cheaperDrugsList', []))
            this.set('selectedParentDrugForCheaper', _.get(e, 'detail.parentDrug', {}))
            this.set('isPosologyView', false)
            this.set('isSearchView', false)
            this.set('isCheaperDrugView', true)
            this.set('isCnkInfoView', false)
            this.set('isAmpsByVmpGroupView', false)
            this.set('isCompoundManagementView', false)

        }

    }

    _openAdditionalCnkInfo(e) {
        if(_.get(e,"detail.product")) {
            this.set('selectedCnkForInformation', _.get(e,"detail.product"))
            this.set('isPosologyView', false)
            this.set('isSearchView', false)
            this.set('isCheaperDrugView', false)
            this.set('isCnkInfoView', true)
            this.set('isAmpsByVmpGroupView', false)
            this.set('isCompoundManagementView', false)
        }
    }

    _openAmpsByVmpGroupView(e){
        this.set('ampsByVmpGroupList', [])
        this.set('selectedMoleculeForAmps',{})

        if(_.get(e, 'detail.ampsByVmpGroupList', [])){

            // Set internalUuid when not there yet
            _.get(e,"detail.parentMolecule") && !_.trim(_.get(e,"detail.parentMolecule.internalUuid")) && _.merge(e.detail.parentMolecule, {internalUuid: this.api.crypto().randomUuid()})
            _.map(e.detail.ampsByVmpGroupList, it => !_.size(it) ? false : !Array.isArray(_.head(it)) ? _.map(it, drug => !_.trim(_.get(drug,"internalUuid")) && _.assign(drug,{internalUuid: this.api.crypto().randomUuid()})) : _.map(it, drugGroup => _.map(drugGroup, drug => !_.trim(_.get(drug,"internalUuid")) && _.assign(drug,{internalUuid: this.api.crypto().randomUuid()}))))


            this.set('ampsByVmpGroupList', _.get(e, 'detail.ampsByVmpGroupList', []))
            this.set('selectedMoleculeForAmps', _.get(e, 'detail.parentMolecule', {}))
            this.set('isPosologyView', false)
            this.set('isSearchView', false)
            this.set('isCheaperDrugView', false)
            this.set('isCnkInfoView', false)
            this.set('isAmpsByVmpGroupView', true)
            this.set('isCompoundManagementView', false)

        }

    }

    _openCompoundManagement(e){
        this.set('isPosologyView', false)
        this.set('isSearchView', false)
        this.set('isCheaperDrugView', false)
        this.set('isCnkInfoView', false)
        this.set('isAmpsByVmpGroupView', false)
        this.set('isCompoundManagementView', true)
        this.set('isCompoundSearchView', false)
        this.root.querySelector("#htPatPrescriptionCompoundManagement") ? this.root.querySelector("#htPatPrescriptionCompoundManagement")._initializeData(_.get(e, 'detail.id', null), _.get(e, 'detail.product', {})) : null
    }

    _formatDate(date){
        return date ? this.api.moment(date).format('DD/MM/YYYY') : ''
    }

    _getStatusOfSam(samVersion){
        const now = moment().valueOf()
        return _.get(samVersion, 'date', null) ?
            _.parseInt(this.api.moment(now).format('YYYYMMDD')) === _.get(samVersion, 'date', null) ?
                'greenVersion' :
            this.api.moment(_.get(samVersion, 'date', null)).add(5, 'day').valueOf() > now ?
                'orangeVersion' :
            this.api.moment(_.get(samVersion, 'date', null)).add(14, 'day').valueOf() > now ?
                'redVersion' :
            'redVersion' :
        'redVersion'
    }

    _isOutdatedVersion(samStatus){
        return samStatus && samStatus === "redVersion"
    }

    _notifyYellowCard(){
        window.open("https://famhp-vons.prd.pub.vascloud.be/"+this.language+"/form/PVH")
    }

    _showBtnFromTab(e){
        if(_.get(e, 'detail.tabNumber', null)){
            _.get(e, 'detail.tabNumber', 0) === 4 ? this.set('isCompoundSearchView', true) : this.set('isCompoundSearchView', false)
            _.get(e, 'detail.tabNumber', 0) === 4 ? this.set('isYellowCardIsAvailable', false) : this.set('isYellowCardIsAvailable', true)
        }
    }

    _hiddeCompoundManagementBtn(e){
        if(_.get(e, 'detail.lock', null)){
            _.get(e, 'detail.lock', false) ? this.set('isCompoundSearchView', false) : this.set('isCompoundSearchView', true)
        }
    }

    _boxQuantityUpdated(e) {

        const updatedQuantityDrugInternalUuid = _.trim(_.get(e,"detail.internalUuid"))
        const selectedDrugForPosologyInternalUuid = _.trim(_.get(this,"selectedDrugForPosology.drug.internalUuid"))
        const htPatPrescriptionDetailPosology = this.shadowRoot.querySelector('#htPatPrescriptionDetailPosology')

        return updatedQuantityDrugInternalUuid !== selectedDrugForPosologyInternalUuid ? null : (_.merge(this.selectedDrugForPosology, {drug:{boxes:(parseInt(_.get(e,"detail.newQuantity"))||1)}})||true)
            && typeof _.get(htPatPrescriptionDetailPosology, "_updateStats") === "function"
            && this.shadowRoot.querySelector('#htPatPrescriptionDetailPosology')._updateStats()

    }

    _save() {

        const promResolve = Promise.resolve()

        return promResolve
            .then(() => this.set("isLoading", true))
            .then(() => this._closePosologyView())

            // Create medication ?
            .then(() => _.map(this.drugsToBePrescribe, it =>  !_.get(it,"drug.options.createMedication",false) || _.size(_.find(_.get(it, "drug.newMedication.tags",[]), t => t && t.type==="CD-ITEM" && t.code==="medication")) ? _.get(it,"drug") : _.merge(_.get(it,"drug"), {newMedication:{tags:_.concat(_.get(it,"drug.newMedication.tags",[]), [{type:"CD-ITEM",code:"medication"}])}})))

            // Assign deliveryMoment && endExecMoment
            .then(drugsToBeSaved => {
                _.map(drugsToBeSaved, drug => {

                    const deliveryMoment = parseInt(moment(_.trim(_.get(drug,"deliveryMomentAsString")), "YYYY-MM-DD").format("YYYYMMDD")) || null
                    const endExecMoment = parseInt(moment(_.trim(_.get(drug,"endExecMomentAsString")), "YYYY-MM-DD").format("YYYYMMDD")) || null
                    const medicationValue = _.get(drug,"newMedication.content.fr.medicationValue") || _.get(drug,"newMedication.content.nl.medicationValue") || _.get(drug,"newMedication.content.en.medicationValue")

                    _.assign(medicationValue, {
                        deliveryMoment: deliveryMoment||null,
                        endExecMoment: endExecMoment||null,
                    })

                })
                return drugsToBeSaved
            })

            .then(drugsToBeSaved => typeof _.get(this,"openParameters.onSave") === "function" && _.get(this,"openParameters.onSave")(drugsToBeSaved))
            .then(() => console.log("flush posology cache / call reset:any method"))
            .finally(() => (this.set("isLoading", false)||true) && this._closeDialog())

    }

}
customElements.define(HtPatPrescriptionDetail.is, HtPatPrescriptionDetail);

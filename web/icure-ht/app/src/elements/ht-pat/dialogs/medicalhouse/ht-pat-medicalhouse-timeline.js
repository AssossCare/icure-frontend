import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/buttons-style.js';
import * as models from 'icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';
import _ from 'lodash/lodash';


class HtPatMedicalhouseTimeline extends Polymer.TkLocalizerMixin(Polymer.mixinBehaviors([Polymer.IronResizableBehavior], Polymer.Element)) {
  static get template() {
    return Polymer.html`
        <style include="iron-flex iron-flex-alignment"></style>
        <!--suppress CssUnusedSymbol -->
        <style include="icpc-styles scrollbar-style dialog-style buttons-style">

            #dialog .hub-cons{
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: flex-start;
                width: 100%;
                box-sizing: border-box;
            }

            #dialog paper-button.action {
                --paper-button-ink-color: var(--app-secondary-color-dark);
                font-weight: 400;
                font-size: 12px;
                height: 32px;
                padding: 10px 1.2em;
                box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
                background: var(--app-secondary-color);
                color: var(--app-primary-color-dark);
                justify-self: flex-end;
            }
            #dialog .hub-cons paper-button.action[disabled] {
                background-color: var(--app-secondary-color-dark);
                color: var(--app-text-color-disabled);
                box-shadow: none;
            }

            #dialog .hub-cons .buttons {
                right: 24px;
                position: absolute;
            }

            #dialog .hub-cons vaadin-date-picker {
                margin-right: 8px;
            }

            #dialog a {
                text-decoration: none;
                color:	var(--app-secondary-color);
            }

            /*#dialog{*/
                /*min-height: 800px;*/
                /*min-width: 1024px;*/
            /*}*/

            .links {
                position: absolute;
                right: 0;
            }

            .pills {
                float: right;
            }

            dynamic-link {
                float: right;
                top:4px;
            }

            vaadin-combo-box {
                width: 100%;
            }

            vaadin-text-area {
                width: 100%;
            }

            .containerHubCons {
                height: 58px;
                display: flex;
            }

            #par-search {
                flex: 1;
            }

            #dialog .hub-info{
                margin-top:0;
                display:flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: flex-start;
            }

            #dialog .hub-info div{
                margin-right: 24px;
            }

            #dialog .hub-info div p{
                margin: 8px 0;
            }

            #dialog .hub-info div b{
                margin-right: 8px;
            }

            .modal-title{
                background:  var(--app-background-color-dark);
                margin-top: 0;
                padding: 16px 24px;
            }

            paper-tabs {
                --paper-tabs-selection-bar-color: var(--app-secondary-color);
            }

            paper-tab {
                --paper-tab-ink: var(--app-secondary-color);
            }

            paper-tab.iron-selected {
                font-weight: bold;
            }

            paper-tab.iron-selected > iron-icon {
                color: var(--app-secondary-color);
            }

            .tab-selector {
                border-bottom: 1px solid var(--app-background-color-dark);
            }

            .end-buttons {
                position: absolute;
                right: 15px;
                bottom: 15px;
                margin: 0;
                padding: 0;
            }

            ht-spinner {
                position: relative;
                top: 10px;
                height: 42px;
                width: 42px;
            }

            #kmehr_slot{
                overflow-y: scroll;
                height: 90%;
            }
        </style>

        <div id="dialog" opened="{{opened}}">
            <h2 class="modal-title">[[localize('mh_timeline','Medical House Timeline',language)]]<ht-spinner active="[[isLoading]]"></ht-spinner></h2>
            <p>[[patient.lastName]]</p>
            <p>[[patient.medicalHouseContracts.length]]</p>
            <template is="dom-repeat" items="[[patient.medicalHouseContracts]]" as="contract">
                <p>Nihii = [[contract.mmNihii]]</p>
            </template>
            <paper-button on-tap="_getGeninsHistory">Test</paper-button>
            <paper-input label="[[localize('inv_month','Invoiced month',language)]]" value="{{invoicedMonth}}"></paper-input>
            <paper-button on-tap="_runForfaitCheck">Check</paper-button>

<!--            <paper-button on-tap="_generateInvoiceTest">Generate Invoice Test</paper-button>-->
            </div>
`;
  }

  static get is() {
      return 'ht-pat-medicalhouse-timeline';
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
          patient: {
              type: Object,
              notify: true
          },
          language: {
              type: String
          },
          opened: {
              type: Boolean,
              value: false
          },
          tabs: {
              type:  Number,
              value: 0
          },
          isLoading:{
              type: Boolean,
              value: false
          },
          insList:{
              type: Object,
              value: null
          },
          invoicedMonth:{
              type: Number,
              value: 201901
          }
      };
  }

  static get observers() {
      return ['apiReady(api,user,opened)'];
  }

  ready() {
      super.ready();
      this.addEventListener('iron-resize', () => this.onWidthChange());
      document.addEventListener('xmlHubUpdated', () => this.xmlHubListener() );
  }

  _dateFormat(date) {
      return date ? this.api.moment(date).format('DD/MM/YYYY') : '';
  }

  _timeFormat(date) {
      return date ? this.api.moment(date).format(date > 99991231 ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY') : '';
  }

  _ageFormat(date) {
      return date ? this.api.getCurrentAgeFromBirthDate(date,( e , s ) => this.localize(e, s, this.language)) : '';
  }

  _dateFormat2(date, fFrom, fTo){
      return date ? this.api.moment(date, fFrom).format(fTo) : '';
  }

  _shortDateFormat(date, altDate) {
      return (date || altDate) && "'"+this.api.moment((date || altDate)).format('YY') || '';
  }

  _isElevated(CT){
      return CT && CT.substring(2) !== '0' ? this._yesOrNo(true) : this._yesOrNo(false);
  }

  _trueOrUnknown(b){
      return b ? this.localize('yes','yes',this.language) : '?'
  }

  _yesOrNo(b){
      return b ? this.localize('yes','yes',this.language) : this.localize('no','no',this.language)
  }

  _formatHospitalizedInfo(hi){
      let info = '';
      info += hi && hi.hospital ? this.localize('hosp', 'Hospital', this.language)+ ':' + hi.hospital + ' ' : ''
      info += hi && hi.admissionDate ? this.localize('adm_dat', 'AdmissionDate', this.language) + ':' + this._dateFormat2(hi.admissionDate, 'YYYYMMDD', 'DD/MM/YYYY') + ' ' : ''
      info += hi && hi.admissionService ? this.localize('adm_svc', 'AdmissionService', this.language)+ ':' + hi.admissionService + ' ' : ''
      return info;
  }

  _hasErrors(errs){
      return errs && errs.length > 0;
      //return true;
  }

  _formatError(error){
      return "[" + (this.language === 'nl' ? error.locNl : error.locFr) +  '] ' + (error.value?error.value + ' : ':"") + (this.language === 'nl' ? error.msgNl : error.msgFr);
  }

  _hasTransfers(genins){
      return genins && genins.transfers && genins.transfers.length > 0;
      //return true;
  }

  onWidthChange() {
      const offsetWidth = this.$.dialog.offsetWidth;
      const offsetHeight = this.$.dialog.offsetHeight;
      if (!offsetWidth || !offsetHeight) {
          return;
      }
  }

  apiReady() {
      if (!this.api || !this.user || !this.user.id || !this.opened) return;

      try {
      } catch (e) {
          console.log(e);
      }
  }

  attached() {
      super.attached();
      this.async(this.notifyResize, 1);
  }

  _runForfaitCheck(){
      this.checkFlatrateData(this.patient, Number(this.invoicedMonth)).then(res => {
          console.log("res", res)
          return res;
      });
  }

  checkFlatrateData(pat, invoicedMonth){
      //TODO: if multiple MHcontracts exist, check for overlap/validity of all
      //TODO: if multiple insurabilities extist, check for overlap/validity of all
      //Check if hcp or hcpParrent is flatrateInvoicing
      return this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then( hcp =>
          hcp.parentId ? this.api.hcparty().getHealthcareParty(hcp.parentId) : hcp).then(hcp2 => {
          let res = {};
          res.hcp = hcp2;
          console.log("hcp flatrate ?", hcp2);
          if(hcp2.billingType && hcp2.billingType.toLowerCase() === "flatrate") {
              //PatientData:
              //  NISS
              res.nissCheck = this.checkNissValid(pat);
              //  Gender
              res.genderCheck = this.checkGender(pat);
              //  DeathDate
              res.aliveCheck = this.checkAlive(pat, invoicedMonth);
              //Insurability:
              res.insurabilityCheck = this.checkInsurability(pat, invoicedMonth);
              //  MUT
              res.mutCheck = this.checkMut(res.insurabilityCheck);
              //  CT12
              res.ct12Check = this.checkCT12(res.insurabilityCheck);
              //MH Contract:
              res.mhContractCheck = this.checkMHContract(pat, invoicedMonth);
              //  MM NIHII
              res.mhCheck = this.checkMH(res.mhContractCheck);
              //  No Suspension
              res.mhSuspensionCheck = this.checkSuspension(res.mhContractCheck, invoicedMonth);
              //  Disciplines
              res.mhDisciplineCheck = this.checkMHDiscipline(res.mhContractCheck);
              // oveview
              res.flatrateStatus = this.checkMHStatus(res);
              //console.log("res", res, JSON.stringify(res));
          } else {
              // non flatrate
              res.flatrateStatus = {status: "ok-no-flatrate-mh", errors: []}
          }
          return res;
      })
  }

  checkMHStatus(res){
      return res.mhContractCheck.valid ? (
          res.mutCheck.valid && res.ct12Check.valid && res.mhCheck.valid && res.mhSuspensionCheck.valid && res.mhDisciplineCheck.valid && res.nissCheck.valid && res.genderCheck.valid && res.aliveCheck.valid
          ? {status: "ok-flatrate-patient", errors: []} : {status: "nok-flatrate-patient", errors: this.mhStatusErrors(res)}
      ) : {status: "ok-no-flatrate-patient", errors: []};
  }

  mhStatusErrors(res){
      let err = [];
      if(!res.mutCheck.valid) err.push(res.mutCheck.error);
      if(!res.ct12Check.valid) err.push(res.ct12Check.error);
      if(!res.mhCheck.valid) err.push(res.mhCheck.error);
      if(!res.mhSuspensionCheck.valid) err.push(res.mhSuspensionCheck.error);
      if(!res.mhDisciplineCheck.valid) err.push(res.mhDisciplineCheck.error);
      if(!res.nissCheck.valid) err.push(res.nissCheck.error);
      if(!res.genderCheck.valid)  err.push(res.genderCheck.error);
      if(!res.aliveCheck.valid) err.push(res.aliveCheck.error);
      return err;
  }

  checkMHDiscipline(mhcCheck){
      return mhcCheck.valid ?
          ((mhcCheck.medicalHouseContract.kine || mhcCheck.medicalHouseContract.gp || mhcCheck.medicalHouseContract.nurse ) ?
                  {valid: true, discipline: (mhcCheck.medicalHouseContract.gp ? "1" : "0")+(mhcCheck.medicalHouseContract.kine ? "1" : "0")+(mhcCheck.medicalHouseContract.nurse ? "1" : "0"), error: ''}
                  : {valid: false, discipline: "000", error: 'no-discipline'}
          )
          : {valid: false, discipline:"", error: 'no-contract-for-period'}
  }

  checkSuspension(mhcCheck, invoicedMonth){
      const month = (invoicedMonth * 100) + 1;
      return mhcCheck.valid ?
          (mhcCheck.medicalHouseContract.startOfSuspension && mhcCheck.medicalHouseContract.startOfSuspension <= month
                  && (!mhcCheck.medicalHouseContract.endOfSuspension || (mhcCheck.medicalHouseContract.endOfSuspension >= month)) ?
                  {valid: false, suspension: mhcCheck.medicalHouseContract, error: 'suspended'}
                  : {valid: true, suspension:{}, error: ''}
          )
          : {valid: false, suspension:{}, error: 'no-contract-for-period'}
  }

  checkMH(mhcCheck){
      return mhcCheck.valid ?
          (mhcCheck.medicalHouseContract.hcpId && mhcCheck.medicalHouseContract.hcpId !== '' ?
                  {valid: true, hcpId: mhcCheck.medicalHouseContract.hcpId, error: ''}
                  : {valid: false, hcpId:'', error: 'mh-hcpId-absent-or-invalid'}
          )
          : {valid: false, hcpId:'', error: 'no-contract-for-period'}
  }

  checkMHContract(pat, invoicedMonth){
      //invoicedmonth => yyyyMM => 201909 => (201909 * 100) + 1 = 20190901
      const month = (invoicedMonth * 100) + 1;
      if(pat.medicalHouseContracts && pat.medicalHouseContracts.length > 0){
          const mhcList = pat.medicalHouseContracts.filter(mhc =>
              mhc.startOfCoverage && mhc.startOfCoverage <= month && (!mhc.endOfCoverage || (mhc.endOfCoverage >=month)));
          if(mhcList && mhcList.length > 0){
              return {valid: true, medicalHouseContract: mhcList[0], error: ''};
          }else{
              return {valid: false, medicalHouseContract: null, error: 'no-contract-for-period'};
          }
      }
      else {
          return {valid: false, medicalHouseContract: null, error: 'no-contracts'};
      }
  }

  checkMut(insCheck){
      return insCheck.valid ?
          (insCheck.insurability.insuranceId && insCheck.insurability.insuranceId !== '' ?
                  {valid: true, insuranceId: insCheck.insurability.insuranceId, error: ''}
                  : {valid: false, insuranceId:'', error: 'insuranceId-absent-or-invalid'}
          )
          : {valid: false, ct12:'', error: 'no-ins-for-period'}
  }

  checkCT12(insCheck){
      return insCheck.valid ?
          (insCheck.insurability.parameters && insCheck.insurability.parameters.tc1
              && insCheck.insurability.parameters.tc1.length === 3  && insCheck.insurability.parameters.tc2 && insCheck.insurability.parameters.tc2.length === 3 ?
                  {valid: true, ct12:insCheck.insurability.parameters.tc1 + insCheck.insurability.parameters.tc2, error: ''}
                  : {valid: false, ct12:'', error: 'tc1-tc2-absent-or-invalid'}
          )
          : {valid: false, ct12:'', error: 'no-ins-for-period'}
  }

  checkInsurability(pat, invoicedMonth){
      //invoicedmonth => yyyyMM => 201909 => (201909 * 100) + 1 = 20190901
      const month = (invoicedMonth * 100) + 1;
      if(pat.insurabilities && pat.insurabilities.length > 0){
          const insList = pat.insurabilities.filter(ins =>
              ins.startDate && ins.startDate <= month && (!ins.endDate || (ins.endDate >=month)));
          if(insList && insList.length > 0){
              return {valid: true, insurability: insList[0], error: ''};
          }else{
              return {valid: false, insurability: null, error: 'no-ins-for-period'};
          }
      }
      else {
          return {valid: false, insurability: null, error: 'no-insurabilities'};
      }
  }

  checkAlive(pat, invoicedMonth){
      const month = (invoicedMonth * 100) + 1;
      return pat.dateOfDeath && (pat.dateOfDeath <= month) ? {valid: false, dateOfDeath : pat.dateOfDeath, error: 'patient-deceased'} : {valid: true, dateOfDeath : 0, error: ''};
  }

  checkGender(pat){
      return pat.gender && (pat.gender === "male" || pat.gender === 'female') ? {valid:true, error: ''} : {valid: true, error: 'gender-invalid'}
  }

  checkNissValid(pat){
      return (pat.ssin && pat.ssin !== "") ? (pat.ssin.length === 11 ? {valid: true, error: ''} : {valid: false, error: 'niss-invalid'}) : {valid: false, error: 'niss-absent'};
  }

  _getGeninsHistory(){
      this.set("isLoading", true);
      let aMonths  = [];
      let i;
      for (i = 0; i < 24; i++) {
          aMonths.push(moment().startOf('month').subtract(i, 'month'));
      }
      this.set("insList", null);
      let insList = [];
      Promise.all(aMonths.map(m => this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp => this.api.fhc().Geninscontroller().getGeneralInsurabilityUsingGET(
          this.cleanNiss(this.patient.ssin),
          this.api.tokenId ? this.api.tokenId : this.api.tokenIdMH, this.api.tokenId ? this.api.keystoreId : this.api.keystoreIdMH, this.api.tokenId ? this.api.credentials.ehpassword : this.api.credentials.ehpasswordMH,
          this.api.tokenId ? hcp.nihii : this.api.nihiiMH, this.api.isMH ? this.api.MHContactPersonSsin : hcp.ssin, this.api.isMH ? this.api.MHContactPersonName : hcp.lastName + ' ' + hcp.firstName, this.api.tokenId ? "doctor" : "medicalhouse", m.format('x'), null
          ))
      )).then(aRes => {
          aRes.map(res => {
              insList.push(res);
              //console.log(res);
          })
          this.set("insList",insList);
          console.log("insList", JSON.stringify(insList));
          this.set("isLoading", false);
      }).finally(this.set("isLoading", false))
  }

  cleanNiss(niss){
      return niss.replace(/ /g, "").replace(/-/g,"").replace(/\./g,"").replace(/_/g,"").replace(/\//g,"")
  }

  _runTest(){
      let mhcs = this.patient.medicalHouseContracts
      mhcs.map(
          mhc =>{
              let tmp = mhc.suspensionSource;
          }
      )
      const amounts = this.getForfaitAmounts();
      const amount = this.getForfaitAmountOnDate(20161101);
      const amount1 = this.getForfaitAmountOnDate(20171101);
      const amount2 = this.getForfaitAmountOnDate(20181101);
  }

  // _generateInvoiceTest(){
  //     // let inv;
  //     // const prefix = 'invoice:'+this.user.healthcarePartyId+':'+(parentIns && parentIns.code ? parentIns.code : '000')+':'
  //
  //     this.api.crypto().extractDelegationsSFKs(this.patient, this.user.healthcarePartyId).then(secretForeignKeys => {
  //         const patientKeys = secretForeignKeys.extractedKeys.join(",")
  //         this.api.invoice().appendCodes(this.user.id, this.selectedInvoice.invoiceType, this.selectedMediumCodeType, (!!this.patient.insurabilities.length?this.patient.insurabilities[0].insuranceId:''), patientKeys, null, 0, [newNmcl])
  //             .then(inv => (this.patient.insurabilities && this.patient.insurabilities.length) ? this.api.insurance().getInsurance(this.patient.insurabilities[0].insuranceId).then(ins => [inv[0] || null, ins || null]) :  [inv[0] || null, null])
  //             .then(([inv, ins]) => (ins && ins != null) ? this.api.insurance().getInsurance(ins.parent).then(parentIns => [inv, parentIns]) : [inv, null])
  //             .then(([inv, parentIns]) => {
  //                 let invoice = inv
  //
  //                 if(!invoice){return null;}
  //                 if (!invoice.id) {
  //                     invoice.invoiceDate = this.selectedInvoice.invoiceDate
  //                     invoice.invoiceReference = this.selectedInvoice.invoiceReference
  //                     invoice.thirdPartyPaymentJustification = this.selectedInvoice.thirdPartyPaymentJustification
  //                     invoice.invoicePeriod = this.selectedInvoice.invoicePeriod !== "" ? this.selectedInvoice.invoicePeriod : 0
  //                     invoice.longDelayJustification = this.selectedInvoice.longDelayJustification
  //                     invoice.gnotionNihii = this.selectedInvoice.gnotionNihii === "" ? null : this.selectedInvoice.gnotionNihii
  //                     invoice.internshipNihii = this.selectedInvoice.internshipNihii === "" ? null : this.selectedInvoice.internshipNihii
  //                     invoice.creditNote = this.selectedInvoice.creditNote
  //                     invoice.careProviderType = this.selectedInvoice.careProviderType
  //                     invoice.encounterLocationName = this.selectedInvoice.encounterLocationName
  //                     invoice.encounterLocationNihii = this.selectedInvoice.encounterLocationNihii
  //                     invoice.encounterLocationNorm = this.selectedInvoice.encounterLocationNorm
  //
  //                     const icId = invoice.invoicingCodes[0] && invoice.invoicingCodes[0].id
  //                     const prefix = 'invoice:'+this.user.healthcarePartyId+':'+(parentIns && parentIns.code ? parentIns.code : '000')+':'
  //
  //                     return this.api.invoice().newInstance(this.user, this.patient, invoice)
  //                         .then(invoice => this.api.invoice().createInvoice(invoice, prefix))
  //                         .then(invoice => this.api.register(invoice,'invoice'))
  //                         .then(invoice => {
  //                             this.$['nmclGrid'].clearCache()
  //                             console.log(this.selectedInvoice)
  //                             this.api.invoice().findBy(this.user.healthcarePartyId, this.patient)
  //                                 .then(invoices => invoices.map(i => this.api.register(i, 'invoice')))
  //                                 .then(invoices => {
  //                                     this.set('invoices', _.orderBy(invoices, ['invoiceDate'], ['desc']))
  //                                     this.set('selectedInvoiceIndex', _.findIndex(this.invoices, i => i.invoicingCodes.some(c => c.id.includes(icId))))
  //                                     this.$['nmclGrid'].clearCache()
  //
  //                                     return invoice
  //                                 })
  //                         })
  //                 } else {
  //                     this.api.tarification().getTarifications(new models.ListOfIdsDto({ids: invoice.invoicingCodes.map(tar => tar.tarificationId)})).then(nmcls =>
  //                         nmcls.map(nmcl =>{
  //                             let sns = invoice.invoicingCodes.filter(n => n.tarificationId === nmcl.id) || null
  //                             if(sns && sns.length){
  //                                 sns.map(sn =>{
  //                                     sn.prescriberNeeded = nmcl.needsPrescriber
  //                                     sn.isRelativePrestation = nmcl.hasRelatedCode
  //                                 })
  //                             }
  //                         })
  //                     ).then(x =>{
  //                         const registered = this.api.register(invoice, 'invoice')
  //                         this.$['nmclGrid'].clearCache()
  //                         this.updateGui(registered)
  //                         return registered;
  //                     })
  //
  //
  //                 }
  //             })
  //     })
  // }

  getForfaitAmountOnDate(date){
      const amounts = this.getForfaitAmounts();
      let amount = amounts.find(am => am.startDate <= date && (!am.endDate || am.endDate >= date ));

      return amount;
  }

  getForfaitAmounts(){
      const propRegStatus = this.user.properties.find(p => p.type && p.type.identifier === 'org.taktik.icure.user.Forfait.Amounts') ||
          (this.user.properties[this.user.properties.length] = {
              type: {identifier: 'org.taktik.icure.user.Forfait.Amounts'},
              typedValue: {type: 'JSON', stringValue: '{\"amounts\":[]}'}
          });
      let amounts = {};
      if(propRegStatus && propRegStatus.typedValue) {
          amounts = JSON.parse(propRegStatus.typedValue.stringValue);
      }
      return amounts.amounts ? amounts.amounts : null;
  }

  open() {
      this.$.dialog.open();
  }

  close() {
      this.$.dialog.close();
  }
}
customElements.define(HtPatMedicalhouseTimeline.is, HtPatMedicalhouseTimeline);

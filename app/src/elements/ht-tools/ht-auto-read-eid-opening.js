import '../../styles/notification-style.js';
import '../../styles/scrollbar-style.js';
import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class HtAutoReadEidOpening extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="notification-style scrollbar-style">

            #eidOthersChoicesNotif.notification-container{
                height: 358px;
                grid-template-columns: 48px 1fr 132px;
            }

            #eidOthersChoicesNotif.notification-container.notification {
                animation: notificationAnim .5s ease-in;
            }
            .notification-grid{
                grid-column-start: 1;
                grid-column-end: span 3;
                grid-row-start: 3;
                grid-row-end: span 2;
                margin: 0;
                height: 300px;
            }

            .patient-photo {
                background: rgba(0, 0, 0, 0.1);
                height: 26px;
                width: 26px;
                min-width: 26px;
                border-radius: 50%;
                margin-right: 8px;
                overflow: hidden !important;
                padding-right: 0 !important;
            }

            .patient-photo img {
                width: 100%;
                margin: 50%;
                transform: translate(-50%, -50%);
            }

            vaadin-grid.material .cell {
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 0;
            }
        </style>

        <paper-item id="eidFound" class="notification-container">
            <iron-icon class="notification-icn" icon="vaadin:health-card"></iron-icon>
            <div class="notification-msg">
                <h4>[[localize('eid_found','eid found',language)]]</h4>
                <p>[[localize('open_pat','open patient',language)]] ?</p>
            </div>
            <paper-button on-tap="closeEidPanel" class="notification-btn"><iron-icon icon="cancel"></iron-icon>[[localize('no','No',language)]]</paper-button>
            <paper-button on-tap="openPatientWithEid" class="notification-btn"><iron-icon icon="check-circle"></iron-icon>[[localize('yes','Yes',language)]]</paper-button>
        </paper-item>



        <paper-item id="eidOthersChoicesNotif" class="notification-container">
            <iron-icon class="notification-icn" icon="vaadin:health-card"></iron-icon>
            <div class="notification-msg">
                <h4>[[localize('pats','Patients',language)]]</h4>
            </div>
            <paper-button on-tap="createPatient" class="notification-btn"><iron-icon icon="add-circle"></iron-icon>[[localize("add_pat","New patient",language)]]</paper-button>
            <paper-button on-tap="closeEidOtherPanel" class="notification-btn"><iron-icon icon="cancel" panel="eidOpenPatientMessage"></iron-icon>[[localize('clo','Close',language)]]</paper-button>


            <vaadin-grid id="eid-patients-list" class="notification-grid" items="[[eidPatientsList]]" on-tap="openSelectedPatientWithEid" active-item="{{activeItem}}">
                <vaadin-grid-column flex-grow="0" width="25%">
                    <template class="header">
                        <div class="cell frozen">[[localize('pic','Picture',language)]]</div>
                    </template>
                    <template>
                        <div class="cell frozen patient-photo"><img src\$="[[picture(item)]]"></div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column flex-grow="1">
                    <template class="header">
                        <vaadin-grid-sorter path="lastName">[[localize('las_nam','Last name',language)]]
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div class="cell frozen">[[item.lastName]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column flex-grow="0" width="25%">
                    <template class="header">
                        <vaadin-grid-sorter path="firstName">[[localize('fir_nam','First name',language)]]
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div class="cell frozen">[[item.firstName]]</div>
                    </template>
                </vaadin-grid-column>
            </vaadin-grid>
        </paper-item>
`;
  }

  static get is() {
      return 'ht-auto-read-eid-opening';
  }

  static get properties() {
      return {
          api: {
              type: Object,
              noReset: true
          },
          user: {
              type: Object,
              noReset: true
          },
          card:{
              type:Object,
              value:{},
              observer:"_cardChanged"
          },
          autoReadSelected:{
              type:Object,
              value:{}
          },
          language:{
              type:String,
              value:""
          }
      }
  }

  /**Observer Card : display notification*/
  _cardChanged(){
      if(!this.card.nationalNumber)return;
      this.closeEidPanel()
      this.api.hcparty().getCurrentHealthcareParty()
          .then(hcp => this.api.patient().findByNameBirthSsinAutoWithUser(this.user,hcp.id, this.card.nationalNumber, null, null, 100, "asc"))
          .then(pats => {
              if(pats.rows.length && pats.rows.find(pat => pat.ssin===this.card.nationalNumber)){
                  this.set("autoReadSelected",pats.rows.find(pat => pat.ssin===this.card.nationalNumber))
                  this.$['eidFound'].classList.add('notification');
              }
              else{
                  this.searchPatientsEid();
              }
          })
          .catch(()=>this.dispatchEvent(new CustomEvent('error-electron', { detail: {message:this.localize("error-elect-eid-pat-no-found","EID : patient not found",this.language)}, bubbles: true, composed: true })))
  }

  /***
   * Other choice Notification
   */
  searchPatientsEid(){
      this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(currentHcp => {
          //creation of filters
          const firstNameFilter = this.card.firstName && this.card.firstName.length >= 2 && ({
              '$type': 'PatientByHcPartyNameContainsFuzzyFilter',
              'healthcarePartyId': currentHcp.parentId || this.user.healthcarePartyId,
              'searchString': this.card.firstName
          })
          const lastNameFilter = this.card.surname && this.card.surname.length >= 2 && ({
              '$type': 'PatientByHcPartyNameContainsFuzzyFilter',
              'healthcarePartyId': currentHcp.parentId || this.user.healthcarePartyId,
              'searchString': this.card.surname
          })
          const dateOfBirthFilter = (/^[0-9]{4}-[0-1][0-9]-[0-3][0-9]$/.test(this.api.moment(this.card.dateOfBirth * 1000).format('YYYY-MM-DD'))) && ({
              '$type': 'PatientByHcPartyDateOfBirthFilter',
              'healthcarePartyId': currentHcp.parentId || this.user.healthcarePartyId,
              'dateOfBirth': this.api.moment(this.card.dateOfBirth * 1000).format('YYYY-MM-DD').replace(/-/g, "")
          })
          const ssinFilter = /^[0-9]{11}$/.test(this.card.nationalNumber) && ({
              '$type': 'PatientByHcPartyAndSsinFilter',
              'healthcarePartyId': currentHcp.parentId || this.user.healthcarePartyId,
              'ssin': this.card.nationalNumber
          })

          const intersectionFilters = [firstNameFilter, lastNameFilter, dateOfBirthFilter].filter(x => !!x)
          const unionFilters = [(intersectionFilters.length > 1 ? ({
              '$type': 'IntersectionFilter',
              filters: intersectionFilters
          }) : {}), intersectionFilters[0], intersectionFilters[1], intersectionFilters[2], ssinFilter].filter(x => !!x)

          const unionFilter = unionFilters.length > 1 ? ({
              '$type': 'UnionFilter',
              filters: unionFilters
          }) : unionFilters[0]

          if (unionFilter) {
              this.api.patient().filterByWithUser(this.user, null, null, 50, 0, 1, 'desc', {filter: unionFilter})
                  .then(patients => {
                      const grouped = _.groupBy(patients.rows, pat =>(this.card.firstName.includes(pat.firstName) && this.card.surname.includes(pat.lastName) && pat.dateOfBirth===this.card.dateOfBirth) ? 0 : this.card.firstName.includes(pat.firstName) && this.card.surname.includes(pat.lastName) ? 1 : this.card.surname.includes(pat.lastName) ? 2 : this.card.firstName.includes(pat.firstName) ? 3 : 4)
                      this.set("eidPatientsList",_.flatMap(grouped))
                      this.$['eidOthersChoicesNotif'].classList.add('notification');
                  })
          }
      })
  }

  closeEidOtherPanel(e) {
      this.$["eidOthersChoicesNotif"].classList.remove('notification');
  }

  openSelectedPatientWithEid(e){
      // Must click on a row
      if ((e.path || e.composedPath())[0].nodeName === 'TABLE') return
      let id="";
      if(this.activeItem) {
          const selected = this.activeItem
          this.api.patient().getPatientWithUser(this.user, selected.id).then(p => {
              id= p.id
              // commenté car certains patients ne veulent pas etre retrouvé donc les données ne doivent pas être stockées
              // p.ssin = p.ssin || this.card.nationalNumber
              // if(!p.addresses.find(ad => ad.addressType==="home")){
              //     let streetData = _.trim(this.card.street).split(" ")
              //     const number = streetData.find(str => str.match(/\d/g))
              //     const boxNumber = streetData[streetData.length-1]!==number ? streetData[streetData.length-1] :""
              //     const street = streetData.reduce((tot,str)=>{
              //         if(!tot)tot="";
              //         if(!(str===number || str===boxNumber ))
              //             tot = tot.concat(" ",str)
              //         return tot;
              //     })
              //
              //     p.addresses.push({
              //         addressType: "home",
              //         street: street,
              //         houseNumber: number,
              //         postboxNumber: boxNumber,
              //         postalCode: this.card.zipCode,
              //         city: this.card.municipality,
              //         country: this.card.country
              //     })
              // }
              //
              // p.gender = p.gender || this.card.gender === 'M' ? 'male' : 'female'
              // p.placeOfBirth = p.placeOfBirth || this.card.locationOfBirth
              // p.dateOfBirth = p.dateOfBirth || parseInt(this.api.moment(this.card.dateOfBirth * 1000).format('YYYYMMDD'))
              // p.nationality = p.nationality || this.card.nationality
              // p.picture = p.picture || this.card.picture
              // p.firstName = p.firstName || this.card.firstName
              // p.lastName = p.lastName || this.card.surname
              //
              return p
          })
              .then( p => this.api.patient().modifyPatientWithUser(this.user,p))
              .then( p => this.api.register(p, 'patient'))
              .then(p => {
                  this.$['eidOthersChoicesNotif'].classList.remove('notification');
                  return p;
              })
              .then(p =>{
                  this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId)
                      .then(hcp => this.api.fhc().Therlinkcontroller().registerTherapeuticLinkUsingPOST1(this.api.keystoreId, this.api.tokenId, this.api.credentials.ehpassword, hcp.nihii, hcp.ssin, hcp.firstName, hcp.lastName, this.cleanNiss(p.ssin), p.firstName, p.lastName, this.card.logicalNumber, "", null, null, null, null, null))
              })
              .finally(()=>{
                  this.dispatchEvent(new CustomEvent("force-reload-patient",{detail:{origin:"ht-auto-read-eid-opening",patient:id,reason:"data-changed"},bubbles:true,composed:true}))
                  id && location.replace(location.href.replace(/(.+?)#.*/, `$1#/pat/${id}`));
              })
      }
  }

  createPatient(){
      let streetData = _.trim(this.card.street).split(" ")
      const number = streetData.find(str => str.match(/\d/g))
      const boxNumber = streetData[streetData.length-1]!==number ? streetData[streetData.length-1] :""
      const street = streetData.reduce((tot,str)=>{
          if(!tot)tot="";
          if(!(str===number || str===boxNumber ))
              tot = tot.concat(" ",str)
          return tot;
      })
      const pat = {
          ssin : this.card.nationalNumber,
          gender : this.card.gender === 'M' ? 'male' : 'female',
          placeOfBirth : this.card.locationOfBirth,
          dateOfBirth : parseInt(this.api.moment(this.card.dateOfBirth * 1000).format('YYYYMMDD')),
          nationality : this.card.nationality,
          picture : this.card.picture,
          firstName : this.card.firstName,
          lastName : this.card.surname,
          addresses :[{
              addressType: "home",
              street: street,
              houseNumber: number,
              postboxNumber: boxNumber,
              postalCode: this.card.zipCode,
              city: this.card.municipality,
              country: this.card.country
          }]
      }
      this.api.patient().newInstance(this.user,pat)
          .then(p =>this.api.patient().createPatientWithUser(this.user,p))
          .then(p =>{
              this.$['eidOthersChoicesNotif'].classList.remove('notification')
              location.replace(location.href.replace(/(.+?)#.*/, `$1#/pat/${p.id}`))
          })
  }

  /***
   *
   * Eid Found Notification
   */
  closeEidPanel(e) {
      this.$["eidFound"].classList.remove('notification');
  }

  openPatientWithEid(){
      let id="";
      this.api.patient().getPatientWithUser(this.user, this.autoReadSelected.id).then(p => {
          id = p.id
          p.ssin = p.ssin || this.card.nationalNumber
          if(!p.addresses.find(ad => ad.addressType==="home")){
              let streetData = _.trim(this.card.street).split(" ")
              const number = streetData.find(str => str.match(/\d/g))
              const boxNumber = streetData[streetData.length-1]!==number ? streetData[streetData.length-1] :""
              const street = streetData.reduce((tot,str)=>{
                  if(!tot)tot="";
                  if(!(str===number || str===boxNumber ))
                      tot = tot.concat(" ",str)
                  return tot;
              })

              p.addresses.push({
                  addressType: "home",
                  street: street,
                  houseNumber: number,
                  postboxNumber: boxNumber,
                  postalCode: this.card.zipCode,
                  city: this.card.municipality,
                  country: this.card.country
              })
          }

          p.gender = p.gender || (this.card.gender === 'M' ? 'male' : 'female')
          p.placeOfBirth = p.placeOfBirth || this.card.locationOfBirth
          p.dateOfBirth = p.dateOfBirth || parseInt(this.api.moment(this.card.dateOfBirth * 1000).format('YYYYMMDD'))
          p.nationality = p.nationality || this.card.nationality
          p.picture = p.picture || this.card.picture
          p.firstName = p.firstName || this.car.firstName
          p.lastName = p.lastName || this.card.surname

          return p
      })
          .then( p => this.api.patient().modifyPatientWithUser(this.user,p))
          .then( p => this.api.register(p, 'patient'))
          .then(p => {
              this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp => {
                  this.api.fhc().Therlinkcontroller().registerTherapeuticLinkUsingPOST1(this.api.keystoreId, this.api.tokenId, this.api.credentials.ehpassword,
                      hcp.nihii, hcp.ssin, hcp.firstName, hcp.lastName,
                      p.ssin, p.firstName, p.lastName, this.card.logicalNumber, "", null, null, null, null, null)

              })
          })
          .finally(() => {
              this.closeEidPanel();
              this.dispatchEvent(new CustomEvent("force-reload-patient",{detail:{origin:"ht-auto-read-eid-opening",patient:id,reason:"data-changed"},bubbles:true,composed:true}))
              id && location.replace(location.href.replace(/(.+?)#.*/, `$1#/pat/${id}`));
          })
  }

  /***
   * Utils
   */
  cleanNiss(niss){
      return niss.replace(/ /g, "").replace(/-/g,"").replace(/\./g,"").replace(/_/g,"").replace(/\//g,"")
  }

  picture(pat) {
      if (!pat) {
          return require('../../../images/male-placeholder.png')
      }
      return pat.picture ? 'data:image/jpeg;base64,' + pat.picture : pat.gender === 'female' ? require('../../../images/female-placeholder.png') : require('../../../images/male-placeholder.png')
  }
}
customElements.define(HtAutoReadEidOpening.is,HtAutoReadEidOpening);

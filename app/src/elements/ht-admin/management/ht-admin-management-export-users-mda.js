
import moment from 'moment/src/moment';
import _ from 'lodash/lodash';
import jsZip from "jszip/dist/jszip.js";

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class HtAdminManagementExportUsersMda extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
       <style include="shared-styles dialog-style buttons-style paper-input-style paper-tabs-style">

            .content{
                padding: 0 12px;
            }

            .overlaySpinnerContainer {
                position:absolute;
                width:100%;
                height:100%;
                z-index:10;
                background:rgba(255, 255, 255, .8);
                top:0;
                left:0;
            }
            .overlaySpinner {
                max-width:80px;
                margin:100px auto
            }

        </style>



        <template is="dom-if" if="[[_isBusy]]"><div class="overlaySpinnerContainer"><div class="overlaySpinner"><ht-spinner active></ht-spinner></div></div></template>



        <div class="users-panel p10">
            <h4 class="panel-title">[[localize('exportUsersMda','Export users (MDA)',language)]]</h4>
            <div class="mt30"><paper-button class="button button--save" style="width:180px" on-tap="_doExportUsersForMda"><iron-icon icon="icons:cloud-download"></iron-icon> &nbsp; [[localize('exportData','Export data',language)]]</paper-button></div>
        </div>
`;
    }

    static get is() {
        return 'ht-admin-management-export-users-mda'
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
            resources: {
                type: Object,
                noReset: true,
                value: () => {}
            },
            language: {
                type: String,
                noReset: true,
                value: "fr"
            },
            _isBusy: {
                type: Boolean,
                value: false,
                noReset: true
            }
        }
    }

    static get observers() {
        return [];
    }

    constructor() {
        super()
    }

    ready() {
        super.ready()
    }

    _resetComponentProperties() {
        const promResolve = Promise.resolve();
        return promResolve
            .then(() => {
                const componentProperties = HtAdminManagementExportUsersMda.properties
                Object.keys(componentProperties).forEach(k => { if (!_.get(componentProperties[k],"noReset", false)) { this.set(k, (typeof componentProperties[k].value === 'function' ? componentProperties[k].value() : (componentProperties[k].value || null))) }})
                return promResolve
            })
    }

    _getPatients(mhNihii) {

        return this.api.getRowsUsingPagination(
            (key,docId) =>
                this.api.patient().listPatientsByHcPartyWithUser(this.user, _.trim(_.get(this,"user.healthcarePartyId","")), null, key && JSON.stringify(key), docId, 1000)
                    .then(pl => {
                        pl.rows = _
                            .chain(pl.rows)
                            .map(it => _.assign(it, {validMhc: _
                                    .chain(_.get(it, "medicalHouseContracts",[]))
                                    .filter(mhc => mhc
                                        && _.trim(_.get(mhc,"hcpId"))
                                        && _.trim(_.get(mhc,"hcpId")) === _.trim(_.get(this,"user.healthcarePartyId"))
                                        && _.trim(_.get(mhc,"mmNihii")) === mhNihii
                                        && _.trim(_.get(mhc,"contractId"))
                                        && (_.get(mhc,"status",0) & (1 << 1))
                                        && !(_.get(mhc,"status",0) & (1 << 2))
                                        && !(_.get(mhc,"status",0) & (1 << 3))
                                    )
                                    .orderBy(['startOfContract'],['desc'])
                                    .head()
                                    .value()
                            }))
                            .filter(it=> _.get(it,"active", true) && _.trim(_.get(it,"ssin", "")) && _.size(_.get(it,"validMhc", null)))
                            .map(it => ({
                                ssin: _.trim(_.get(it,"ssin","")).replace(/[^\d]/gmi,""),
                                contractId: _.trim(_.get(it, "validMhc.contractId")),
                                startOfContract: _.trim(_.get(it, "validMhc.startOfContract")),
                                startOfCoverage: _.trim(_.get(it, "validMhc.startOfCoverage")),
                                signatureType: _.trim(_.get(it, "validMhc.signatureType")),
                                lastInvoicing : _.trim(_.get(_.find(_.get(it, "tags", []), {type:"flatRateLastInvoicing"}), "code", "")),
                            }))
                            .value()
                        return {
                            rows:pl.rows,
                            nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey,
                            nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId,
                            done: !pl.nextKeyPair
                        }
                    })
                    .catch(()=>{ return Promise.resolve(); })
        )||[];

    }

    _doExportUsersForMda() {

        const promResolve = Promise.resolve()
        const zipArchive = new jsZip();
        const filename = moment().format("YYYY-MM-DD") + "-patients-export-mda";

        return this._isBusy ? promResolve : promResolve
            .then(() => this._resetComponentProperties())
            .then(() => this.set("_isBusy",true))
            .then(() => this.api.hcparty().getCurrentHealthcareParty().then(hcp => _.trim(_.get(hcp,"nihii","")).replace(/[^\d]/gmi,"")))
            .then(mhNihii => !_.trim(mhNihii) ? promResolve : this._getPatients(mhNihii))
            .then(patients => !_.size(patients) ? promResolve : zipArchive.file(filename + ".json", JSON.stringify(patients)).generateAsync({type:"arraybuffer",mimeType: "application/zip",compression: "DEFLATE",compressionOptions: { level: 9 }}))
            .then(zipFile => !zipFile ? promResolve : this.api.triggerFileDownload(zipFile, "application/zip", filename + ".zip"))
            .finally(() => this.set("_isBusy",false))

    }


}

customElements.define(HtAdminManagementExportUsersMda.is, HtAdminManagementExportUsersMda)

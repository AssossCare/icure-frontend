import '../../../ht-spinner/ht-spinner.js'
import '../../../../styles/dialog-style.js'
import '../../../../styles/buttons-style.js'
import * as models from '@taktik/icc-api/dist/icc-api/model/models'
import moment from 'moment/src/moment'
import _ from 'lodash/lodash'


import {PolymerElement, html} from '@polymer/polymer'
import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";

class HtPatFixPatsIns extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {

    static get template() {

        return html`
            <style include="dialog-style scrollbar-style buttons-style paper-tabs-style notification-style">
        
                #dialog{
                    height: 400px;
                    width: 600px;
                    top: 64px;
                }
    
                #dialogContent{
                    display: flex;
                    height: calc(100% - 45px);
                    width: auto;
                }
                
                .subscription-content{
                    display: flex;
                    position: relative;
                    width: 100%;
                    background-color: white;
                    padding:20px;
                }
    
            </style>
        
            <paper-dialog id="dialog">
                <div id="dialogContent">
                    <div class="subscription-content">Fixing pat: [[patientBeingFixed]]/[[totalPatients]]</div>
                    <div class="buttons"><paper-button class="button button--save" on-tap="_doRun">RUN</paper-button></div>
                </div>
            </paper-dialog>
        `

    }

    static get is() {
        return 'ht-pat-fix-pats-ins';
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
            i18n:{
                type: Object,
                value: {}
            },
            resources:{
                type: Object,
                value: {}
            },
            language: {
                type: String
            },
        };
    }

    constructor() {

        super();

    }

    static get observers() {

        return []

    }

    ready() {

        super.ready();

    }

    _open() {

        this.shadowRoot.querySelector('#dialog') && this.shadowRoot.querySelector('#dialog').open()

    }

    getPatients() {

        const mhHcpId = _.trim(_.get(this,"user.healthcarePartyId"))

        return this.api.getRowsUsingPagination((key,docId) => this.api.patient().listPatientsByHcPartyWithUser(this.user, mhHcpId, null, key && JSON.stringify(key), docId, 1000)
            .then(pl => {
                pl.rows = _
                    .chain(pl.rows)
                    .filter(it => _.some(_.get(it, "insurabilities", []), ins => _.trim(_.get(ins, "parameters.mdaInputReference"))))
                    .compact()
                    .value()
                return {rows:pl.rows, nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey, nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId, done: !pl.nextKeyPair}
            })
            .catch(() => Promise.resolve([]))
        ).catch(() => Promise.resolve([]))

    }

    _doRun() {

        return this.getPatients()
            .then(pats => (this.set("patientBeingFixed", 0)|true) && pats)
            .then(pats => (console.log("pats", pats)||true) && pats)
            .then(pats => (this.set("totalPatients", _.size(pats))|true) && pats)
            .then(pats => {

                let prom = Promise.resolve([])

                _.map(pats, pat => { prom = prom.then(() => {

                    this.set("patientBeingFixed", _.get(this,"patientBeingFixed") + 1 )

                    _.map(_.get(pat, "insurabilities"), ins => { try { delete ins["parameters"]["mdaInputReference"] } catch(e){};  return ins; })

                    return this.api.patient().modifyPatientWithUser(this.user, pat).catch(() => null)

                })})

                return prom

            })
            .then(() => console.log("--- DONE ---"))

    }

}

customElements.define(HtPatFixPatsIns.is, HtPatFixPatsIns);
/**
 @license
 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/paper-input/paper-input'
import '@polymer/paper-input/paper-input-container'
import '@polymer/paper-input/paper-textarea'
import '@polymer/paper-icon-button/paper-icon-button'

import '../../elements/ht-spinner/ht-spinner'
import '../../elements/dynamic-form/validator/ht-email-validator'

import _ from 'lodash/lodash'
import {Base64} from 'js-base64'
import {html, PolymerElement} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../elements/tk-localizer";

const runtime = require('offline-plugin/runtime')


class HtMailerDialog extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`

        <style include="shared-styles scrollbar-style dialog-style">
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
            #htMailerDialogContent {
                width:90%;
                min-width: 400px;
                max-width: 900px;
                height:600px;
            }
            .modal-title {
                justify-content: flex-start;
            }
        </style>



        <ht-email-validator api="[[api]]" validator-name="ht-email-validator"></ht-email-validator>
        <template is="dom-if" if="[[_isBusy]]"><div class="overlaySpinnerContainer"><div class="overlaySpinner"><ht-spinner active></ht-spinner></div></div></template>



        <paper-dialog class="modalDialog" id="htMailerDialogContent" no-cancel-on-outside-click no-cancel-on-esc-key>
            <h2 class="modal-title"><iron-icon icon="communication:email"></iron-icon> &nbsp;[[localize('sendDocumentByEmail','Send a document by email',language)]]</h2>
            <div class="content pl20 pr20">
                <div class=""><paper-input id="recipients" placeholder="[[localize('recipientsEmailAddresses','Recipient(s) email address(es)',language)]]" value="[[_data.mail.recipient]]" validator="ht-email-validator" auto-validate><paper-icon-button slot="prefix" icon="icons:assignment-ind"></paper-icon-button></paper-input></div>
                <div class="pl8 mt5"><vaadin-checkbox id="copyMe">[[localize('copyMe', 'Send me a copy of message', language)]]</vaadin-checkbox></div>
                <div class=""><paper-input id="subject" placeholder="[[localize('writeYourSubject', 'Write your subject', language)]]" value="[[_data.mail.subject]]" auto-validate required><paper-icon-button slot="prefix" icon="icons:assignment"></paper-icon-button></paper-input></div>
                <div class=""><paper-input-container alway-float-label="true"><iron-autogrow-textarea slot="input" class="paper-input-input" id="message" placeholder="[[localize('writeYourMessage', 'Write your message', language)]]"  value="[[_data.mail.message]]" auto-validate required></iron-autogrow-textarea></paper-input-container></div>
                <div class="mt30"><iron-icon icon="editor:attach-file" class="darkBlue mr5"></iron-icon>[[_data.mail.attachmentName]]</div>
                <div class="mt20 darkRed"><iron-icon icon="warning" class="mr5"></iron-icon>[[localize('warningSendByEmail', 'Warning, sending confidential documents by email is NOT secured. Please use the eHealth box when possible.', language)]]</div>
            </div>
            <div class="buttons">
                <paper-button class="button button--other" on-tap="_closeComponent"><iron-icon icon="icons:close"></iron-icon> &nbsp; [[localize('clo','Close',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_send"><iron-icon icon="check-circle"></iron-icon>[[localize('send','Send',language)]]</paper-button>
            </div>
        </paper-dialog>`
    }

    static get is() {
        return 'ht-mailer-dialog'
    }

    static get properties() {
        return {
            api: {
                type: Object,
                noReset: true,
                value: () => {
                }
            },
            user: {
                type: Object,
                noReset: true,
                value: () => {
                }
            },
            resources: {
                type: Object,
                noReset: true,
                value: () => {
                }
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
            },
            _predefinedMessages: {
                type: Array,
                value: () => [{
                    scenario: "default",
                    subject: "Un document vous concernant",
                    message: `Bonjour Madame, bonjour Monsieur, Veuillez, je vous prie, trouver ci-joint le document vous concernant. Je vous en souhaite la bonne réception. Bien à vous,`
                }, {
                    scenario: "sendMedicationScheme",
                    subject: "Votre schéma de médication",
                    message: `Bonjour Madame, bonjour Monsieur, Veuillez, je vous prie, trouver ci-joint votre schéma de médication au format PDF. Je vous en souhaite la bonne réception. Bien à vous,`
                }, {
                    scenario: "sendPrescription",
                    subject: "Votre prescription électronique",
                    message: `Bonjour Madame, bonjour Monsieur, Veuillez, je vous prie, trouver ci-joint votre prescription électronique au format PDF. Je vous en souhaite la bonne réception. Bien à vous,`
                }]
            },
            _data: {
                type: Object,
                value: () => {
                    return {
                        currentHcp: {},
                        currentPatient: {},
                        attachment: {},
                        mail: {},
                    }
                }
            }
        }
    }

    static get observers() {
        return []
    }

    constructor() {
        super()
    }

    ready() {
        super.ready()
    }

    _resetComponentProperties() {
        const promResolve = Promise.resolve()
        return promResolve
            .then(() => {
                const componentProperties = HtMailerDialog.properties
                Object.keys(componentProperties).forEach(k => {
                    if (!_.get(componentProperties[k], "noReset", false)) {
                        this.set(k, (typeof componentProperties[k].value === 'function' ? componentProperties[k].value() : (componentProperties[k].value || null)))
                    }
                })
                return promResolve
            })
    }

    _upperFirstAll(inputValue) {
        return _.trim(_.map(_.trim(inputValue).toLowerCase().split(" "), i => _.upperFirst(_.trim(i))).join(" "))
    }

    _getPrettifiedHcp() {
        const promResolve = Promise.resolve()
        return this.api.hcparty().getCurrentHealthcareParty()
            .then(hcp => {
                const addressData = _.find(_.get(hcp, "addresses", []), {addressType: "work"}) || _.find(_.get(hcp, "addresses", []), {addressType: "home"}) || _.get(hcp, "addresses[0]", [])
                return _.merge({}, hcp, {
                    address: [_.trim(_.get(addressData, "street", "")), _.trim(_.get(addressData, "houseNumber", "")) + (!!_.trim(_.get(addressData, "postboxNumber", "")) ? "/" + _.trim(_.get(addressData, "postboxNumber", "")) : "")].join(", "),
                    postalCode: _.trim(_.get(addressData, "postalCode", "")),
                    city: this._upperFirstAll(_.trim(_.get(addressData, "city", ""))),
                    country: this._upperFirstAll(_.trim(_.get(addressData, "country", ""))),
                    phone: _.trim(_.get(_.find(_.get(addressData, "telecoms", []), {"telecomType": "phone"}), "telecomNumber", "")),
                    mobile: _.trim(_.get(_.find(_.get(addressData, "telecoms", []), {"telecomType": "mobile"}), "telecomNumber", "")),
                    email: _.trim(_.get(_.find(_.get(addressData, "telecoms", []), {"telecomType": "email"}), "telecomNumber", "")),
                    firstName: this._upperFirstAll(_.get(hcp, "firstName", "")),
                    lastName: this._upperFirstAll(_.get(hcp, "lastName", "")),
                    names: this._upperFirstAll(_.get(hcp, "lastName", "")) + " " + this._upperFirstAll(_.get(hcp, "firstName", "")),
                    nihiiHr: this.api.formatInamiNumber(_.trim(_.get(hcp, "nihii", ""))),
                    ssinHr: this.api.formatSsinNumber(_.trim(_.get(hcp, "ssin", ""))),
                })
            })
            .catch(() => promResolve)
    }

    _YYYYMMDDToDDMMYYYY(inputValue) {
        return parseInt(inputValue) ? this.api.moment(_.trim(parseInt(inputValue)), "YYYYMMDD").format('DD/MM/YYYY') : ""
    }

    _prettifyPatient(patient) {
        const addressData = _.find(_.get(patient, "addresses", []), {addressType: "home"}) || _.find(_.get(patient, "addresses", []), {addressType: "work"}) || _.get(patient, "addresses[0]", [])
        return _.merge({}, patient, {
            address: [_.trim(_.get(addressData, "street", "")), _.trim(_.get(addressData, "houseNumber", "")) + (!!_.trim(_.get(addressData, "postboxNumber", "")) ? "/" + _.trim(_.get(addressData, "postboxNumber", "")) : "")].join(", "),
            postalCode: _.trim(_.get(addressData, "postalCode", "")),
            city: this._upperFirstAll(_.trim(_.get(addressData, "city", ""))),
            country: this._upperFirstAll(_.trim(_.get(addressData, "country", ""))),
            phone: _.trim(_.get(_.find(_.get(addressData, "telecoms", []), {"telecomType": "phone"}), "telecomNumber", "")),
            mobile: _.trim(_.get(_.find(_.get(addressData, "telecoms", []), {"telecomType": "mobile"}), "telecomNumber", "")),
            email: _.trim(_.get(_.find(_.get(addressData, "telecoms", []), {"telecomType": "email"}), "telecomNumber", "")),
            firstName: this._upperFirstAll(_.get(patient, "firstName", "")),
            lastName: this._upperFirstAll(_.get(patient, "lastName", "")),
            ssinHr: this.api.formatSsinNumber(_.trim(_.get(patient, "ssin", ""))),
            gender: _.trim(_.get(patient, "gender", "male")),
            genderHr: this._upperFirstAll(this.localize(_.trim(_.get(patient, "gender", "male")) + "GenderLong", "masculin")),
            dateOfBirthHr: this._YYYYMMDDToDDMMYYYY(_.trim(_.get(patient, "dateOfBirth"))),
            insuranceData: _
                .chain(_.get(patient, "insurabilities", {}))
                .filter((i) => {
                    return i &&
                        !!moment(_.trim(_.get(i, "startDate", "0")), "YYYYMMDD").isBefore(moment()) &&
                        (!!moment(_.trim(_.get(i, "endDate", "0")), "YYYYMMDD").isAfter(moment()) || !_.trim(_.get(i, "endDate", ""))) &&
                        !!_.trim(_.get(i, "insuranceId", ""))
                })
                .map(i => {
                    return {
                        insuranceId: _.trim(_.get(i, "insuranceId", "")),
                        identificationNumber: _.trim(_.get(i, "identificationNumber", "")),
                        tc1: _.trim(_.get(i, "parameters.tc1", "")),
                        tc2: _.trim(_.get(i, "parameters.tc2", "")),
                        preferentialstatus: typeof _.get(i, "parameters.preferentialstatus") === "boolean" ? !!_.get(i, "parameters.preferentialstatus", false) : _.trim(_.get(i, "parameters.preferentialstatus")) === "true"
                    }
                })
                .head()
                .value(),
        })
    }

    _getPrettifiedPatient(user, patientId, patientObject = null) {
        const promResolve = Promise.resolve()
        return !_.size(patientObject) && (!_.trim(_.get(user, "id")) || !_.trim(patientId)) ? promResolve : (!!_.size(patientObject) ? Promise.resolve(patientObject) : this.api.patient().getPatientWithUser(user, patientId))
            .then(patient => this._prettifyPatient(patient))
            .then(patient => this._getInsuranceData(_.trim(_.get(patient, "insuranceData.insuranceId"))).then(insuranceData => _.merge({}, patient, {insuranceData: insuranceData})))
            .catch(() => promResolve)
    }

    _getInsuranceData(insuranceId) {
        const promResolve = Promise.resolve()
        return !_.trim(insuranceId) ? promResolve : this.api.insurance().getInsurance(insuranceId)
            .then(insuranceData => _.merge({}, {
                code: _.trim(_.get(insuranceData, "code", "")),
                name: this._upperFirstAll(!!_.trim(_.get(insuranceData, "name." + this.language, "")) ? _.trim(_.get(insuranceData, "name." + this.language, "")) : _.trim(_.find(_.get(insuranceData, "name", {}), _.trim)))
            }))
            .catch(() => promResolve)
    }

    _closeComponent() {

        const promResolve = Promise.resolve()
        const htMailerDialogContent = this.shadowRoot.querySelector("#htMailerDialogContent")

        return promResolve
            .then(() => this._resetComponentProperties())
            .then(() => this.set("_isBusy", false))
            .then(() => this.shadowRoot.querySelector("#recipients").value = "")
            .then(() => this.shadowRoot.querySelector("#subject").value = "")
            .then(() => this.shadowRoot.querySelector("#message").value = "")
            .then(() => _.assign(this.shadowRoot.querySelector("#copyMe"), {checked: false}))
            .then(() => htMailerDialogContent && htMailerDialogContent.close())

    }

    _getTextContentFromHtmlContent(input) {

        const promResolve = Promise.resolve()

        const lookFor = [
            /<style[^>]*?>.*?<\/style>/gim,
            /<a[^>]*?href="([^"]*?)"[^>]*?>(.*?)<\/a>/gim,
            /<[\/\!]*?[^<>]*?>/gim,
            /([\r\n])[\s]+/gim,
            /&(quot|#34);/gim,
            /&(amp|#38);/gim,
            /&(lt|#60);/gim,
            /&(gt|#62);/gim,
            /&(nbsp|#160);/gim,
            /&(iexcl|#161);/gim,
            /&(cent|#162);/gim,
            /&(pound|#163);/gim,
            /&(copy|#169);/gim,
            /(<|>)/gim,
            /!--/gim,
        ]

        const replaceBy = [
            '',
            '\$2 &lt;\$1&gt;',
            '',
            '\$1',
            '"',
            '&',
            '<',
            '>',
            ' ',
            String.fromCharCode(161),
            String.fromCharCode(162),
            String.fromCharCode(163),
            String.fromCharCode(169),
            ' ',
            ' '
        ]

        // Go for prom as could be heavy
        return promResolve
            .then(() => _.map(lookFor, (v, k) => input = input.replace(v, replaceBy[k])))
            .then(() => input)

    }

    _getHtmlTemplate(replacements) {

        let htmlCode = `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                    <head>
                        <title>${replacements.subject}</title>
                        <!--[if !mso]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <meta name="viewport" content="width=device-width,initial-scale=1">
                        <style type="text/css">
                            #outlook a { padding:0; }
                            body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
                            table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
                            img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
                            p { display:block;margin:13px 0; }
                        </style>
                        <!--[if mso]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
                        <!--[if lte mso 11]><style type="text/css">.mj-outlook-group-fix { width:100% !important; }</style><![endif]-->
                        <style type="text/css">
                            @media only screen and (min-width:480px) {
                                .mj-column-per-100 { width:100% !important; max-width: 100%; }
                                .mj-column-per-33 { width:33% !important; max-width: 33%; }
                                .mj-column-per-67 { width:67% !important; max-width: 67%; }
                            }
                            [owa] .mj-column-per-100 { width:100% !important; max-width: 100%; }
                            [owa] .mj-column-per-33 { width:33% !important; max-width: 33%; }
                            [owa] .mj-column-per-67 { width:67% !important; max-width: 67%; }
                            @media only screen and (max-width:480px) {
                                table.mj-full-width-mobile { width: 100% !important; }
                                td.mj-full-width-mobile { width: auto !important; }
                            }
                        </style>
                    </head>

                    <body style="background-color:#F4F4F4;">
                        <div style="background-color:#F4F4F4;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="border:0px solid #ffffff;direction:ltr;font-size:0px;padding:10px 0px 10px 0px;padding-bottom:10px;padding-left:0px;padding-right:0px;padding-top:10px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:0px 0px 0px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:14px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;"></div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="border:0px solid #ffffff;direction:ltr;font-size:0px;padding:10px 20px 0px 20px;padding-bottom:0px;padding-left:20px;padding-right:20px;padding-top:20px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:184.8px;" ><![endif]--><div class="mj-column-per-33 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="background:#ffffff;font-size:0px;padding:0px 0px 0px 0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;" class="mj-full-width-mobile"><tbody><tr><td style="width:184px;" class="mj-full-width-mobile"><a href="http://www.topaz.care" target="_blank"><img alt="Topaz logo" height="auto" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABhCAYAAABszJxzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRBRUU1QzE4ODM0QTExRUE5MTJFRjg4MjIxOEVCQzQwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRBRUU1QzE5ODM0QTExRUE5MTJFRjg4MjIxOEVCQzQwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REFFRTVDMTY4MzRBMTFFQTkxMkVGODgyMjE4RUJDNDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REFFRTVDMTc4MzRBMTFFQTkxMkVGODgyMjE4RUJDNDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ItAvJAAAPT0lEQVR42uxd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" style="border:none;border-radius:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="184"></a></td></tr></tbody></table></td></tr></table></div><!--[if mso | IE]></td><td class="" style="vertical-align:top;width:375.2px;" ><![endif]--><div class="mj-column-per-67 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="border:0px solid #ffffff;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td style="font-size:0px;padding:10px 25px 10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><p style="border-top:solid 1px #cccccc;font-size:1;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #cccccc;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp; </td></tr></table><![endif]--></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="border:0px solid #ffffff;direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-left:0px;padding-right:0px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;"><h1 class="text-build-content" style="margin-top: 10px; margin-bottom: 10px; margin-top: 10px; margin-bottom: 10px; font-weight: normal;"><span style="color:#55575d;font-size:20px;line-height:22px;"><b>${replacements.subject}</b></span></h1></div></td></tr><tr><td align="left" style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;"><p class="text-build-content" style="margin: 10px 0; margin-top: 10px; margin-bottom: 10px;"><span style="color:#55575d;font-size:13px;line-height:22px;">${replacements.message}</span></p></div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="display:none;font-size:0px;padding:0px 20px 0px 20px;padding-top:0px;padding-bottom:0px;word-break:break-word;"></td></tr><tr><td align="left" style="font-size:0px;padding:0px 20px 0px 20px;padding-top:0px;padding-bottom:0px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;"><p class="text-build-content" style="text-align: center; margin: 10px 0; margin-top: 10px; margin-bottom: 10px;"><a target="_blank" href="http://www.topaz.care" style="; text-decoration: none;"><span style="color:#ff5000;font-size:13px;line-height:22px;"><b><u>ASSOSS Care asbl</u></b></span></a><span style="color:#55575d;font-size:13px;line-height:22px;"> - </span><a target="_blank" href="http://www.topaz.care" style="; text-decoration: none;"><span style="color:#ff5000;font-size:13px;line-height:22px;"><b><u>www.topaz.care</u></b></span></a><br><span style="color:#55575d;font-size:13px;line-height:22px;">Rue de la Tulipe 34 - 1050 Ixelles</span><br><a href="mailto:info@topaz.care" style="; text-decoration: none;"><span style="color:#0000EE;font-size:13px;line-height:22px;"><u>info@topaz.care</u></span></a> - <span style="color:#55575d;font-size:13px;line-height:22px;"> +32 2 319 22 41 </span></p></div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div>
                    </body>

                </html>`

        //_.map(replacements, (v,k) => htmlCode = htmlCode.replace("###"+_.trim(k).toUpperCase()+"###", v))

        return htmlCode

    }

    _sendTransactionalEmail(data) {

        const timeout = 10000
        const fetchImpl = typeof window !== "undefined" ? window.fetch : typeof self !== "undefined" ? self.fetch : fetch

        // https://dev.mailjet.com/email/guides/send-api-V3/
        return new Promise((resolve, reject) => {
            let timer = setTimeout(() => reject({message: "Request timed out", status: "Request timed out"}), timeout)
            fetchImpl("https://mj-tc.topaz.care/topaz-mailjet-proxy/?ts=" + +new Date(), {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": _.get(this, "_data.Authorization"),
                },
                body: JSON.stringify(_.assign({}, data, {userData: Base64.encode(_.trim(_.get(this, "user.id")) + ":" + _.trim(_.get(this, "user.login")) + ":" + _.trim(_.get(this, "user.passwordHash")))}))
            })
                .then(response => {
                    clearTimeout(timer)
                    resolve(response)
                })
                .catch(err => {
                    clearTimeout(timer)
                    reject(err)
                })
        })
            .then(response => parseInt(_.get(response, "status", 0)) >= 400 ?
                {
                    message: _.get(response, "statusText"),
                    status: _.get(response, "status"),
                    code: _.get(response, "status"),
                    headers: _.get(response, "headers")
                } :
                !response ? {} : response.json()
            )

    }

    open(inputData) {

        const promResolve = Promise.resolve()
        const documentId = _.trim(_.get(inputData, "documentId", null))
        const fileContent = _.get(inputData, "fileContent", null)
        const contentType = _.get(inputData, "contentType", "application/pdf")
        const filename = _.trim(_.get(inputData, "filename", null))
        const predefinedMessage = _.find(this._predefinedMessages, {scenario: _.trim(_.get(inputData, "predefinedMessage", "default"))})
        const htMailerDialogContent = this.shadowRoot.querySelector("#htMailerDialogContent")
        const patientId = _.trim(_.get(inputData, "patientId", null))

        if (!!_.get(this, "_isBusy", false) || (!_.trim(filename) && !_.trim(documentId)) || (!_.trim(documentId) && !fileContent)) return

        return promResolve
            .then(() => this.set("_isBusy", true))
            .then(() => _.map(_.get(this, "_data", {}), (propValue, propKey) => typeof _.get(propValue, "value", null) !== "function" ? null : this.set("_data." + propKey, _.get(propValue, "value", null)())))
            .then(() => this._resetComponentProperties())
            .then(() => _.assign(this._data, {"Authorization": _.get(inputData, "Authorization")}))
            .then(() => !documentId ? _.assign(this._data, {
                    attachment: {
                        name: filename || this.api.crypto().randomUuid() + '.pdf',
                        content: this.api.crypto().utils.ua2hex(fileContent),
                        contentType: contentType
                    }
                }) : this.api.document().getDocument(documentId)
                    .then(doc => this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(_.get(this, "user.healthcarePartyId", null), _.trim(_.get(doc, "id", "")), _.size(_.get(doc, "encryptionKeys", [])) ? _.get(doc, "encryptionKeys", []) : _.get(doc, "delegations", [])).then(({extractedKeys: enckeys}) => [doc, enckeys]))
                    .then(([doc, enckeys]) => this.api.document().getAttachment(_.trim(_.get(doc, "id", "")), _.trim(_.get(doc, "attachmentId", "")), enckeys.join(',')).then(decryptedContent => [doc, decryptedContent]))
                    .then(([doc, decryptedContent]) => _.assign(this._data, {
                        attachment: {
                            name: _.trim(filename) ? _.trim(filename) : _.trim(_.get(doc, "name")) || this.api.crypto().randomUuid() + '.pdf',
                            content: this.api.crypto().utils.ua2hex(decryptedContent),
                            contentType: _.trim(this.api.document().mimeType(_.trim(_.get(doc, "mainUti", "")))) ? _.trim(this.api.document().mimeType(_.trim(_.get(doc, "mainUti", "")))) : "application/pdf"
                        }
                    }))
                    .catch(e => {
                        console.log("ERROR while getting attachment", e)
                        return promResolve
                    })
            )
            .then(() => this._getPrettifiedHcp().then(hcp => _.assign(this._data, {currentHcp: hcp})))
            .then(() => this._getPrettifiedPatient(_.get(this, "user", {}), patientId).then(patient => _.assign(this._data, {currentPatient: patient})))
            .then(() => this.set("_data.mail.recipient", _.trim(_.get(this, "_data.currentPatient.email", ""))))
            .then(() => this.set("_data.mail.subject", _.trim(_.get(predefinedMessage, "subject", ""))))
            .then(() => this.set("_data.mail.message", _.trim(_.get(predefinedMessage, "message", "")) + "\n" + this.localize("doctorAbreviation", "Dr.", this.language) + " " + _.get(this, "_data.currentHcp.names") + "\n" + this.localize("inami", "NIHII", this.language).toUpperCase() + ": " + _.get(this, "_data.currentHcp.nihiiHr")))
            .then(() => this.set("_data.mail.attachmentName", _.trim(_.get(this, "_data.attachment.name", ""))))
            .then(() => htMailerDialogContent && htMailerDialogContent.open())
            .catch(e => console.log("ERROR with mailer", e))
            .finally(() => (this.set("_isBusy", false) || true) && promResolve)

    }

    _send() {

        let prom = Promise.resolve([])
        const promResolve = Promise.resolve()
        const fieldsToValidate = ["#recipients", "#subject", "#message"]
        const fieldsValidation = _.compact(_.map(fieldsToValidate, k => {
            const fieldToValidate = this.shadowRoot.querySelector(k)
            return (fieldToValidate && typeof _.get(fieldToValidate, "validate", false) === "function" && _.trim(_.get(fieldToValidate, "value", false)) && fieldToValidate.validate())
        }))

        return !!_.get(this, "_isBusy", false) || _.size(fieldsToValidate) !== _.size(fieldsValidation) ? promResolve : promResolve
            .then(() => this.set("_isBusy", true))
            .then(() => {
                const recipients = _.map(_.trim(this.shadowRoot.querySelector("#recipients").value || "").split(/,|;| /), _.trim)
                _.get(this.shadowRoot.querySelector("#copyMe"), "checked", false) && _.trim(_.get(this, "_data.currentHcp.email")) ? recipients.push(_.trim(_.get(this, "_data.currentHcp.email"))) : null
                const subject = _.trim(this.shadowRoot.querySelector("#subject").value || "")
                const message = _.trim(this.shadowRoot.querySelector("#message").value || "").replace(/(\r\n|\n\r|\r|\n)/g, '<br>' + '$1')
                // https://dev.mailjet.com/email/guides/send-api-V3/
                Promise.all(_.map(recipients, recipient => {
                    prom = prom.then(promisesCarrier => this._getTextContentFromHtmlContent(message)
                        .then(textPart => this._sendTransactionalEmail({
                            "FromEmail": "topaz@mj-tc.topaz.care",
                            "FromName": this.localize("doctorAbreviation", "Dr.", this.language) + " " + _.get(this, "_data.currentHcp.names", "Topaz"),
                            "Recipients": [{"Email": _.trim(recipient)}],
                            "Subject": subject,
                            "Html-part": this._getHtmlTemplate({subject: subject, message: message}),
                            "Text-part": textPart,
                            "Headers": {"Reply-To": _.get(this, "_data.currentHcp.email", "info@topaz.care")},
                            "Attachments": !_.get(this, "_data.attachment.content") ? null : [{
                                "Content-type": _.trim(_.get(this, "_data.attachment.contentType")),
                                "Filename": _.trim(_.get(this, "_data.attachment.name")),
                                "content": _.get(this, "_data.attachment.content")
                            }],
                        }))
                        .then(mailjetAnswer => _.concat(promisesCarrier, mailjetAnswer))
                        .catch(e => _.concat(promisesCarrier, null))
                    )
                }))
                return prom
            })
            .then(sendMailResults => {
                const success = _.size(_.filter(sendMailResults, it => !!_.trim(_.get(it, "Sent[0].MessageUUID")))) === _.size(sendMailResults)
                this.dispatchEvent(new CustomEvent("feedback-message", {
                    composed: true,
                    bubbles: true,
                    detail: {message: success ? this.localize("sen_succ", "Message successfully sent", this.language) : this.localize("sen_error", "Message could not be sent", this.language)}
                }))
                return success ? this._closeComponent() : null
            })
            .catch(e => console.log("ERROR when sending mail", e))
            .finally(() => (this.set("_isBusy", false) || true) && promResolve)

    }

}


customElements.define(HtMailerDialog.is, HtMailerDialog)
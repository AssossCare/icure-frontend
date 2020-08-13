import '../filter-panel/filter-panel.js';
import '../dynamic-form/dynamically-loaded-form.js';
import '../dynamic-form/entity-selector.js';
import './ht-lab-healthone.js';

// import Encoding from 'encoding-japanese/src/index.js'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class HtLabDetails extends TkLocalizerMixin(PolymerElement) {
    static get is() {
				return 'ht-lab-details';
    }

    static get properties() {
				return {
            api: {
                type: Object
            },
            attachment:{
                type: String,
                value: null
            },
            document:{
                type: Object,
                value: null
            }
				};
    }

    static get observers() {
				return ['_attachementLoaded(attachment,document)'];
    }

    constructor() {
				super();
    }

    ready(){
				super.ready();
    }

    _attachementLoaded(){

				if(!this.attachment && this.document){
            this.api.document().getDocumentAttachment(this.document.id, this.document.attachmentId, null)
                .then(att => {
                    // TODO: mandatory for annexe in no UTF-8 encoding
                    // try {
                    // 	let bytes = (a.mimeType === 'text/plain')?Encoding.convert(byteContent,'UTF-8'):byteContent;
                    // 	console.log((a.mimeType === 'text/plain')? Encoding.detect(byteContent):"Not text");
                    // }catch (e) {
                    // 	console.log("exception");
                    // 	console.log(e)
                    // }

                    this.set("attachment", att);
                })
        }
				else{
            console.log("attachment OK")
        }
    }

    _checkHealthone(){
				return this.attachment.startsWith("A1");
    }

    _checkXML(){
				return this.attachment.startsWith("<?xml");
    }

}

customElements.define(HtLabDetails.is, HtLabDetails);

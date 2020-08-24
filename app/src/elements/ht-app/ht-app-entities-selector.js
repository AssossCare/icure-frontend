import "@polymer/paper-dialog/paper-dialog"
import "@vaadin/vaadin-grid/vaadin-grid"
import "@vaadin/vaadin-grid/vaadin-grid-column"


import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";

class HtAppEntitiesSelector extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style>

            paper-dialog{
                border-radius:2px;
            }
            .top-gradient{
                line-height:0;
                font-size:0;
                display:block;
                background: linear-gradient(90deg, var(--app-secondary-color-dark), var(--app-secondary-color));
                height:10px;
                position:relative;
                top:0;
                left:0;
                right:0;
                margin:0;
                border-radius:2px 2px 0 0;
            }

            #accountSelectorDialog{
                height: 400px;
                width: 800px;
            }

            #entitiesGrid{
                height: 250px;
            }

        </style>

        <paper-dialog id="accountSelectorDialog" opened="{{opened}}" modal="">
            <div class="top-gradient">&nbsp;</div>
            <h3>[[localize('select-entities','In which entity do you want to connect',language)]]</h3>
            <vaadin-grid id="entitiesGrid" items="[[entities]]" active-item="{{activeEntity}}">
                <vaadin-grid-column flex-grow="1" width="160px">
                    <template class="header">
                        Entité
                    </template>
                    <template>
                        [[item.groupName]]
                    </template>
                </vaadin-grid-column>
            </vaadin-grid>
        </paper-dialog>
`;
  }

  static get is() {
      return "ht-app-entities-selector";
  }

  static get properties() {
      return {
          credentials: {
              type: Object
          },
          opened: {
              type: Boolean,
              value: false,
              notify: true
          },
          token: {
              type: String
          },
          userId:{
              type: String
          },
          user: {
              type: Object,
              value: null
          },
          api: {
              type: Object
          },
          entities: {
              type: Array
          },
          activeEntity: {
              type: Object,
              value: () => {}
          }
      };
  }

  static get observers() {
      return ['_redirectToSelectedEntity(activeEntity)']
  }

  constructor() {
      super();
  }

  open() {
      this.api && this.api.user() && this.api.user().getMatchingUsers()
          .then(ent => {
              console.log(ent)
              this.set("entities", ent)
          })
          .finally(()=> this.entities && this.entities.length > 1 ? this.shadowRoot.querySelector('#accountSelectorDialog') ? this.shadowRoot.querySelector('#accountSelectorDialog').open() : null : null )
  }

  _redirectToSelectedEntity(){
      console.log( this.activeEntity)
      if(this.activeEntity){
          this.set("credentials.username", this.activeEntity && this.activeEntity.groupId ? this.activeEntity.groupId+"/"+this.activeEntity.userId : this.activeEntity.userId)
          this.dispatchEvent(new CustomEvent('redirect-another-entity', {detail: this.credentials}));
      }
  }

  close() {
      this.shadowRoot.querySelector('#accountSelectorDialog') ? this.shadowRoot.querySelector('#accountSelectorDialog').close() : null
  }
}

customElements.define(HtAppEntitiesSelector.is, HtAppEntitiesSelector);

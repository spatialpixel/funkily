import _ from 'lodash';

class ParameterItem extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('parameter-item-template');
    const templateContent = template.content;

    // Create shadow DOM and append template
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.appendChild(templateContent.cloneNode(true));
  }
  
  connectedCallback () {
    const removeButton = this.shadowRoot.querySelector('button.remove-parameter');
    removeButton.addEventListener('click', event => {
      this.shadowRoot.host.remove();
    });
  }
  
  populate (value, name, required) {
    const parameterNameField = this.shadowRoot.querySelector('.parameter-name');
    parameterNameField.value = name;
    
    const parameterDescField = this.shadowRoot.querySelector('.parameter-description');
    parameterDescField.value = value.description;
    
    const parameterReqField = this.shadowRoot.querySelector('.parameter-required');
    parameterReqField.checked = _.includes(required, name);
    
    const parameterTypeField = this.shadowRoot.querySelector('.parameter-type');
    if (value.type === "array" && value.items.type === "number") {
      parameterTypeField.value = "array-number";
    } else if (value.type === "array" && value.items.type === "string") {
      parameterTypeField.value = "array-string";
    } else {
      parameterTypeField.value = value.type;
    }
  }
}

customElements.define('parameter-item', ParameterItem);

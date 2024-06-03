var uiUtils = (() => {









  class UiElement {



    constructor(element) {
      logUtils.debug('(uiUtils.UiElement.constructor)', {
        element: element
      });
      this.element = element;
    }



  }









  class UiElementInteraction extends UiElement {



    enable() {
      logUtils.debug('(uiUtils.UiElementInteraction.enable)', {
        uiElementInteraction: this
      });
      this.element.disabled = false;
    }



    disable() {
      logUtils.debug('(uiUtils.UiElementInteraction.disable)', {
        uiElementInteraction: this
      });
      this.element.disabled = true;
    }



  }









  class UiElementInput extends UiElementInteraction {



    get name() {
      logUtils.debug('(uiUtils.UiElementInput.name) get', {
        uiElementInput: this
      });
      return this.element.name;
    }



    get isValid() {
      logUtils.debug('(uiUtils.UiElementInput.isValid) get', {
        uiElementInput: this
      });
      return this.element.checkValidity();
    }



    get value() {
      logUtils.debug('(uiUtils.UiElementInput.value) get', {
        uiElementInput: this
      });
      return this.element.value;
    }



    set value(value) {
      logUtils.debug('(uiUtils.UiElementInput.value) set', {
        uiElementInput: this,
        value: value
      });
      this.element.value = value;
    }



  }









  class Button extends UiElementInteraction {



    static fromElementId(elementId) {
      logUtils.debug('(uiUtils.Button.fromElementId)', {
        elementId: elementId
      });
      return new Button(document.getElementById(elementId));
    }



  }









  class Input extends UiElementInput {



    static fromElementId(elementId) {
      logUtils.debug('(uiUtils.Input.fromElementId)', {
        elementId: elementId
      });
      return new Input(document.getElementById(elementId));
    }



    get value() {
      logUtils.debug('(uiUtils.Input.value) get', {
        input: this
      });
      switch(this.element.type) {
        case 'number':
          return parseFloat(super.value);
        case 'checkbox':
          return this.element.checked;
        default:
          return super.value;
      }
    }



    set value(value) {
      logUtils.debug('(uiUtils.Input.value) set', {
        input: this,
        value: value
      });
      switch(this.element.type) {
        case 'checkbox':
          this.element.checked = value;
          break;
        default:
          super.value = value;
          break;
      }
    }



  }









  class Select extends UiElementInput {



    static fromElementId(elementId, configObj={}) {
      logUtils.debug('(uiUtils.Select.fromElementId)', {
        elementId: elementId,
        configObj: configObj
      });
      return new Select(document.getElementById(elementId), configObj);
    }



    constructor(element, configObj={}) {
      logUtils.debug('(uiUtils.Select.constructor)', {
        element: element,
        configObj: configObj
      });
      super(element);
      this.type = element.dataset.uiUtilsType || configObj.type || null;
    }



    get value() {
      logUtils.debug('(uiUtils.Select.value) get', {
        select: this
      });
      switch(this.type) {
        case 'number':
          return parseFloat(super.value);
        default:
          return super.value;
      }
    }



    get text() {
      return (this.element.selectedOptions.length ? this.element.selectedOptions[0].text : null);
    }



  }









  class Form {



    static fromElementIdArr(elementIdArr) {
      logUtils.debug('(uiUtils.Form.fromElementIdArr)', {
        elementIdArr: elementIdArr
      });
      let formObj = {};
      let buttonArr = [];
      elementIdArr.forEach((elementId) => {
        let element = document.getElementById(elementId);
        switch(element.tagName) {
          case 'INPUT':
            let input = new Input(element)
            formObj[input.name] = input;
            break;
          case 'SELECT':
            let select = new Select(element);
            formObj[select.name] = select;
            break;
          case 'BUTTON':
            buttonArr.push(new Button(element));
            break;
          default:
            break;
        }
      });
      return new Form(formObj, buttonArr);
    }



    constructor(formObj, buttonArr) {
      logUtils.debug('(uiUtils.Form.constructor)', {
        formObj: formObj,
        buttonArr: buttonArr
      });
      this.formObj = formObj;
      this.buttonArr = buttonArr;
    }



    enable() {
      logUtils.debug('(uiUtils.Form.enable)', {
        form: this
      });
      Object.values(this.formObj).forEach((uiElementInput) => {
        uiElementInput.enable();
      });
      this.buttonArr.forEach((button) => {
        button.enable();
      });
    }



    disable() {
      logUtils.debug('(uiUtils.Form.disable)', {
        form: this
      });
      Object.values(this.formObj).forEach((uiElementInput) => {
        uiElementInput.disable();
      });
      this.buttonArr.forEach((button) => {
        button.disable();
      });
    }



    get isValid() {
      logUtils.debug('(uiUtils.Form.isValid) get', {
        form: this
      });
      return Object.values(this.formObj).reduce((result, uiElementInput) => {
        return result && uiElementInput.isValid;
      }, true);
    }



    get valueObj() {
      logUtils.debug('(uiUtils.Form.valueObj) get', {
        form: this
      });
      let valueObj = {};
      Object.entries(this.formObj).forEach(([name, uiElementInput]) => {
        valueObj[name] = uiElementInput.value;
      });
      return valueObj;
    }
  }









  class Li extends UiElement {



    static fromElementId(elementId) {
      logUtils.debug('(uiUtils.Li.fromElementId)', {
        elementId: elementId
      });
      return new Li(document.getElementById(elementId));
    }



  }









  class Ul extends UiElement {



    static fromElementId(elementId) {
      logUtils.debug('(uiUtils.Ul.fromElementId)', {
        elementId: elementId
      });
      return new Ul(document.getElementById(elementId));
    }



    loadLiArr(liArr) {
      logUtils.debug('(uiUtils.Ul.loadLiArr)', {
        ul: this,
        liArr: liArr
      });
      this.element.innerHTML = '';
      liArr.forEach((li) => {
        this.element.append(li.element);
      });
    }



  }









  return {
    elementFromConfigObj: (configObj) => {
      let tag = configObj.tag;
      let classArr = configObj.classArr || [];
      let attributeObj = configObj.attributeObj || {};
      let styleObj = configObj.styleObj || {};
      let handlerFnObj = configObj.handlerFnObj || {};
      let childElementArr = configObj.childElementArr || [];
      delete configObj.tag;
      delete configObj.classArr;
      delete configObj.attributeObj;
      delete configObj.styleObj;
      delete configObj.handlerFnObj;
      delete configObj.childElementArr;
      let element = document.createElement(tag);
      Object.entries(configObj).forEach(([key, value]) => {
        element[key] = value;
      });
      element.classList.add(...classArr);
      Object.entries(attributeObj).forEach(([attribute, value]) => {
        element.setAttribute(attribute, value);
      });
      Object.entries(styleObj).forEach(([key, value]) => {
        element.style[key] = value;
      });
      Object.entries(handlerFnObj).forEach(([event, handlerFn]) => {
        element.addEventListener(event, handlerFn);
      });
      childElementArr.forEach((childElement) => {
        element.append(childElement);
      });
      return element;
    },
    elementFromHtml: (html) => {
      let element = document.createElement('div');
      element.innerHTML = html;
      return element.children[0];
    },
    Button: Button,
    Input: Input,
    Select: Select,
    Form: Form,
    Li: Li,
    Ul: Ul
  };
})();

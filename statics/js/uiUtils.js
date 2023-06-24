var uiUtils = (() => {



  class Element {
    constructor(element) {
      logUtils.debug('(uiUtils.Element.constructor)', element);
      this.element = element;
    }
  }



  class ElementInteraction extends Element {
    enable() {
      logUtils.debug('(uiUtils.ElementInteraction.enable)');
      this.element.disabled = false;
    }
    disable() {
      logUtils.debug('(uiUtils.ElementInteraction.disable)');
      this.element.disabled = true;
    }
  }



  class ElementInput extends ElementInteraction {
    get name() {
      logUtils.debug('(uiUtils.ElementInput.name) get');
      return this.element.name;
    }
    get isValid() {
      logUtils.debug('(uiUtils.ElementInput.isValid) get');
      return this.element.checkValidity();
    }
    get value() {
      logUtils.debug('(uiUtils.ElementInput.value) get');
      return this.element.value;
    }
    set value(value) {
      logUtils.debug('(uiUtils.ElementInput.value) set', value);
      this.element.value = value;
    }
  }



  class Button extends ElementInteraction {
    static fromElementId(elementId) {
      logUtils.debug('(uiUtils.Button.fromElementId)', elementId);
      return new Button(document.getElementById(elementId));
    }
  }



  class Input extends ElementInput {
    static fromElementId(elementId) {
      logUtils.debug('(uiUtils.Input.fromElementId)', elementId);
      return new Input(document.getElementById(elementId));
    }
    get value() {
      logUtils.debug('(uiUtils.Input.value) get');
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
      logUtils.debug('(uiUtils.Input.value) set', value);
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



  class Select extends ElementInput {
    static fromElementId(elementId, configObj={}) {
      logUtils.debug('(uiUtils.Select.fromElementId)', {
        elementId: elementId,
        configObj: configObj
      });
      return new Select(document.getElementById(elementId), configObj);
    }
    constructor(element, configObj={}) {
      logUtils.debug('(uiUtils.Select.constructor)', {
        elementId: elementId,
        configObj: configObj
      });
      super(element);
      this.type = element.getAttribute('uiutils-type') || configObj.type || null;
    }
    get value() {
      logUtils.debug('(uiUtils.Select.value) get');
      switch(this.type) {
        case 'number':
          return parseFloat(super.value);
        default:
          return super.value;
      }
    }
  }



  class Form {
    static fromElementIdArr(elementIdArr) {
      logUtils.debug('(uiUtils.Form.fromElementIdArr)', elementIdArr);
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
      logUtils.debug('(uiUtils.Form.enable)');
      Object.values(this.formObj).forEach((element) => {
        element.enable();
      });
      this.buttonArr.forEach((element) => {
        element.enable();
      });
    }
    disable() {
      logUtils.debug('(uiUtils.Form.disable)');
      Object.values(this.formObj).forEach((element) => {
        element.disable();
      });
      this.buttonArr.forEach((element) => {
        element.disable();
      });
    }
    get isValid() {
      logUtils.debug('(uiUtils.Form.isValid) get');
      return Object.values(this.formObj).reduce((returnValue, element) => {
        return returnValue && element.isValid;
      }, true);
    }
    get valueObj() {
      logUtils.debug('(uiUtils.Form.valueObj) get');
      let valueObj = {};
      Object.entries(this.formObj).forEach(([name, element]) => {
        valueObj[name] = element.value;
      });
      return valueObj;
    }
  }



  class Li extends Element {
    static fromElementId(elementId) {
      logUtils.debug('(uiUtils.Li.fromElementId)', elementId);
      return new Li(document.getElementById(elementId));
    }
  }



  class Ul extends Element {
    static fromElementId(elementId) {
      logUtils.debug('(uiUtils.Ul.fromElementId)', elementId);
      return new Ul(document.getElementById(elementId));
    }
    loadLiArr(liArr) {
      logUtils.debug('(uiUtils.Ul.loadLiArr)', liArr);
      this.element.innerHTML = '';
      liArr.map((li) => {
        return li.element;
      }).forEach((element) => {
        this.element.append(element);
      });
    }
  }



  return {
    Button: Button,
    Input: Input,
    Select: Select,
    Form: Form,
    Li: Li,
    Ul: Ul
  };
})();

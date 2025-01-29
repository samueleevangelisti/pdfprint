/*
This module is from samueva97.
Do not modify it
*/
import '/statics/js/logModule.js';
import '/statics/js/uiModule.js';
import '/statics/js/mustacheModule.js';



window.bootstrapUtils = (() => {









  class Button extends uiUtils.Button {



    static fromElementId(elementId) {
      logUtils.debug('(bootstrapUtils.Button.fromElementId)', {
        elementId: elementId
      });
      return new Button(document.getElementById(elementId));
    }



  }









  class Input extends uiUtils.Input {



    static fromElementId(elementId) {
      logUtils.debug('(bootstrapUtils.Input.fromElementId)', {
        elementId: elementId
      });
      return new Input(document.getElementById(elementId));
    }



    get isValid() {
      logUtils.debug('(bootstrapUtils.Input.isValid) get', {
        Input: this
      });
      this.element.classList.remove('is-invalid');
      if(!super.isValid) {
        this.element.classList.add('is-invalid');
      }
      return super.isValid;
    }



    set isValid(isValid) {
      logUtils.debug('(bootstrapUtils.Input.isValid) set', {
        Input: this,
        isValid: isValid
      });
      this.element.classList.remove('is-invalid');
      if(!isValid) {
        this.element.classList.add('is-invalid')
      }
    }



  }









  class Select extends uiUtils.Select {



    static fromElementId(elementId, configsObj={}) {
      logUtils.debug('(bootstrapUtils.Select.fromElementId)', {
        elementId: elementId,
        configsObj: configsObj
      });
      return new Select(document.getElementById(elementId), configsObj);
    }



    get isValid() {
      logUtils.debug('(bootstrapUtils.Input.isValid) get', {
        Input: this
      });
      this.element.classList.remove('is-invalid');
      if(!super.isValid) {
        this.element.classList.add('is-invalid');
      }
      return super.isValid;
    }



    set isValid(isValid) {
      logUtils.debug('(bootstrapUtils.Input.isValid) set', {
        Input: this,
        isValid: isValid
      });
      this.element.classList.remove('is-invalid');
      if(!isValid) {
        this.element.classList.add('is-invalid')
      }
    }



  }









  class Form extends uiUtils.Form {



    static fromElementIdArr(elementIdArr) {
      logUtils.debug('(bootstrapUtils.Form.fromElementIdArr)', {
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



    get isValid() {
      logUtils.debug('(bootstrapUtils.Form.isValid) get', {
        form: this
      });
      return Object.values(this.formObj).map((uiElementInput) => {
        return uiElementInput.isValid;
      }).every((isValid) => {
        return isValid;
      });
    }



  }









  class Tab {



    static show(elementId) {
      logUtils.debug('(bootstrapUtils.Tab.show)', {
        elementId: elementId
      });
      new bootstrap.Tab(`#${elementId}`).show();
    }



  }









  class Modal {



    static show(modalElement) {
      logUtils.debug('(bootstrapUtils.Modal.show)', {
        modalElement: modalElement
      });
      new bootstrap.Modal(modalElement).show();
    }



  }









  class Alert {



    static template = `
      <div class="modal fade" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header{{#background}} bg-{{background}}{{/background}}">
              <h1 class="modal-title fs-5">{{title}}</h1>
            </div>
            <div class="modal-body">
              {{message}}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-{{button}}" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    static isShow = false;
    static modalElementArr = [];
    static modalArr = [];



    static show(type, title, message, onCloseFn=null) {
      logUtils.debug('(bootstrapUtils.Alert.show)', {
        type: type,
        title: title,
        message: message
      });

      let modalElement = uiUtils.elementFromHtml(mustache.render(Alert.template, {
        background: type,
        button: type || 'secondary',
        title: title,
        message: message
      }));
      modalElement.addEventListener('hidden.bs.modal', (event) => {
        logUtils.debug('(bootstrapUtils.Alert.show.hidden.bs.modal)', {
          event: event
        });
        if(onCloseFn) {
          onCloseFn();
        }
        if(!bootstrapUtils.Alert.modalElementArr.length) {
          bootstrapUtils.Alert.isShow = false;
          return;
        }
        bootstrapUtils.Modal.show(bootstrapUtils.Alert.modalElementArr.shift());
      });
      if(bootstrapUtils.Alert.isShow) {
        bootstrapUtils.Alert.modalElementArr.push(modalElement);
        return;
      }
      bootstrapUtils.Alert.isShow = true;
      bootstrapUtils.Modal.show(modalElement);
    }



    static error(message, onCloseFn=null) {
      logUtils.debug('(bootstrapUtils.Alert.error)', {
        message: message
      });
      Alert.show('danger', 'Error', message, onCloseFn);
    }



    static warning(message, onCloseFn=null) {
      logUtils.debug('(bootstrapUtils.Alert.warning)', {
        message: message
      });
      Alert.show('warning', 'Warning', message, onCloseFn);
    }



    static success(message, onCloseFn=null) {
      logUtils.debug('(bootstrapUtils.Alert.success)', {
        message: message
      });
      Alert.show('success', 'Success', message, onCloseFn);
    }



    static info(message, onCloseFn=null) {
      logUtils.debug('(bootstrapUtils.Alert.info)', {
        message: message
      });
      Alert.show(null, 'Info', message, onCloseFn);
    }



  }









  return {
    Button: Button,
    Input: Input,
    Select: Select,
    Form: Form,
    Tab: Tab,
    Modal: Modal,
    Alert: Alert
  }



})();

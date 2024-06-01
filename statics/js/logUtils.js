var logUtils = {



  _configs: logUtilsConfigs,



  _log: function(text, type, paramObj) {
    switch(type) {
      case 'log':
        console.log(`%c[${new Date().toISOString()}]`, 'color: blue', text);
        if(paramObj) {
          console.log(paramObj);
        }
        break;
      case 'warning':
        console.warn(`%c[${new Date().toISOString()}]`, 'color: blue', text);
        if(paramObj) {
          console.warn(paramObj);
        }
        break;
      case 'error':
        console.error(`%c[${new Date().toISOString()}]`, 'color: blue', text);
        if(paramObj) {
          console.error(paramObj);
        }
        break;
      default:
        break;
    }
  },



  debug: function(log, paramObj=null) {
    if(this._configs.isDebug) {
      this._log(`(DEBUG) ${log}`, 'log', paramObj);
    }
  },



  info: function(log, paramObj=null) {
    if(this._configs.isInfo) {
      this._log(`(INFO) ${log}`, 'log', paramObj);
    }
  },



  success: function(log, paramObj=null) {
    if(this._configs.isSuccess) {
      this._log(`(SUCCESS) ${log}`, 'log', paramObj);
    }
  },



  warning: function(log, paramObj=null) {
    if(this._configs.isWarning) {
      this._log(`(WARNING) ${log}`, 'warning', paramObj);
    }
  },



  error: function(log, paramObj=null) {
    if(this._configs.isError) {
      this._log(`(ERROR) ${log}`, 'error', paramObj);
    }
  }
};

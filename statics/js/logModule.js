/*
This module is from samueva97.
Do not modify it
*/
import '/statics/js/configs/logModule/configs.js';



window.logUtils = {



  _log: (text, type, paramObj) => {
    switch(type) {
      case 'log':
        console.log(`%c[${new Date().toISOString()}]`, 'color: grey', text);
        if(paramObj) {
          console.log(paramObj);
        }
        break;
      case 'warning':
        console.warn(`%c[${new Date().toISOString()}]`, 'color: grey', text);
        if(paramObj) {
          console.warn(paramObj);
        }
        break;
      case 'error':
        console.error(`%c[${new Date().toISOString()}]`, 'color: grey', text);
        if(paramObj) {
          console.error(paramObj);
        }
        break;
      default:
        break;
    }
  },



  debug: (log, paramObj=null) => {
    if(logUtilsConfigs.isDebug) {
      logUtils._log(`(DEBUG) ${log}`, 'log', paramObj);
    }
  },



  info: (log, paramObj=null) => {
    if(logUtilsConfigs.isInfo) {
      logUtils._log(`(INFO) ${log}`, 'log', paramObj);
    }
  },



  success: (log, paramObj=null) => {
    if(logUtilsConfigs.isSuccess) {
      logUtils._log(`(SUCCESS) ${log}`, 'log', paramObj);
    }
  },



  warning: (log, paramObj=null) => {
    if(logUtilsConfigs.isWarning) {
      logUtils._log(`(WARNING) ${log}`, 'warning', paramObj);
    }
  },



  error: (log, paramObj=null) => {
    if(logUtilsConfigs.isError) {
      logUtils._log(`(ERROR) ${log}`, 'error', paramObj);
    }
  }
};

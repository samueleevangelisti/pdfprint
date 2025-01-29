/*
This module is from samueva97.
Do not modify it
*/
import '/statics/js/configs/ajaxModule/configs.js';
import '/statics/js/logModule.js';
import '/statics/js/localStorageModule.js';



window.ajaxUtils = {



  _request: (method, url, bodyObj, headersObj, isJson, isLogin) => {
    logUtils.debug('(ajaxUtils._request)', {
      method: method,
      url: url,
      bodyObj: bodyObj,
      headersObj: headersObj
    });
    return new Promise((resolve, reject) => {
      if(ajaxUtilsConfigs.isAuthentication && isLogin) {
        if(!navigator.userAgentData) {
          localStorageUtils.storeInfo(`{"userAgent": "${navigator.userAgent}"}`);
          resolve();
          return;
        }
        if(!navigator.userAgentData.getHighEntropyValues) {
          localStorageUtils.storeInfo(`{"platform": "${navigator.userAgentData.platform}", "mobile": ${navigator.userAgentData.mobile}, "brands": [${navigator.userAgentData.brands.map((brandObj) => {
            return `{"brand": "${brandObj.brand}", "version": "${brandObj.version}"}`;
          }).join(', ')}], "userAgent": "${navigator.userAgent}"}`);
          resolve();
          return;
        }
        navigator.userAgentData.getHighEntropyValues([
          'model',
          'architecture',
          'bitness',
          'platform',
          'platformVersion',
          'uaFullVersion',
          'fullVersionList'
        ]).then((data) => {
          localStorageUtils.storeInfo(`{"model": "${data.model}", "architecture": "${data.architecture}", "bitness": "${data.bitness}", "platform": "${data.platform}", "platformVersion": "${data.platformVersion}", "uaFullVersion": "${data.uaFullVersion}", "fullVersionList": [${data.fullVersionList.map((fullVersionObj) => {
            return `{"brand": "${fullVersionObj.brand}", "version": "${fullVersionObj.version}"}`;
          }).join(', ')}], "userAgent": "${navigator.userAgent}"}`);
          resolve();
        });
        return;
      }
      resolve();
    }).then(() => {
      let optionsObj = {
        method: method,
        headers: headersObj,
        body: (bodyObj ? JSON.stringify(bodyObj) : null),
      }
      if(ajaxUtilsConfigs.isAuthentication) {
        optionsObj.headers[ajaxUtilsConfigs.idHeader] = localStorageUtils.retrieveId();
        optionsObj.headers[ajaxUtilsConfigs.tokenHeader] = localStorageUtils.retrieveToken();
        optionsObj.headers[ajaxUtilsConfigs.infoHeader] = localStorageUtils.retrieveInfo();
      }
      return fetch(url, optionsObj).then((response) => {
        logUtils.debug('(ajaxUtils._request)', {
          response: response
        });
        if(isLogin) {
          localStorageUtils.storeId(response.headers.get(ajaxUtilsConfigs.idHeader));
          localStorageUtils.storeToken(response.headers.get(ajaxUtilsConfigs.tokenHeader));
        }
        if(isJson) {
          return response.json();
        }
        return response.text();
      });
    });
  },



  get: (url) => {
    logUtils.debug('(ajaxUtils.get)', {
      url: url
    });
    return ajaxUtils._request('GET', url, null, {}, true, false);
  },



  getFile: (url) => {
    logUtils.debug('(ajaxUtils.getFile)', {
      url: url
    });
    return ajaxUtils._request('GET', url, null, {}, false, false);
  },



  post: (url, bodyObj) => {
    logUtils.debug('(ajaxUtils.post)', {
      url: url,
      bodyObj: bodyObj
    });
    return ajaxUtils._request('POST', url, bodyObj, {
      'Content-Type': 'application/json'
    }, true, false);
  },



  postLogin: (url, bodyObj) => {
    logUtils.debug('(ajaxUtils.postLogin)', {
      url: url,
      bodyObj: bodyObj
    });
    return ajaxUtils._request('POST', url, bodyObj, {
      'Content-Type': 'application/json'
    }, true, true);
  },



  put: (url, bodyObj) => {
    logUtils.debug('(ajaxUtils.put)', {
      url: url,
      bodyObj: bodyObj
    });
    return ajaxUtils._request('PUT', url, bodyObj, {
      'Content-Type': 'application/json'
    }, true, false);
  },



  patch: (url, bodyObj) => {
    logUtils.debug('(ajaxUtils.patch)', {
      url: url,
      bodyObj: bodyObj
    });
    return ajaxUtils._request('PATCH', url, bodyObj, {
      'Content-Type': 'application/json'
    }, true, false);
  },



  delete: (url, bodyObj) => {
    logUtils.debug('(ajaxUtils.delete)', {
      url: url,
      bodyObj: bodyObj
    });
    return ajaxUtils._request('DELETE', url, bodyObj, {
      'Content-Type': 'application/json'
    }, true, false);
  }
};

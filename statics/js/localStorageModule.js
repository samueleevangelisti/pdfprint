/*
This module is from samueva97.
Do not modify it
*/
import '/statics/js/configs/localStorageModule/configs.js';
import '/statics/js/logModule.js';



window.localStorageUtils = {



  store: (key, value) => {
    logUtils.debug('(localstorageUtils.store)', {
      key: key,
      value: value
    });
    localStorage.setItem(key, JSON.stringify(value));
  },



  retrieve: (key) => {
    logUtils.debug('(localstorageUtils.retrieve)', {
      key: key
    });
    return JSON.parse(localStorage.getItem(key));
  },



  delete: (key) => {
    logUtils.debug('(localstorageUtils.delete)', {
      key: key
    });
    localStorage.removeItem(key)
  },



  clear: () => {
    logUtils.debug('(localstorageUtils.clear)');
    localStorage.clear();
  },



  storeId: (id) => {
    logUtils.debug('(localstorageUtils.storeId)', {
      id: id
    });
    localStorageUtils.store(localStorageUtilsConfigs.idKey, id);
  },



  retrieveId: () => {
    logUtils.debug('(localstorageUtils.retrieveId)');
    return localStorageUtils.retrieve(localStorageUtilsConfigs.idKey);
  },



  deleteId: () => {
    logUtils.debug('(localstorageUtils.deleteId)');
    localStorageUtils.delete(localStorageUtilsConfigs.idKey);
  },



  storeToken: (token) => {
    logUtils.debug('(localstorageUtils.storeToken)', {
      token: token
    });
    localStorageUtils.store(localStorageUtilsConfigs.tokenKey, token);
  },



  retrieveToken: () => {
    logUtils.debug('(localstorageUtils.retrieveToken)');
    return localStorageUtils.retrieve(localStorageUtilsConfigs.tokenKey);
  },



  deleteToken: () => {
    logUtils.debug('(localstorageUtils.deleteToken)');
    localStorageUtils.delete(localStorageUtilsConfigs.tokenKey);
  },



  storeInfo: (info) => {
    logUtils.debug('(localStorageUtils.storeInfo)', {
      info: info
    });
    localStorageUtils.store(localStorageUtilsConfigs.infoKey, info);
  },



  retrieveInfo: () => {
    logUtils.debug('(localStorageUtils.retrieveInfo)');
    return localStorageUtils.retrieve(localStorageUtilsConfigs.infoKey);
  },



  deleteInfo: () => {
    logUtils.debug('(localStorageUtils.deleteInfo)');
    localStorageUtils.delete(localStorageUtilsConfigs.infoKey);
  }



};

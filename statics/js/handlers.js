var handlers = {
  fileInputOnChange: (event) => {
    logUtils.debug('(handlers.fileInputOnChange)', event);
    globals.fileForm.disable();
    globals.fileArr = globals.fileArr.concat(Array.from(event.target.files));
    event.target.value = null;
    globals.fileArrUl.loadLiArr(globals.fileArr.map((file, index) => {
      return new uiUtils.Li(uis.createLiElement(file, index));
    }));
    globals.fileForm.enable();
  },
  creaFronteRetroButtonOnClick: (event) => {
    logUtils.debug('(handlers.caricaButtonOnClick)', event);
    Promise.all(globals.fileArr.map((file) => {
      return convertUtils.fileToBase64(file);
    }))
      .then((responseArr) => {
        logUtils.debug('(handlers.caricaButtonOnClick)', responseArr);
        ajaxUtils.post('/load', responseArr)
          .then((response) => {
            if(response.success) {
              logUtils.debug('(handlers.caricaButtonOnClick)', response);
              file_name = (globals.fileArr.length == 1 ? globals.fileArr[0].name : `${new Date().toISOString().slice(0, 19)}.pdf`);
              convertUtils.base64ToPdf(response.data.fronte, `fronte-${file_name}`);
              convertUtils.base64ToPdf(response.data.retro, `retro-${file_name}`);
            } else {
              logUtils.error('(handlers.caricaButtonOnClick)', response);
              alert(JSON.stringify(response, null, 2));
            }
          })
          .catch((error) => {
            logUtils.debug('(handlers.caricaButtonOnClick)', error);
            alert(JSON.stringify(error, null, 2));
          });
      })
      .catch((error) => {
        logUtils.error('(handlers.caricaButtonOnClick)', error);
        alert(JSON.stringify(error, null, 2));
      });
  },
  chiudiButtonOnClick: (event) => {
    logUtils.debug('(handlers.chiudiButtonOnClick)');
    ajaxUtils.post('/shutdown')
      .then((response) => {
        if(response.success) {
          logUtils.debug('(handlers.chiudiButtonOnClick)', response);
          window.close();
        } else {
          logUtils.error('(handlers.chiudiButtonOnClick)', response);
          alert(JSON.stringify(response, null, 2));
        }
      })
      .catch((error) => {
        logUtils.debug('(handlers.chiudiButtonOnClick)', error);
        alert(JSON.stringify(error, null, 2));
      });
  },
  _sposta(indexOld, indexNew) {
    logUtils.debug('(handlers._sposta)', {
      indexOld: indexOld,
      indexNew: indexNew
    });
    if(indexNew < 0) {
      indexNew = 0;
    } else if(indexNew >= globals.fileArr.length) {
      indexNew = globals.fileArr.length - 1;
    }
    globals.fileArr.splice(indexNew, 0, globals.fileArr.splice(indexOld, 1)[0]);
    globals.fileArrUl.loadLiArr(globals.fileArr.map((file, index) => {
      return new uiUtils.Li(uis.createLiElement(file, index));
    }));
  },
  indexInputOnChange: (event, index) => {
    logUtils.debug('(handlers.indexInputOnChange)', {
      event: event,
      index: index
    });
    handlers._sposta(index, event.target.value - 1);
  },
  _spostaButtonOnClick: (index, delta) => {
    logUtils.debug('(handlers._spostaButtonOnClick)', {
      index: index,
      delta: delta
    });
    handlers._sposta(index, index + delta);
  },
  spostaSuButtonOnClick: (event, index) => {
    logUtils.debug('(handlers.spostaSuButtonOnClick)', {
      event: event,
      index: index
    });
    handlers._spostaButtonOnClick(index, -1);
  },
  spostaGiuButtonOnClick: (event, index) => {
    logUtils.debug('(handlers.spostaGiuButtonOnClick)', {
      event: event,
      index: index
    });
    handlers._spostaButtonOnClick(index, 1);
  },
  rimuoviButtonOnClick: (event, index) => {
    logUtils.debug('(handlers.rimuoviButtonOnClick)', {
      event: event,
      index: index
    });
    globals.fileArr.splice(index, 1);
    globals.fileArrUl.loadLiArr(globals.fileArr.map((file, index) => {
      return new uiUtils.Li(uis.createLiElement(file, index));
    }));
  }
};

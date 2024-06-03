var handlers = {



  fileInputOnChange: (event) => {
    logUtils.debug('(handlers.fileInputOnChange)', {
      event: event
    });
    globals.fileForm.disable();
    globals.fileArr = globals.fileArr.concat(Array.from(event.target.files));
    event.target.value = null;
    globals.fileArrUl.loadLiArr(globals.fileArr.map((file, index) => {
      return new uiUtils.Li(uiUtils.elementFromHtml(mustache.render(document.getElementById('file-li-template').innerHTML, {
        index: index,
        isFirst: index == 0,
        isLast: index == globals.fileArr.length - 1,
        fileName: file.name
      })));
    }));
    globals.fileForm.enable();
  },



  creaUnicoPdfButtonOnClick: (event) => {
    logUtils.debug('(handlers.creaUnicoPdfButtonOnClick)', {
      event: event
    });
    globals.fileForm.disable();
    document.getElementById('unico-pdf-nav-item').hidden = false;
    document.getElementById('fronte-nav-item').hidden = true;
    document.getElementById('retro-nav-item').hidden = true;
    let unicoPdfTabPaneElement = document.getElementById('unico-pdf-tab-pane');
    unicoPdfTabPaneElement.innerHTML = '';
    document.getElementById('fronte-tab-pane').innerHTML = '';
    document.getElementById('retro-tab-pane').innerHTML = '';
    new bootstrap.Tab(document.getElementById('unico-pdf-tab-button')).show();
    Promise.all(globals.fileArr.map((file) => {
      return convertUtils.fileToBase64(file);
    })).then((responseArr) => {
      logUtils.debug('(handlers.creaUnicoPdfButtonOnClick)', {
        responseArr: responseArr
      });
      ajaxUtils.post('/merge', responseArr).then((response) => {
        if(!response.success) {
          logUtils.error('(handlers.creaUnicoPdfButtonOnClick)', {
            response: response
          });
          alert(JSON.stringify(response, null, 2));
          return;
        }
        logUtils.debug('(handlers.creaUnicoPdfButtonOnClick)', {
          response: response
        });
        unicoPdfTabPaneElement.append(uiUtils.elementFromHtml(mustache.render(document.getElementById('pdf-embed-template').innerHTML, {
          src: `data:application/pdf;base64,${response.data}#zoom=100`
        })));
      }).catch((error) => {
        logUtils.error('(handlers.creaUnicoPdfButtonOnClick)', {
          error: error
        });
        alert(JSON.stringify(error, null, 2));
      });
    }).catch((error) => {
      logUtils.error('(handlers.creaUnicoPdfButtonOnClick)', {
        error: error
      });
      alert(JSON.stringify(error, null, 2));
    }).finally(() => {
      globals.fileForm.enable();
    });
  },



  creaFronteRetroButtonOnClick: (event) => {
    logUtils.debug('(handlers.creaFronteRetroButtonOnClick)', {
      event: event
    });
    globals.fileForm.disable();
    document.getElementById('unico-pdf-nav-item').hidden = true;
    document.getElementById('fronte-nav-item').hidden = false;
    document.getElementById('retro-nav-item').hidden = false;
    document.getElementById('unico-pdf-tab-pane').innerHTML = '';
    let fronteTabPaneElement = document.getElementById('fronte-tab-pane');
    fronteTabPaneElement.innerHTML = '';
    let retroTabPaneElement = document.getElementById('retro-tab-pane');
    retroTabPaneElement.innerHTML = '';
    new bootstrap.Tab(document.getElementById('fronte-tab-button')).show();
    Promise.all(globals.fileArr.map((file) => {
      return convertUtils.fileToBase64(file);
    })).then((responseArr) => {
      logUtils.debug('(handlers.creaFronteRetroButtonOnClick)', {
        responseArr: responseArr
      });
      ajaxUtils.post('/split', responseArr).then((response) => {
        if(!response.success) {
          logUtils.error('(handlers.creaFronteRetroButtonOnClick)', {
            response: response
          });
          alert(JSON.stringify(response, null, 2));
          return;
        }
        logUtils.debug('(handlers.creaFronteRetroButtonOnClick)', {
          response: response
        });
        fronteTabPaneElement.append(uiUtils.elementFromHtml(mustache.render(document.getElementById('pdf-embed-template').innerHTML, {
          src: `data:application/pdf;base64,${response.data.fronte}#zoom=100`
        })));
        retroTabPaneElement.append(uiUtils.elementFromHtml(mustache.render(document.getElementById('pdf-embed-template').innerHTML, {
          src: `data:application/pdf;base64,${response.data.retro}#zoom=100`
        })));
      }).catch((error) => {
        logUtils.debug('(handlers.creaFronteRetroButtonOnClick)', {
          error: error
        });
        alert(JSON.stringify(error, null, 2));
      });
    }).catch((error) => {
      logUtils.error('(handlers.creaFronteRetroButtonOnClick)', {
        error: error
      });
      alert(JSON.stringify(error, null, 2));
    }).finally(() => {
      globals.fileForm.enable();
    });
  },



  chiudiButtonOnClick: (event) => {
    logUtils.debug('(handlers.chiudiButtonOnClick)', {
      event: event
    });
    ajaxUtils.post('/shutdown').then((response) => {
      if(!response.success) {
        logUtils.error('(handlers.chiudiButtonOnClick)', {
          response: response
        });
        alert(JSON.stringify(response, null, 2));
        return;
      }
      logUtils.debug('(handlers.chiudiButtonOnClick)', {
        response: response
      });
      window.close();
    }).catch((error) => {
      logUtils.error('(handlers.chiudiButtonOnClick)', {
        error: error
      });
      alert(JSON.stringify(error, null, 2));
    });
  },



  _spostaButtonOnClick: (index, delta) => {
    logUtils.debug('(handlers._spostaButtonOnClick)', {
      index: index,
      delta: delta
    });
    globals.fileArr.splice(index + delta, 0, globals.fileArr.splice(index, 1)[0]);
    globals.fileArrUl.loadLiArr(globals.fileArr.map((file, index) => {
      return new uiUtils.Li(uiUtils.elementFromHtml(mustache.render(document.getElementById('file-li-template').innerHTML, {
        index: index,
        isFirst: index == 0,
        isLast: index == globals.fileArr.length - 1,
        fileName: file.name
      })));
    }));
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
      return new uiUtils.Li(uiUtils.elementFromHtml(mustache.render(document.getElementById('file-li-template').innerHTML, {
        index: index,
        isFirst: index == 0,
        isLast: index == globals.fileArr.length - 1,
        fileName: file.name
      })));
    }));
  }
};

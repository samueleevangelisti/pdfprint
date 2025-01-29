var handlers = {



  fileInputOnChange: (event) => {
    logUtils.debug('(handlers.fileInputOnChange)', {
      event: event
    });
    globals.fileForm.disable();
    globals.uniquePdfBase64 = null;
    globals.frontBackBase64.front = null;
    globals.frontBackBase64.back = null;
    globals.frontBackDownloadDate = null;
    // TODO DSE le utils dell'interfaccia dovrebbero poter leggere correttamente anche i file come input
    globals.pdfFileArr.push(...Array.from(event.target.files).map((file) => {
      return new PdfFile(file, true, null, null);
    }));
    event.target.value = null;
    uis.refresh();
    globals.fileForm.enable();
  },



  _spostaButtonOnClick: (event, delta) => {
    logUtils.debug('(handlers._spostaButtonOnClick)', {
      event: event,
      delta: delta
    });
    globals.uniquePdfBase64 = null;
    globals.frontBackBase64.front = null;
    globals.frontBackBase64.back = null;
    globals.frontBackDownloadDate = null;
    let index = Array.from(event.target.closest('ol').children).indexOf(event.target.closest('li'));
    globals.pdfFileArr.splice(index + delta, 0, globals.pdfFileArr.splice(index, 1)[0]);
    uis.refresh();
  },



  spostaSuButtonOnClick: (event) => {
    logUtils.debug('(handlers.spostaSuButtonOnClick)', {
      event: event
    });
    handlers._spostaButtonOnClick(event, -1);
  },



  spostaGiuButtonOnClick: (event) => {
    logUtils.debug('(handlers.spostaGiuButtonOnClick)', {
      event: event
    });
    handlers._spostaButtonOnClick(event, 1);
  },



  allPagesCheckboxOnChange: (event) => {
    logUtils.debug('(handlers.allPagesCheckboxOnChange)');
    // TODO DSE qui bisogna metterci la funzione corretta
  },



  rimuoviButtonOnClick: (event) => {
    logUtils.debug('(handlers.rimuoviButtonOnClick)', {
      event: event
    });
    globals.uniquePdfBase64 = null;
    globals.frontBackBase64.front = null;
    globals.frontBackBase64.back = null;
    globals.frontBackDownloadDate = null;
    globals.pdfFileArr.splice(Array.from(event.target.closest('ol').children).indexOf(event.target.closest('li')), 1);
    uis.refresh();
  },



  createUniquePdfButtonOnClick: (event) => {
    logUtils.debug('(handlers.createUniquePdfButtonOnClick)', {
      event: event
    });
    globals.fileForm.disable();
    Promise.all(globals.pdfFileArr.map((pdfFile) => {
      return convertUtils.fileToBase64(pdfFile.file);
    })).then((responseArr) => {
      logUtils.debug('(handlers.createUniquePdfButtonOnClick)', {
        responseArr: responseArr
      });
      ajaxUtils.post('/merge', responseArr).then((response) => {
        if(!response.success) {
          logUtils.error('(handlers.createUniquePdfButtonOnClick)', {
            response: response
          });
          alert(response.error_str);
          return;
        }
        logUtils.debug('(handlers.createUniquePdfButtonOnClick)', {
          response: response
        });
        globals.uniquePdfBase64 = response.data;
      }).catch((error) => {
        logUtils.error('(handlers.createUniquePdfButtonOnClick)', {
          error: error
        });
        alert(error.toString());
      }).finally(() => {
        logUtils.debug('(handlers.createUniquePdfButtonOnClick)');
        uis.refreshButtons();
        globals.fileForm.enable();
      });
    }).catch((error) => {
      logUtils.error('(handlers.createUniquePdfButtonOnClick)', {
        error: error
      });
      alert(error.toString());
      uis.refreshButtons();
      globals.fileForm.enable();
    });
  },



  viewUniquePdfButtonOnClick: (event) => {
    logUtils.debug('(viewUniquePdfButtonOnClick)', {
      event: event
    });
    alert('Funzionalità non supportata');
  },



  downloadUniquePdfButtonOnClick: (event) => {
    logUtils.debug('(handlers.downloadUniquePdfButtonOnClick)', {
      event: event
    });
    convertUtils.base64ToPdf(globals.uniquePdfBase64, `documento_${new Date().toISOString()}.pdf`);
  },



  createFrontBackButtonOnClick: (event) => {
    logUtils.debug('(handlers.createFrontBackButtonOnClick)', {
      event: event
    });
    globals.fileForm.disable();
    Promise.all(globals.pdfFileArr.map((pdfFile) => {
      return convertUtils.fileToBase64(pdfFile.file);
    })).then((responseArr) => {
      logUtils.debug('(handlers.createFrontBackButtonOnClick)', {
        responseArr: responseArr
      });
      ajaxUtils.post('/split', responseArr).then((response) => {
        if(!response.success) {
          logUtils.error('(handlers.createFrontBackButtonOnClick)', {
            response: response
          });
          alert(response.error_str);
          return;
        }
        logUtils.debug('(handlers.createFrontBackButtonOnClick)', {
          response: response
        });
        globals.frontBackBase64.front = response.data.front;
        globals.frontBackBase64.back = response.data.back;
      }).catch((error) => {
        logUtils.debug('(handlers.createFrontBackButtonOnClick)', {
          error: error
        });
        alert(error.toString());
      }).finally(() => {
        logUtils.debug('(handlers.createFrontBackButtonOnClick)');
        uis.refreshButtons();
        globals.fileForm.enable();
      });
    }).catch((error) => {
      logUtils.error('(handlers.createFrontBackButtonOnClick)', {
        error: error
      });
      alert(error.toString());
      uis.refreshButtons();
      globals.fileForm.enable();
    });
  },



  viewFrontButtonOnClick: (event) => {
    logUtils.debug('(viewFrontButtonOnClick)', {
      event: event
    });
    alert('Funzionalità non supportata');
  },



  viewBackButtonOnClick: (event) => {
    logUtils.debug('(viewBackButtonOnClick)', {
      event: event
    });
    alert('Funzionalità non supportata');
  },



  downloadFrontButtonOnClick: (event) => {
    logUtils.debug('(handlers.downloadFrontButtonOnClick)', {
      event: event
    });
    globals.frontBackDownloadDate = globals.frontBackDownloadDate || new Date();
    convertUtils.base64ToPdf(globals.frontBackBase64.front, `fronte_${(globals.pdfFileArr.length == 1 ? globals.pdfFileArr[0].file.name.split('.').slice(0, -1).join('.') : globals.frontBackDownloadDate.toISOString())}.pdf`);
  },



  downloadBackButtonOnClick: (event) => {
    logUtils.debug('(handlers.downloadBackButtonOnClick)', {
      event: event
    });
    globals.frontBackDownloadDate = globals.frontBackDownloadDate || new Date();
    convertUtils.base64ToPdf(globals.frontBackBase64.back, `retro_${(globals.pdfFileArr.length == 1 ? globals.pdfFileArr[0].file.name.split('.').slice(0, -1).join('.') : globals.frontBackDownloadDate.toISOString())}.pdf`);
  }



};

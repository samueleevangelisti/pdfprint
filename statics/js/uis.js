var uis = {



  refreshFileOl: () => {
    logUtils.debug('(uis.refreshFileOl)');
    document.getElementById('file-ol-div').innerHTML = mustache.render(document.getElementById('file-ol-template').innerHTML, globals.pdfFileArr.map((pdfFile, index) => {
      return {
        isFirst: index == 0,
        isLast: index == globals.pdfFileArr.length - 1,
        fileName: pdfFile.file.name,
        isAllPages: pdfFile.isAllPages,
        firstPage: pdfFile.firstPage,
        lastPage: pdfFile.lastPage
      };
    }));
  },



  refreshButtons: () => {
    logUtils.debug('(uis.refreshButtons)');
    if(globals.uniquePdfBase64) {
      globals.viewUniquePdfButton.enable();
      globals.downloadUniquePdfButton.enable();
    } else {
      globals.viewUniquePdfButton.disable();
      globals.downloadUniquePdfButton.disable();
    }
    if(globals.frontBackBase64.front && globals.frontBackBase64.back) {
      globals.viewFrontBackButton.enable();
      globals.downloadFrontBackButton.enable();
    } else {
      globals.viewFrontBackButton.disable();
      globals.downloadFrontBackButton.disable();
    }
  },



  refresh: () => {
    logUtils.debug('(uis.refresh)');
    uis.refreshFileOl();
    uis.refreshButtons();
  }



};
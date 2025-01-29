window.addEventListener('load', (event) => {
  logUtils.debug('(main.window.onload)', {
    event: event
  });
  globals.fileForm = bootstrapUtils.Form.fromElementIdArr([
    'file-input',
    'create-unique-pdf-button',
    'create-front-back-button'
  ]);
  globals.viewUniquePdfButton = bootstrapUtils.Button.fromElementId('view-unique-pdf-button');
  globals.downloadUniquePdfButton = bootstrapUtils.Button.fromElementId('download-unique-pdf-button');
  globals.viewFrontBackButton = bootstrapUtils.Button.fromElementId('view-front-back-button');
  globals.downloadFrontBackButton = bootstrapUtils.Button.fromElementId('download-front-back-button');
});



function chiudiButtonOnClick(event) {
  logUtils.debug('(main.chiudiButtonOnClick)', {
    event: event
  });
  ajaxUtils.post('http://localhost:8080/shutdown').then((response) => {
    if(!response.success) {
      logUtils.error('(main.chiudiButtonOnClick)', {
        response: response
      }); 
      alert(response.error_str);
      return;
    }   
    logUtils.debug('(main.chiudiButtonOnClick)', {
      response: response
    }); 
    window.close();
  }).catch((error) => {
    logUtils.error('(main.chiudiButtonOnClick)', {
      error: error
    });
    alert(error.toString());
  }); 
}

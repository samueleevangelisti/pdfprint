window.addEventListener('load', (event) => {
  logUtils.debug('(main.window.onload)', event);
  globals.fileForm = uiUtils.Form.fromElementIdArr([
    'file-input',
    'crea-fronte-retro-button'
  ]);
  globals.fileArrUl = uiUtils.Ul.fromElementId('file-ul');
});

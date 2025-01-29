var convertUtils = {
  fileToBase64: (file) => {
    logUtils.debug('(convertUtils.fileToBase64)', file);
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        logUtils.debug('(convertUtils.fileToBase64)', fileReader.result);
        resolve(fileReader.result.replace(/data\:.*base64\,/, ''));
      };
      fileReader.onerror = (error) => {
        logUtils.error('(convertUtils.fileToBase64)', error);
        reject(error);
      };
      fileReader.readAsDataURL(file);
    });
  },
  _base64ToFile(base64, name, type) {
    logUtils.debug('(convertUtils._base64ToFile)', {
      base64: base64,
      name: name,
      type: type
    });
    uiUtils.elementFromConfigsObj({
      tag: 'a',
      href: `data:${type};base64,${base64}`,
      download: name
    }).click();
  },
  base64ToPdf(base64, name) {
    logUtils.debug('(convertUtils.base64ToPdf)', {
      base64: base64,
      name: name
    });
    convertUtils._base64ToFile(base64, name, 'application/pdf');
  }
};

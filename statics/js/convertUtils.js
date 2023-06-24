var convertUtils = {
  fileToBase64: (file) => {
    logUtils.debug('(convertUtils._fileToAny)', file);
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        logUtils.debug('(convertUtils._fileToAny)', fileReader.result);
        resolve(fileReader.result.replace(/data\:.*base64\,/, ''));
      };
      fileReader.onerror = (error) => {
        logUtils.error('(convertUtils._fileToAny)', error);
        reject(error);
      };
      fileReader.readAsDataURL(file);
    });
  },
  _base64ToFile(base64, name, type) {
    elementFromConfigObj({
      tag: 'a',
      href: `data:${type};base64,${base64}`,
      download: name
    }).click();
  },
  base64ToPdf(base64, name) {
    convertUtils._base64ToFile(base64, name, 'application/pdf');
  }
};

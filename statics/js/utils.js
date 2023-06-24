function elementFromConfigObj(configObj) {
  let tag = configObj.tag;
  let classArr = configObj.classArr || [];
  let attributeObj = configObj.attributeObj || {};
  let styleObj = configObj.styleObj || {};
  let handlerFnObj = configObj.handlerFnObj || {};
  let childElementArr = configObj.childElementArr || [];
  delete configObj.tag;
  delete configObj.classArr;
  delete configObj.attributeObj;
  delete configObj.styleObj;
  delete configObj.handlerFnObj;
  delete configObj.childElementArr;
  let element = document.createElement(tag);
  Object.entries(configObj).forEach(([key, value]) => {
    element[key] = value;
  });
  if(classArr.length) {
    element.classList.add(...classArr);
  }
  Object.entries(attributeObj).forEach(([attribute, value]) => {
    element.setAttribute(attribute, value);
  });
  Object.entries(styleObj).forEach(([key, value]) => {
    element.style[key] = value;
  });
  Object.entries(handlerFnObj).forEach(([event, handlerFn]) => {
    element.addEventListener(event, handlerFn);
  });
  childElementArr.forEach((childElement) => {
    element.append(childElement);
  });
  return element;
}

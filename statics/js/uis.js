var uis = {
  createLiElement: (file, index) => {
    return uiUtils.elementFromConfigObj({
      tag: 'li',
      styleObj: {
        marginBottom: '5pt'
      },
      childElementArr: [
        uiUtils.elementFromConfigObj({
          tag: 'input',
          classArr: [
            'margin-right'
          ],
          type: 'number',
          value: index + 1,
          styleObj: {
            width: '40pt'
          },
          handlerFnObj: {
            change: (event) => {
              handlers.indexInputOnChange(event, index);
            }
          }
        }),
        uiUtils.elementFromConfigObj({
          tag: 'button',
          classArr: [
            'margin-right'
          ],
          innerHTML: 'Sposta su',
          handlerFnObj: {
            click: (event) => {
              handlers.spostaSuButtonOnClick(event, index);
            }
          }
        }),
        uiUtils.elementFromConfigObj({
          tag: 'button',
          classArr: [
            'margin-right'
          ],
          innerHTML: 'Sposta giù',
          handlerFnObj: {
            click: (event) => {
              handlers.spostaGiuButtonOnClick(event, index);
            }
          }
        }),
        uiUtils.elementFromConfigObj({
          tag: 'button',
          classArr: [
            'margin-right'
          ],
          innerHTML: 'Rimuovi',
          handlerFnObj: {
            click: (event) => {
              handlers.rimuoviButtonOnClick(event, index);
            }
          }
        }),
        uiUtils.elementFromConfigObj({
          tag: 'span',
          innerHTML: file.name
        })
      ]
    })
  }
};

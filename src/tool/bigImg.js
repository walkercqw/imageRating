export default function (list) {
    return list.map(ele => ({ 
      ...ele,
      fileName: ele.fileName, 
      src: ele.urlBer,
      w: ele.width,
      h: ele.height
    }))
  }
  
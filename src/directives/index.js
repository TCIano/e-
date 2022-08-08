export const imgError = {
  inserted(ele, bind) {
    ele.onerror = () => {
      console.log("图片加载失败");
      ele.src = bind.value;
    };
  },
};

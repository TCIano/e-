export const imgError = {
  inserted(ele, bind) {
    // 如果图片加载失败
    ele.onerror = () => {
      console.log("图片加载失败");
      ele.src = bind.value;
    };
  },
};

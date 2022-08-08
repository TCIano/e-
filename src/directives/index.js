export const imgError = {
  inserted(ele, bind) {
<<<<<<< HEAD
    // console.log(ele);
    // 如果图片加载失败
    ele.onerror = () => {
      // console.log(bind);
      // console.log("图片加载失败");
=======
    // 如果图片加载失败
    ele.onerror = () => {
      console.log("图片加载失败");
>>>>>>> 4d664ea341afb09eb919fff81498631db2f1207e
      ele.src = bind.value;
    };
  },
};

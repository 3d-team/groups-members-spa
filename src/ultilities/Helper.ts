const Helper = {
  removeItemByIndex: (array: any[], indexItem: number) => {
    console.log('@DUKE___', indexItem);

    return array.filter((item, index) => {
      return index !== indexItem;
    });
  },
};

export default Helper;

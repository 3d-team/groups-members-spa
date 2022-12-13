const Helper = {
  removeItemByIndex: (array: any[], indexItem: number) => {
    return array.filter((item, index) => {
      return index !== indexItem;
    });
  },
};

export default Helper;

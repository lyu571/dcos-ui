var TableUtil = {
  /**
   * WARNING: When removing/modifiying this function be aware of comments/sizes
   * in variables-layout.less
   * Returns an integer of what the expected height of a
   * row will be given the current window dimensions.
   *
   * @return {Integer} Expected row height
   */
  getRowHeight: function () {
    let defaultRowSize = 29;
    let definitionList = {
      mini: {screen: 480, rowHeight: 32},
      small: {screen: 768, rowHeight: 37},
      medium: {screen: 992, rowHeight: 45},
      large: {screen: 1270, rowHeight: 52}
    };

    let rowHeight = null;
    let windowWidth = window.innerWidth;
    Object.keys(definitionList).forEach(function (size) {
      if (windowWidth >= definitionList[size].screen) {
        rowHeight = definitionList[size].rowHeight;
      }
    });

    return rowHeight || defaultRowSize;
  }
};

module.exports = TableUtil;
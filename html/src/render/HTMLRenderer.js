import TextGenerator from "../../../src/TextGenerator.js";
import MFNode from "../../../src/MFNode.js";

import { getNumberOfBreakline } from "../../../src/utils/string.js";

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Đây là hàm dùng để tạo ra một thẻ div có chứa các Node, chuỗi ở trong đó. Ngoài ra thì mình còn có thể add thêm các thuộc tính khác cho,
 * div thông qua `options` (hiện tại thì mới chỉ có thể add className).
 * @param {string} tagName Tag name của HTML Element cần tạo.
 * @param {Array<string | Node> | string | Node} children Là một hay nhiều child của div.
 * @param {Array<string> | undefined} className Là các `options` khác để tạo div bao gồm className, Id...
 */
function createBasicHTMLElement(tagName, children, className) {
  let tag = document.createElement(tagName);

  if(!tag) throw new Error(`Cannot create HTML Element or ${tagName} isn't a valid tag name.`);

  if(className) {
    if(typeof className === "string") tag.classList.add(className);
    else tag.classList.add(...className);
  }

  if(children) {
    if(Array.isArray(children)) tag.append(...children);
    else tag.append(children);
  }
  return tag;
}

/**
 * @typedef FormatTypeToCss
 * @property {boolean | null} isList Có phải là list hay không?
 * @property {string} format Tên format.
 * @property {string} className CSS Class tương ứng với format đó.
 * @property {string} tagName Tag name tương ứng với format đó.
 * @property {string | null} typeList Loại list là gì.
 */

/**
 * @param {Array<FormatTypeToCss>} formatTypeToCss Là một mảng các `FormatTypeToCss`.
 */
function HTMLRenderer(formatTypeToCss) {
  this.formatTypeToCss = formatTypeToCss;
}

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Phương thức này dùng để lấy ra các class css tương ứng với format.
 * @param {Array<string>} formats Là một hay nhiều `formats` của text.
 */
HTMLRenderer.prototype.getCssClasses = function(formats) {
  if(!this.formatTypeToCss) throw new Error("Format type to css table isn't created.");

  let cssClass = formats.map(format => this.formatTypeToCss.find(f => f.format === format).className);
  return cssClass;
}

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Phương thức này dùng để lấy ra các FTTC Object (Format Type To CSS)
 * @param {Array<string>} formats Là một hay nhiều `formats` của text.
 */
HTMLRenderer.prototype.getFTTC = function(format) {
  if(!this.formatTypeToCss) throw new Error("Format type to css table isn't created.");

  let fttc = this.formatTypeToCss.find(f => f.format === format);
  return fttc;
}

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * ### HTMLRenderer's Core
 * 
 * Phương thức này dùng để render MFTree sang HTML.
 * cho nên nó là phương thức rất quan trọng.
 * @param {TextGenerator} stf_tree Là object quản lý MFTree.
 */
HTMLRenderer.prototype.render = function(stf_tree) {
  if(!this.formatTypeToCss) throw new Error("Format type to css table isn't created.");

  let tree = stf_tree.mfTree;
  let container = createBasicHTMLElement("div", undefined, ["content"]);
  let renderFunc = this.renderNode(this);

  // Duyệt cây MFNode từ trên xuống và chạy func render của MFNode
  tree.forEach(node => {
    if(node instanceof MFNode) {
      container.append(node.render(renderFunc));
    } else {
      if((/[\r\n]+/).test(node)) {
        let numberOfBreaklines = getNumberOfBreakline(node);
        for(let i = 0; i < numberOfBreaklines; i++) container.append(createBasicHTMLElement("br"))
      }
      else container.append(node);
    }
  });

  return container;
}

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * __Quan trọng__
 * 
 * Phương thức này dùng để render MFNode ra HTML. Chính là callBack dùng dể render MFNode ra HTML.
 * @param {HTMLRenderer} renderer Đây là object quản lý việc render.
 */
HTMLRenderer.prototype.renderNode = function(renderer) {
  /**
   * Bên trong function render này sẽ có nhiều trường hợp để render. Và chính render này cũng là phần cốt lõi
   * để render MFNode ra HTML. Ở đây thì phải render theo quy tắc sole, nghĩa là cứ một value (text thường) thì
   * theo sau phải là Node (đã được style từ các MFWText).
   */

  /**
   * @typedef CallBackProps
   * @property {boolean} isChildrenRenderFirst
   * @property {number} currentSubList
   * @property {string} url
   * @property {Array<string> | Array<MFNode>} values
   * @property {Array<string>} formats
   * @property {Array<MFNode>} children
   */

  /**
   * Đây là phần lõi của function render.
   * @param {CallBackProps} props Các đối số của CallBack.
   * @returns {Node}
   */
  return function({
    values, formats, url, currentSubList, isChildrenRenderFirst, children
  }) {
    let ele;
    let fttc = renderer.getFTTC(formats[0]);

    if(!fttc) {
      let eleChildren = isChildrenRenderFirst ? children.merge(values) : values.merge(children);
      ele = createBasicHTMLElement("span", eleChildren);
      return ele;
    }

    switch(fttc.tagName) {
      // Đây là các case bình thường, những format ảnh hưởng trực tiếp tới text.
      // Bao gồm tất các các Low level MF (từ list và alignments vì là OEF), tất cả heading,
      // sub.
      case "span":
      case "p":
      {
        if(formats.length === 1) {
          ele = createBasicHTMLElement(fttc.tagName, undefined, fttc.className);
        }
        
        if(formats.length > 1) {
          let className = renderer.getCssClasses(formats);
          ele = createBasicHTMLElement(fttc.tagName, undefined, className);
        }

        if(children) {
          let eleChildren = isChildrenRenderFirst ? children.merge(values) : values.merge(children)
          ele.append(...eleChildren);
        } else {
          ele.append(values);
        }
        break;
      };
      // Case này thì dành riêng cho link. Bởi vì đang render theo các tagName khác nhau, và link
      // là một trong số những case đặc biệt.
      case "a": {
        ele = createBasicHTMLElement(fttc.tagName, values, fttc.className);
        ele.href = url;
        break;
      };
      // Case này thì dành riêng cho img. Giống như ở trên đã nói thì image cũng là một trong số
      // những case đặc biệt.
      case "img": {
        let image = createBasicHTMLElement(fttc.tagName, undefined);
        let imageDesc = createBasicHTMLElement("p", values)
        ele = createBasicHTMLElement("div", [image, imageDesc], fttc.className)
        
        image.src = url;
        image.alt = values[0];
        break;
      };
      // List cũng là một trong số những case đặc biệt. Và FTTC của nó cũng có một số thuộc tính khác
      // mà các content khác không có.
      case "li": {
        let items = values.map(value => {
          let item = value;

          if(value instanceof MFNode) {
            let className = renderer.getCssClasses(value.formats.slice(1));
            // item = createBasicHTMLElement(fttc.tagName, value.values, className);
            item = value.render(renderer.renderNode(renderer));
          }

          return createBasicHTMLElement(fttc.tagName, item);
        });

        ele = createBasicHTMLElement(fttc.typeList);
        ele.append(...items)
        break;
      };

      default: {
        throw new Error("This tag haven't supported yet.");
      }
    }
    return ele;
  }
}

export default HTMLRenderer;
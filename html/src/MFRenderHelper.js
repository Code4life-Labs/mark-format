import { HTMLTextGeneratorProto } from "./index.js";

// Constructor này tạo ra để làm ngắn gọn đi công đoạn render.
// Đỡ phải tạo object dài dòng.

/**
 * Constructor này sẽ tạo ra một object để render chuỗi.
 * 
 * @example
 * 
 * ...
 * let htmlRenderHelper = new MFRenderHelper();
 * // Trả về một mảng các HTMLElement đã được render.
 * let content = htmlRenderHelper.render(text);
 * // Sau đó append vào app
 * app.append(content);
 * ...
 */
export function MFRenderHelper() {
  this.textGenerator = HTMLTextGeneratorProto.clone();
}

/**
 * Phương thức này dùng để render chuỗi "cần được format" ra màn hình.
 * Làm ngắn gọn là quá trình render.
 * @param {string} text Chuỗi cần được format và hiển thị lên màn hình.
 */
MFRenderHelper.prototype.render = function(text) {
  let mfWithTextAndNTextArr = this.textGenerator.decomposeMF(text);
  this.textGenerator.createTree(mfWithTextAndNTextArr);
  const content = this.textGenerator.renderer.render(this.textGenerator);
  return content;
}
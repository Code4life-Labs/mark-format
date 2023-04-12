import { View, StyleProps, ViewStyle } from 'react-native';
import React from 'react';
import { ReactNativeTextGeneratorProto } from "./index.js";

/**
 * @typedef MarkFormatProps
 * @property {string} text Đoạn văn bản bình thường.
 * @property {StyleProps<ViewStyle>} containerStyle Style cho container.
 */

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Component này dùng để hiển thị định dạng cho một văn bản.
 * @param {MarkFormatProps} props Props của component.
 * @returns 
 */
const MarkFormat = ({
  text,
  containerStyle
}) => {
  let generator = React.useMemo(() => ReactNativeTextGeneratorProto.clone(), [text]);
  let mfWTextNTextArr = React.useMemo(() => generator.decomposeMF(text), [text]);
  let content = React.useMemo(() => {
    generator.createTree(mfWTextNTextArr);
    return generator.renderer.render(generator.mfTree);
  }, [mfWTextNTextArr]);
  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, content);
};
export default MarkFormat;
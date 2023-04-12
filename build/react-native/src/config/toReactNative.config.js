import { ViewStyle, StyleProp } from "react-native";
import { LOW_MARK_CONVENTIONS, HIGH_MARK_CONVENTIONS } from "../../../mark-format/src/rules.js";

/*
  Đây là những format cơ bản nhất.
*/
const BOLD_TYPE = LOW_MARK_CONVENTIONS.BOLD.TYPE;
const ITALIC_TYPE = LOW_MARK_CONVENTIONS.ITALIC.TYPE;
const UNDERLINE_TYPE = LOW_MARK_CONVENTIONS.UNDERLINE.TYPE;
const LINE_THROUGH_TYPE = LOW_MARK_CONVENTIONS.LINETHROUGH.TYPE;
const HIGHLIGHT_TYPE = LOW_MARK_CONVENTIONS.HIGHLIGHT.TYPE;
const RIGHT_ALIGN_TYPE = LOW_MARK_CONVENTIONS.RIGHT_ALIGN.TYPE;
const CENTER_ALIGN_TYPE = LOW_MARK_CONVENTIONS.CENTER_ALIGN.TYPE;
const UNORDERED_LIST_TYPE = LOW_MARK_CONVENTIONS.UNORDERED_LIST.TYPE;
const ORDERED_LIST_TYPE = LOW_MARK_CONVENTIONS.ORDERED_LIST.TYPE;
const HEADING_0_TYPE = HIGH_MARK_CONVENTIONS.HEADING_0.TYPE;
const HEADING_1_TYPE = HIGH_MARK_CONVENTIONS.HEADING_1.TYPE;
const HEADING_2_TYPE = HIGH_MARK_CONVENTIONS.HEADING_2.TYPE;
const HEADING_3_TYPE = HIGH_MARK_CONVENTIONS.HEADING_3.TYPE;
const HEADING_4_TYPE = HIGH_MARK_CONVENTIONS.HEADING_4.TYPE;
const HEADING_5_TYPE = HIGH_MARK_CONVENTIONS.HEADING_5.TYPE;
const SUB_0_TYPE = HIGH_MARK_CONVENTIONS.SUB_0.TYPE;
const SUB_1_TYPE = HIGH_MARK_CONVENTIONS.SUB_1.TYPE;
const LINK_TYPE = HIGH_MARK_CONVENTIONS.LINK.TYPE;
const IMAGE_TYPE = HIGH_MARK_CONVENTIONS.IMAGE.TYPE;
const BLOCKQUOTE_TYPE = HIGH_MARK_CONVENTIONS.BLOCKQUOTE.TYPE;
const TEXT_30 = 30;
const TEXT_24 = 24;
const TEXT_22 = 22;
const TEXT_20 = 20;
const TEXT_18 = 18;
const TEXT_16 = 16;
const TEXT_14 = 14;
const TEXT_12 = 12;

/**
 * @typedef FormatTypeToStyle
 * @property {boolean | null} isList Có phải là list hay không?
 * @property {string} format Tên format chính là loại format được ở trong `rules.js`.
 * @property {StyleProp<TextStyle>} style Style của Text.
 */

/**
 * @type {{[key: string]: FormatTypeToStyle}}
 */
const formatTypeToStyle = {
  [BOLD_TYPE]: {
    format: BOLD_TYPE,
    style: {
      fontWeight: "bold"
    }
  },
  [ITALIC_TYPE]: {
    format: ITALIC_TYPE,
    style: {
      fontStyle: "italic"
    }
  },
  // Special Format for React Native
  [BOLD_TYPE + "&" + ITALIC_TYPE]: {
    format: BOLD_TYPE + "&" + ITALIC_TYPE,
    style: {
      fontStyle: "italic",
      fontWeight: "bold"
    }
  },
  // Special Format for React Native
  "LIGHT&ITALIC": {
    format: "LIGHT&ITALIC",
    style: {
      fontStyle: "italic",
      fontWeight: "300"
    }
  },
  [UNDERLINE_TYPE]: {
    format: UNDERLINE_TYPE,
    style: {
      textDecorationLine: "underline"
    }
  },
  [LINE_THROUGH_TYPE]: {
    format: LINE_THROUGH_TYPE,
    style: {
      textDecorationLine: "line-through"
    }
  },
  [HIGHLIGHT_TYPE]: {
    format: HIGHLIGHT_TYPE,
    style: {
      paddingVertical: 4,
      paddingHorizontal: 2,
      backgroundColor: 'yellow'
    }
  },
  [RIGHT_ALIGN_TYPE]: {
    format: RIGHT_ALIGN_TYPE,
    style: {
      textAlign: 'right'
    }
  },
  [CENTER_ALIGN_TYPE]: {
    format: CENTER_ALIGN_TYPE,
    style: {
      textAlign: 'center'
    }
  },
  [UNORDERED_LIST_TYPE]: {
    format: UNORDERED_LIST_TYPE,
    isList: true,
    style: {
      paddingLeft: 12,
      paddingVertical: 8
    }
  },
  [ORDERED_LIST_TYPE]: {
    format: ORDERED_LIST_TYPE,
    isList: true,
    style: {
      paddingLeft: 12,
      paddingVertical: 8
    }
  },
  [HEADING_0_TYPE]: {
    format: HEADING_0_TYPE,
    style: {
      fontWeight: "bold",
      fontSize: TEXT_30
    }
  },
  [HEADING_1_TYPE]: {
    format: HEADING_1_TYPE,
    style: {
      fontWeight: "bold",
      fontSize: TEXT_24
    }
  },
  [HEADING_2_TYPE]: {
    format: HEADING_2_TYPE,
    style: {
      fontWeight: "bold",
      fontSize: TEXT_22
    }
  },
  [HEADING_3_TYPE]: {
    format: HEADING_3_TYPE,
    style: {
      fontWeight: "bold",
      fontSize: TEXT_20
    }
  },
  [HEADING_4_TYPE]: {
    format: HEADING_4_TYPE,
    style: {
      fontWeight: "bold",
      fontSize: TEXT_18
    }
  },
  [HEADING_5_TYPE]: {
    format: HEADING_5_TYPE,
    style: {
      fontWeight: "bold",
      fontSize: TEXT_16
    }
  },
  [SUB_0_TYPE]: {
    format: SUB_0_TYPE,
    style: {
      fontSize: TEXT_14
    }
  },
  [SUB_1_TYPE]: {
    format: SUB_1_TYPE,
    style: {
      fontSize: TEXT_12
    }
  },
  [LINK_TYPE]: {
    format: LINK_TYPE,
    style: {
      color: "#3F72AF",
      textDecorationLine: 'underline'
    }
  },
  [IMAGE_TYPE]: {
    format: IMAGE_TYPE,
    hasDescription: true,
    style: {
      width: "100%",
      aspectRatio: 16 / 9
    }
  },
  [BLOCKQUOTE_TYPE]: {
    format: BLOCKQUOTE_TYPE,
    style: {}
  }
};
export const UNORDERED_LIST_BULLETS = ["\u2043", "\u2022"];
export const ORDERED_LIST_BULLETS = ["numbers", "abcdefghijklmnopqrstuvwxyz"];

// Cái này để setup default font cho <Text> bọc bên ngoài toàn content.
// Bởi vì người dùng có thể dùng font khác.
export let defaultFont = undefined;

/**
 * Hàm này sẽ config lại style mặc định của FTTS Objects.
 * 
 * Hiện tại hỗ trợ một số loại sau:
 * 
 * `BOLD_TYPE`
 * `ITALIC_TYPE`
 * `UNDERLINE_TYPE`
 * `LINE_THROUGH_TYPE`
 * `HIGHLIGHT_TYPE`
 * `RIGHT_ALIGN_TYPE`
 * `CENTER_ALIGN_TYPE`
 * `UNORDERED_LIST_TYPE`
 * `ORDERED_LIST_TYPE`
 * `HEADING_0_TYPE`
 * `HEADING_1_TYPE`
 * `HEADING_2_TYPE`
 * `HEADING_3_TYPE`
 * `HEADING_4_TYPE`
 * `HEADING_5_TYPE`
 * `SUB_0_TYPE`
 * `SUB_1_TYPE`
 * `LINK_TYPE`
 * `IMAGE_TYPE`
 * `BLOCKQUOTE_TYPE`
 * @param {{[key: string]: StyleProp<ViewStyle>}} styles 
 */
export function configureStyleOfFTTS(styles) {
  let keys = Object.keys(styles);
  for (let key of keys) {
    let fttsStyle = formatTypeToStyle[key];
    if (fttsStyle) {
      fttsStyle.style = Object.assign({}, styles[key]);
    } else console.warn(`The ${key} is not exist in FTTS`);
  }
}

/**
 * Hàm này dùng để đổi font mặc định, đảm bảo trong dự án đã cài font này rồi nhé.
 * @param {string} nameOfFont Tên của font mặc định. VD: "Roboto-Regular, Monserat-Regular".
 */
export function configureDefaultFont(nameOfFont) {
  defaultFont = nameOfFont;
}
export default formatTypeToStyle;
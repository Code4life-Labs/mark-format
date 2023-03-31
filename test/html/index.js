/*
  File index này là file setup cơ bản để xài.
  File index này không phải là file chính của app, file này dùng để test trong quá trình phát triển thôi.
  Bao gồm styles.css, index.html.

  Sau khi phát triển xong thì đóng gói lại cho từng Framework/Library.
*/
import { MFRenderHelper } from '../../html/index.js'

import { full_2, full_3 } from "../../src/assets/data.js";

const app = document.getElementById("app");
const mFRenderHelper = new MFRenderHelper();
const content = mFRenderHelper.render(full_3);

app.append(content);
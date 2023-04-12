/*
  File index này là file setup cơ bản để xài.
  File index này không phải là file chính của app, file này dùng để test trong quá trình phát triển thôi.
  Bao gồm styles.css, index.html.

  Sau khi phát triển xong thì đóng gói lại cho từng Framework/Library.
*/
import { MFRenderHelper } from '../../build/html/index.js'

import { full_2, full_3 } from "../assets/data.js";

const text = "- **Địa chỉ**: 66 Nguyễn Trãi, Long Khánh, Đồng Nai\n\n- **Hotline**: 090 662 1569\n\nBạn thích một homestay cực chill, được nghỉ dưỡng trong không gian mát lành, thoáng đãng thì homestay Kim Ngân là địa chỉ lý tưởng bạn nên lựa chọn. Phòng ốc được review sạch sẽ, ngăn nắp, đầy đủ tiện nghi giúp bạn có không gian nghỉ dưỡng thoải mái nhất.\n\n\nTheo đánh giá của cộng đồng review, homestay Kim Ngân có sân vườn thoáng đãng, đẹp mắt. Hơn nữa còn có máy giặt và nấu ăn miễn phí nên vô cùng tiện lợi. Gia đình chủ homestay nhiệt tình, mến khách, sẵn sàng hỗ trợ du khách bất cứ lúc nào.\n\nHomestay Kim Ngân còn có nhiều chòi lá để bạn có thể ăn uống cùng gia đình, bạn bè. Bạn có thể vừa câu cá, vừa tán chuyện và thưởng thức những món ăn đặc trưng của địa phương."

const app = document.getElementById("app");
const mFRenderHelper = new MFRenderHelper();
const content = mFRenderHelper.render(full_3);

app.append(content);
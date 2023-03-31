/**
 * Hàm này dùng để lấy ra một số ngẫu nhiên trong khoảng `[min, max]`.
 * @param max Số lớn nhất trong khoảng ngẫu nhiên.
 * @param min Số nhỏ nhất trong khoảng ngẫu nhiên.
 * @returns
 */
export function getRandomNumber(max: number, min: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
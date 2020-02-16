import 图片处理限流 from "./图片处理限流.js";
const { asyncwrap } = 图片处理限流;
import execpromise from "./execpromise.js";
import { getBin } from "./切割图片读取并写入.js";
// import { wrapasynclimit } from "./wrap-async-function.js";
export default asyncwrap(img2webp);
async function img2webp(input: string, output: string) {
    let execout = await execpromise(getBin("cwebp"), [
        "-o",
        output,
        "-v",
        "--",
        input
    ]);
    return execout;
}

import 图片处理限流 from "./图片处理限流.js";
const { asyncwrap } = 图片处理限流;
import execpromise from "./execpromise.js";
import { getBin } from "./切割图片读取并写入.js";
import argsobj from "./parsed-cli-options.js";
export default asyncwrap(img2webp);
async function img2webp(input, output) {
    let execout = await execpromise(
        String(argsobj["cwebp-path"] ?? getBin("cwebp")),
        ["-o", output, "-v", "--", input]
    );
    return execout;
}
export async function cwebp_crop(input, output, width, height, left, top) {
    let execout = await execpromise(
        String(argsobj["cwebp-path"] ?? getBin("cwebp")),
        [
            "-crop",
            left,
            top,
            width,
            height,
            "-o",
            output,
            "-v",
            "--",
            input,
        ].map((a) => String(a))
    );
    return execout;
}

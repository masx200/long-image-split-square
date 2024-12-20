import gm from "gm";
import 图片处理限流 from "./图片处理限流.js";
import argsobj from "./parsed-cli-options.js";
import { streamToString } from "./异步限流-gmcrop.js";
const { asyncwrap } = 图片处理限流;
const { floor, sqrt } = Math;
export default asyncwrap(gmresize);
export const gm_sub = argsobj["gm-path"]
    ? gm.subClass({ appPath: String(argsobj["gm-path"]) })
    : gm;
async function gmresize(inputfile, outfile, width, height, maxpixels) {
    if (maxpixels < width * height && maxpixels > 0) {
        const retio = sqrt(maxpixels / (width * height));
        return await new Promise((res, rej) => {
            gm_sub(inputfile)
                .resize(floor(width * retio), floor(height * retio), ">")
                .write(outfile, async (err, stdout, stderr, cmd) => {
                    if (err) {
                        return rej({
                            err,
                            cmd,
                            stderr: await streamToString(stderr),
                            stdout: await streamToString(stdout),
                        });
                    } else {
                        return res({
                            cmd,
                            stderr: await streamToString(stderr),
                            stdout: await streamToString(stdout),
                        });
                    }
                });
        });
    } else {
        throw new Error(
            `maxpixels参数无效，请检查是否为正数且不超过原始图片像素，当前参数为${maxpixels}`
        );
    }
}

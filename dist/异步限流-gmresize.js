import gm from "gm";
import 图片处理限流 from "./图片处理限流.js";
import argsobj from "./parsed-cli-options.js";
const { asyncwrap } = 图片处理限流;
const { floor, sqrt } = Math;
export default asyncwrap(gmresize);
export const gm_sub = argsobj["gm-path"]
    ? gm.subClass({ appPath: String(argsobj["gm-path"]) })
    : gm;
async function gmresize(inputfile, outfile, width, height, maxpixels) {
    if (maxpixels < width * height && maxpixels > 0) {
        const retio = sqrt(maxpixels / (width * height));
        await new Promise((res, rej) => {
            gm_sub(inputfile)
                .resize(floor(width * retio), floor(height * retio), ">")
                .write(outfile, (err) => {
                    if (err) {
                        return rej(err);
                    } else {
                        return res();
                    }
                });
        });
    } else {
        throw new Error();
    }
}

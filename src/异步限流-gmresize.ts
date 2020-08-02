import gm from "gm";
import 图片处理限流 from "./图片处理限流.js";
const { asyncwrap } = 图片处理限流;
const { floor, sqrt } = Math;
export default asyncwrap(gmresize);

async function gmresize(
    inputfile: string,
    outfile: string,

    width: number,
    height: number,
    maxpixels: number
) {
    /* 仅缩小图片 */
    if (maxpixels < width * height && maxpixels > 0) {
        const retio = sqrt(maxpixels / (width * height));
        // '>'; /** Change dimensions only if image is larger than width or height */
        await new Promise((res, rej) => {
            gm(inputfile)
                .resize(floor(width * retio), floor(height * retio), ">")
                .write(outfile, (err: Error | null) => {
                    if (err) {
                        return rej(err);
                    } else {
                        return res();
                    }
                });
        });
    } else {
        throw new Error();
        // await fs.promises.copyFile(inputfile, outfile);
    }
}

// import { wrapasynclimit } from "./wrap-async-function.js";
// import fs from "fs";

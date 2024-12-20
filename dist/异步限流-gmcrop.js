import concat from "concat-stream";
import 图片处理限流 from "./图片处理限流.js";
import { gm_sub } from "./异步限流-gmresize.js";
import { cwebp_crop } from "./异步限流-img2webp.js";
const { asyncwrap } = 图片处理限流;
export default asyncwrap(gmcrop);
async function gmcrop(inputfile, outfile, width, height, left, top) {
    if (inputfile.endsWith(".png")) {
        return cwebp_crop(inputfile, outfile, width, height, left, top);
    }
    return await new Promise((res, rej) => {
        gm_sub(inputfile)
            .crop(width, height, left, top)
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
}
export function streamToString(readable) {
    return new Promise((resolve, reject) => {
        readable.pipe(
            concat((data) => {
                resolve(data.toString("utf8"));
            })
        );
        readable.on("error", reject);
    });
}

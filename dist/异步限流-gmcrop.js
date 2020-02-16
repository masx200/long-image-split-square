import gm from "gm";
import 图片处理限流 from "./图片处理限流.js";
const { asyncwrap } = 图片处理限流;
export default asyncwrap(gmcrop);
async function gmcrop(inputfile, outfile, width, height, left, top) {
    await new Promise((res, rej) => {
        gm(inputfile)
            .crop(width, height, left, top)
            .write(outfile, (err) => {
            if (err) {
                return rej(err);
            }
            else {
                return res();
            }
        });
    });
}

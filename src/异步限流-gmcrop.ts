// import gm from "gm";
import concat from "concat-stream";
import stream from "node:stream";
import 图片处理限流 from "./图片处理限流.js";
import { gm_sub } from "./异步限流-gmresize.js";
import { cwebp_crop } from "./异步限流-img2webp.js";

const { asyncwrap } = 图片处理限流;
export default asyncwrap(gmcrop);
/**
 * 异步裁剪图片函数
 * 使用GraphicsMagick库对图片进行裁剪操作
 *
 * @param inputfile 输入文件的路径
 * @param outfile 输出文件的路径
 * @param width 裁剪区域的宽度
 * @param height 裁剪区域的高度
 * @param left 裁剪区域左上角相对于原图左边界的距离
 * @param top 裁剪区域左上角相对于原图上边界的距离
 * @returns 返回一个Promise，当裁剪操作完成时 resolve，如果发生错误则 reject
 */
async function gmcrop(
    inputfile: string,
    outfile: string,
    width: number,
    height: number,
    left: number,
    top: number
): Promise<{ stdout: string; stderr: string; cmd: string }> {
    if (inputfile.endsWith(".png")) {
        return cwebp_crop(inputfile, outfile, width, height, left, top);
    }
    //处理png图片出错,改成cwebp
    /* Error: Command failed: gm convert: bad adaptive filter value */
    return await new Promise<{ stdout: string; stderr: string; cmd: string }>(
        (res, rej) => {
            gm_sub(inputfile)
                .crop(width, height, left, top)
                .write(
                    outfile,
                    async (
                        err: Error | null,
                        stdout: stream.Readable,
                        stderr: stream.Readable,
                        cmd: string
                    ) => {
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
                    }
                );
        }
    );
}
export function streamToString(readable: stream.Readable): Promise<string> {
    return new Promise((resolve, reject) => {
        readable.pipe(
            concat((data) => {
                resolve(data.toString("utf8"));
            })
        );
        readable.on("error", reject);
    });
}
// import { wrapasynclimit } from "./wrap-async-function.js";

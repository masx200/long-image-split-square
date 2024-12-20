import gm from "gm";
import 图片处理限流 from "./图片处理限流.js";
import argsobj from "./parsed-cli-options.js";
import { streamToString } from "./异步限流-gmcrop.js";
import stream from "node:stream";
const { asyncwrap } = 图片处理限流;
const { floor, sqrt } = Math;
export default asyncwrap(gmresize);
export const gm_sub = argsobj["gm-path"]
    ? gm.subClass({ appPath: String(argsobj["gm-path"]) })
    : gm;
/**
 * 异步调整图片大小
 *
 * 此函数使用GraphicsMagick库来调整图片大小，主要目的是缩小图片，使其不超过指定的最大像素值
 * 如果图片的总像素超过最大像素限制，则根据最大像素值与原图像素的比例来调整图片的宽度和高度
 *
 * @param inputfile - 输入图片文件的路径
 * @param outfile - 输出调整大小后的图片文件的路径
 * @param width - 原始图片的宽度
 * @param height - 原始图片的高度
 * @param maxpixels - 图片调整后的最大像素值
 * @returns 无返回值
 * @throws 如果maxpixels参数无效（非正数或超过原始图片像素），则抛出错误
 */
async function gmresize(
    inputfile: string,
    outfile: string,
    width: number,
    height: number,
    maxpixels: number
): Promise<{ stdout: string; stderr: string; cmd: string }> {
    /* 仅缩小图片 */
    if (maxpixels < width * height && maxpixels > 0) {
        const retio = sqrt(maxpixels / (width * height));
        // '>'; /** Change dimensions only if image is larger than width or height */
        return await new Promise<{
            stdout: string;
            stderr: string;
            cmd: string;
        }>((res, rej) => {
            gm_sub(inputfile)
                .resize(floor(width * retio), floor(height * retio), ">")
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
        });
    } else {
        throw new Error(
            `maxpixels参数无效，请检查是否为正数且不超过原始图片像素，当前参数为${maxpixels}`
        );
        // await fs.promises.copyFile(inputfile, outfile);
    }
}

// import { wrapasynclimit } from "./wrap-async-function.js";
// import fs from "fs";

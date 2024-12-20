import 图片处理限流 from "./图片处理限流.js";
const { asyncwrap } = 图片处理限流;
import execpromise from "./execpromise.js";
import { getBin } from "./切割图片读取并写入.js";
import argsobj from "./parsed-cli-options.js";
// import { wrapasynclimit } from "./wrap-async-function.js";
export default asyncwrap(img2webp);
/**
 * 将图像文件转换为WebP格式
 *
 * 本函数使用Google的cwebp工具将输入的图像文件转换为WebP格式，并将结果保存在指定的输出文件中
 * 它通过执行外部命令来完成图像格式的转换，确保在执行前cwebp工具是可用的
 *
 * @param input 输入图像文件的路径，支持多种图像格式，如PNG、JPEG等
 * @param output 输出WebP图像文件的路径，如果文件已存在，将会被覆盖
 * @returns 返回执行cwebp工具时的输出信息，包括转换过程中的详细情况和结果
 */
async function img2webp(
    input: string,
    output: string,
): Promise<{
    stdout: string;
    stderr: string;
    cmd: string;
    args: string[];
}> {
    let execout = await execpromise(
        String(argsobj["cwebp-path"] ?? getBin("cwebp")),
        ["-o", output, "-v", "--", input],
    );
    return execout;
}
export async function cwebp_crop(
    input: string,
    output: string,
    width: number,
    height: number,
    left: number,
    top: number,
): Promise<{
    stdout: string;
    stderr: string;
    cmd: string;
    args: string[];
}> {
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
        ].map((a) => String(a)),
    );
    return execout;
}

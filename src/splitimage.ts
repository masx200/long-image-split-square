import path from "path";
import getimgsize from "./异步限流-获取图像大小.js";
import 计算长图切割参数 from "./计算长图切割参数.js";
import cropimagewrite from "./切割图片读取并写入.js";
import fsextra from "fs-extra";
// import 文件读取队列 from "./文件读取队列.js";
/**
 * 异步函数，用于分割图像并写入多个文件
 * 主要用于处理大尺寸图像，将其分割成多个小图像文件
 * @param inputfile 输入图像文件的路径
 * @param input 输入图像文件的路径（可能与inputfile相同，具体用途未明）
 * @param outputextention 输出图像文件的扩展名
 * @param output 输出图像文件的目录路径
 * @param maxpixels 图像处理时的最大像素限制
 * @returns 无返回值
 */
export default async function splitimageandwrite(
    inputfile: string,
    input: string,
    outputextention: string,
    output: string,
    maxpixels: number
): Promise<void> {
    console.log("获取图片像素尺寸", inputfile);
    /* 文件读取要限流 */
    // const { width, height } = await 文件读取队列.add([getimgsize, [inputfile]]);
    const { width, height } = await getimgsize(inputfile);
    console.log(["图像大小", inputfile, { width, height }]);
    const 切割参数 = 计算长图切割参数(height, width);
    await fsextra.ensureDir(output);
    if (切割参数) {
        console.log(["切割长图", inputfile, 切割参数]);
        /* 等待每个都完成之后才完成 */
        await Promise.all(
            切割参数.map(async ({ left, height, width, top }, index) => {
                const outbasename =
                    path.basename(inputfile, path.extname(inputfile)) +
                    "-" +
                    index +
                    "." +
                    outputextention;
                const 输入相对路径 = path.dirname(
                    inputfile.slice(path.resolve(input).length + 1)
                );
                const outfile = path.join(output, 输入相对路径, outbasename);
                await fsextra.ensureDir(path.dirname(outfile));
                console.log(["开始写入文件", outfile]);

                await cropimagewrite(
                    inputfile,
                    outfile,
                    width,
                    height,
                    left,
                    top,
                    maxpixels
                );

                // await fs.promises.writeFile(outfile, outbuffer);
                console.log(["写入文件完成", outfile]);
            })
        );
    } else {
        console.log(["不是长图", inputfile]);
        //return
    }
}
//

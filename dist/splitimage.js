import path from "path";
import getimgsize from "./异步限流-获取图像大小.js";
import 计算长图切割参数 from "./计算长图切割参数.js";
import cropimagewrite from "./切割图片读取并写入.js";
import fsextra from "fs-extra";
export default async function splitimageandwrite(inputfile, input, outputextention, output, maxpixels) {
    console.log("获取图片像素尺寸", inputfile);
    const { width, height } = await getimgsize(inputfile);
    console.log(["图像大小", inputfile, { width, height }]);
    const 切割参数 = 计算长图切割参数(height, width);
    await fsextra.ensureDir(output);
    if (切割参数) {
        console.log(["切割长图", inputfile, 切割参数]);
        await Promise.all(切割参数.map(async ({ left, height, width, top }, index) => {
            const outbasename = path.basename(inputfile, path.extname(inputfile)) +
                "-" +
                index +
                "." +
                outputextention;
            const 输入相对路径 = path.dirname(inputfile.slice(path.resolve(input).length + 1));
            const outfile = path.join(output, 输入相对路径, outbasename);
            await fsextra.ensureDir(path.dirname(outfile));
            console.log(["开始写入文件", outfile]);
            await cropimagewrite(inputfile, outfile, width, height, left, top, maxpixels);
            console.log(["写入文件完成", outfile]);
        }));
    }
    else {
        console.log(["不是长图", inputfile]);
    }
}

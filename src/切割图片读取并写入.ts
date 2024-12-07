import fs from "fs";
import os from "os";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import gmcrop from "./异步限流-gmcrop.js";
import img2webp from "./异步限流-img2webp.js";
import gmresize from "./异步限流-gmresize.js";
/**
 * 根据当前操作系统平台获取可执行文件名
 *
 * 此函数旨在跨平台环境下，根据操作系统类型动态确定可执行文件的扩展名
 * 在Windows系统中，可执行文件通常带有.exe扩展名；而在Unix-like系统（如Linux或macOS）中，则不需要
 *
 * @param name 可执行文件的基本名称，不包含扩展名
 * @returns 根据操作系统动态添加扩展名的完整可执行文件名
 */
export function getBin(name: string) {
    return process.platform === "win32" ? `${name}.exe` : name;
}
const tempdir = os.tmpdir();
/**
 * 生成一个临时的图片文件路径
 *
 * 该函数用于创建一个位于临时目录中的、带有唯一后缀的图片文件路径
 * 主要用途是为临时图片生成一个唯一的路径，以避免文件冲突
 *
 * @returns {string} 返回一个唯一的图片文件路径，格式为 webp
 */
function gettempjpgfilepath() {
    return path.resolve(tempdir, "temp-" + uuidv4() + ".webp");
}
/**
 * 裁剪图像并写入新文件
 *
 * 该函数使用GraphicsMagick对输入图像进行裁剪，并根据需要调整大小，最后保存为输出文件
 * 如果输出文件格式为webp，则在裁剪后转换格式如果需要调整大小，则先裁剪再调整大小，
 * 否则直接裁剪并保存
 *
 * @param inputfile 输入图像文件路径
 * @param outfile 输出图像文件路径
 * @param width 裁剪区域的宽度
 * @param height 裁剪区域的高度
 * @param left 裁剪区域的左侧位置
 * @param top 裁剪区域的顶部位置
 * @param maxpixels 图像调整大小后的最大像素数
 * @returns 无返回值
 */
export default async function cropimagewrite(
    inputfile: string,
    outfile: string,
    width: number,
    height: number,
    left: number,
    top: number,
    maxpixels: number
): Promise<void> {
    /*Error: Stream yields empty buffer*/
    if (!outfile.endsWith(".webp")) {
        if (shouldresize(width, height, maxpixels)) {
            const tempname = gettempjpgfilepath();
            /* /* 文件读取要限流  */
            // await 文件读取队列.add([
            //     gmcrop,
            //     [inputfile, tempname, width, height, left, top]
            // ]);

            try {
                await gmcrop(inputfile, tempname, width, height, left, top);
                await gmresize(tempname, outfile, width, height, maxpixels);
            } catch (e) {
                console.error(e);

                return Promise.reject(e);
            } finally {
                await unlinkexists(tempname);
            }
        } else {
            await gmcrop(inputfile, outfile, width, height, left, top);
        }
    } else {
        const tempname1 = gettempjpgfilepath();
        const tempname2 = gettempjpgfilepath();

        try {
            await gmcrop(inputfile, tempname1, width, height, left, top);
            if (shouldresize(width, height, maxpixels)) {
                //const tempname2 = gettempjpgfilepath();
                await gmresize(tempname1, tempname2, width, height, maxpixels);
                await img2webp(tempname2, outfile);
                await Promise.all([
                    unlinkexists(tempname1),
                    unlinkexists(tempname2),
                ]);
                // await;
            } else {
                /* const execout = */

                await img2webp(tempname1, outfile);
                // console.log(execout);
                await unlinkexists(tempname1);
            }
        } catch (e) {
            console.error(e);

            return Promise.reject(e);
        } finally {
            await Promise.all([
                //如果文件已经不存在，删除会失败
                unlinkexists(tempname1),
                unlinkexists(tempname2),
            ]);
        }
    }
}
/**
 * Determines if an image needs to be resized based on its pixel count.
 *
 * This function is used to determine whether an image needs to be resized by comparing the product of the image's width and height (i.e., total number of pixels) with a specified maximum pixel value.
 * Resizing is required if the total number of pixels in the image exceeds the specified maximum pixel value.
 *
 * @param width The width of the image in pixels.
 * @param height The height of the image in pixels.
 * @param maxpixels The maximum number of pixels. If this value is greater than 0 and the total number of image pixels exceeds this value, resizing is required.
 * @returns Returns a boolean value, true if resizing is needed, otherwise false.
 */
function shouldresize(width: number, height: number, maxpixels: number) {
    return (
        typeof maxpixels === "number" &&
        maxpixels > 0 &&
        maxpixels < width * height
    );
}
// import 文件读取队列 from "./文件读取队列.js";
/**
 * Asynchronously deletes a file if it exists.
 *
 * @param file The path of the file to be deleted.
 */
async function unlinkexists(file: string) {
    if (fs.existsSync(file)) {
        await fs.promises.unlink(file);
    }
}

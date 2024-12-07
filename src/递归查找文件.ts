import fsextra from "fs-extra";
import path from "path";
import findfiles from "./findfiles.js";
/**
 * 递归查找指定目录下的所有图片文件
 *
 * 此函数通过文件扩展名来判断文件是否为图片，并递归地搜索指定目录下的所有匹配文件
 * 它使用正则表达式来匹配文件扩展名，确保查找过程不区分文件扩展名的大小写
 *
 * @param extention 图片文件的扩展名数组，如 ['jpg', 'png', 'gif']，用于判断文件是否为图片
 * @param input 用户输入的目录路径，函数将确保此路径存在，并在此路径下查找图片
 * @returns 返回一个Promise，解析为找到的所有图片文件路径的数组
 */
export default async function 递归查找图片(extention: string[], input: string) {
    /*不区分大小写的正则*/
    /* 匹配正则不要加'g',否则出错一半true,一半false */
    const extreg = new RegExp(`\\.(${extention.join("|")})$`, "i");
    const dirpath = path.resolve(input);
    await fsextra.ensureDir(dirpath);

    return findfiles(extreg, dirpath);
}

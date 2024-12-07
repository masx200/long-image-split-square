/**
 * 根据指定的模式在指定的根目录下查找文件
 * @param pattern {string | RegExp} - 要匹配的文件模式，可以是字符串或正则表达式
 * @param root {string} - 开始查找的根目录路径
 * @returns {Promise<string[]>} - 返回一个Promise，解析为找到的文件路径数组
 */
function findfiles(pattern: string | RegExp, root: string): Promise<string[]> {
    // console.log([pattern, root]);
    return new Promise((s, j) => {
        find.file(pattern, root, (files) => {
            s(files);
        }).error((e) => {
            j(e);
        });
    });
}
export default findfiles;
import find from "find";

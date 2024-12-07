/*为什么会出现EMFILE，too many open files?

对文件系统进行大量并发调用，操作系统的文件描述符数量会被瞬间用光，抛出EMFILE，too many open files。

异步I/O和同步I/O的显著差距：同步I/O因为每个I/O都是彼此阻塞的，在循环体中，总是一个接着一个调用，不会出现耗用文件描述符太多的情况，同时性能也是低下的；

对于异步I/O，虽然并发容易实现，但是还是需要给予一定的过载保护，防止过分压榨底层系统的性能。
http://www.voidcn.com/article/p-nnypakbc-eh.html
*/
import gm from "gm";
import { wrapasynclimit } from "./wrap-async-function.js";
import { gm_sub } from "./异步限流-gmresize.js";
/*https://blog.csdn.net/qq160816/article/details/52684362*/
//export const im=gm.subClass({imageMagick: true})
/*Error: Command failed: gm identify: No decode delegate for this image format ().
gm identify: Request did not return an image.*/
export default wrapasynclimit(getimgsize);
/**
 * 异步获取图片的尺寸信息
 * 此函数通过Promise封装了对图片尺寸信息的获取过程，使用了GraphicsMagick库的子进程来读取图片的尺寸数据
 * 主要用于在需要的地方通过await调用，以获取图片的宽度和高度等信息
 *
 * @param filename 图片文件的路径和名称这是函数需要的唯一参数，用于确定是哪张图片
 * @returns 返回一个Promise，解析为gm.Dimensions类型，包含图片的尺寸信息
 */
async function getimgsize(filename: string): Promise<gm.Dimensions> {
    const result: gm.Dimensions = await new Promise((s, j) => {
        gm_sub(filename).size((e, dimensions) => {
            if (e) {
                return j(e);
            } else {
                return s(dimensions);
            }
        });
    });
    return result;
}

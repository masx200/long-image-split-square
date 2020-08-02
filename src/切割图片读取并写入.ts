import fs from "fs";
import os from "os";
import path from "path";
import uuidv4 from "uuid/v4.js";
import gmcrop from "./异步限流-gmcrop.js";
import img2webp from "./异步限流-img2webp.js";
import gmresize from "./异步限流-gmresize.js";
export function getBin(name: string) {
    return process.platform === "win32" ? `${name}.exe` : name;
}
const tempdir = os.tmpdir();
function gettempjpgfilepath() {
    return path.resolve(tempdir, "temp-" + uuidv4() + ".jpg");
}
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

try{
            await gmcrop(
                inputfile,
                tempname,

                width,
                height,
                left,
                top
            );
            await gmresize(tempname, outfile, width, height, maxpixels);
     }catch(e){
console.error(e)

return Promise.reject(e)

}finally{  await fs.promises.unlink(tempname);
}

 } else {
            await gmcrop(
                inputfile,
                outfile,

                width,
                height,
                left,
                top
            );
        }
    } else {
        const tempname1 = gettempjpgfilepath();
        await gmcrop(
            inputfile,
            tempname1,

            width,
            height,
            left,
            top
        );
        if (shouldresize(width, height, maxpixels)) {
            const tempname2 = gettempjpgfilepath();
            await gmresize(tempname1, tempname2, width, height, maxpixels);
            await img2webp(tempname2, outfile);
            await Promise.all([
                fs.promises.unlink(tempname1),
                fs.promises.unlink(tempname2)
            ]);
            // await;
        } else {
            /* const execout = */ 


await img2webp(tempname1, outfile);
            // console.log(execout);
            await fs.promises.unlink(tempname1);
        }
    }
}
function shouldresize(width: number, height: number, maxpixels: number) {
    return (
        typeof maxpixels === "number" &&
        maxpixels > 0 &&
        maxpixels < width * height
    );
}
// import 文件读取队列 from "./文件读取队列.js";

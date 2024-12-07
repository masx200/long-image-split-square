import process from "process";
import splitimageandwrite from "./splitimage.js";
import 递归查找图片 from "./递归查找文件.js";
("use strict");
process.on("unhandledRejection", (err) => {
    throw err;
});
export { start };
async function start(config) {
    let filesum = 0;
    let finishcount = 0;
    const failurefiles = [];
    let failcount = 0;
    console.log(config);
    const { inputextentions, input, output, outputextention, maxpixels } =
        config;
    console.log("递归查找图片...", input);
    const files = await 递归查找图片(inputextentions, input);
    filesum = files.length;
    files.sort();
    console.log("找到图片文件" + files.length + "个");
    console.log(JSON.stringify(files, null, 4));
    await handleconvert(files, input, outputextention, output, maxpixels);
    if (failurefiles.length) {
        console.error(
            "处理失败的文件：",
            JSON.stringify(failurefiles, null, 4)
        );
    } else {
        console.log("处理全部成功!");
    }
    async function handleconvert(
        files,
        input,
        outputextention,
        output,
        maxpixels
    ) {
        if (!files.length) {
            return;
        } else if (files.length > slicecount) {
            const workfiles = files.slice(0, slicecount);
            const restfiles = files.slice(slicecount);
            await handleconvert(
                workfiles,
                input,
                outputextention,
                output,
                maxpixels
            );
            await handleconvert(
                restfiles,
                input,
                outputextention,
                output,
                maxpixels
            );
            return;
        } else {
            await Promise.all(
                files.map(async (inputfile) => {
                    try {
                        await splitimageandwrite(
                            inputfile,
                            input,
                            outputextention,
                            output,
                            maxpixels
                        );
                        finishcount++;
                    } catch (e) {
                        failcount++;
                        failurefiles.push(inputfile);
                        console.error(e);
                    }
                    let 进度 =
                        "processing: " +
                        `${
                            (finishcount / filesum) * 100
                        }% ${finishcount} / ${filesum} ` +
                        "failure : " +
                        failcount +
                        "/" +
                        filesum;
                    process.title = 进度;
                    console.log(进度);
                })
            );
        }
    }
}
const slicecount = 500;

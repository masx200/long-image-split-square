#!/usr/bin/env node
import argsobj from "./parsed-cli-options.js";
import process from "process";
import loadjson from "./加载JSON.js";
import { start } from "./index.js";
const { input, output } = argsobj;
const filenameurl = import.meta.url;
const jsonurl = new URL("../image-config.json", filenameurl);
const maxpixels = Number(argsobj["maxpixels"]);
if (input && output) {
    loadjson(jsonurl).then((config) => {
        if (maxpixels) {
            config.maxpixels = maxpixels;
        }
        const options = Object.assign({}, config, { input, output });
        if (argsobj["inputextentions"]) {
            options.inputextentions = String(argsobj["inputextentions"]).split(
                ","
            );
        }
        console.log(JSON.stringify(options, null, 4));
        start(options);
    });
} else {
    console.error("批量把长图竖直拆分成接近正方形的小图片");
    console.error(`必选参数 \`input\`:类型\`string\`,输入图片目录 

必选参数 \`output\`:类型\`string\`,输出图片目录 
    
可选参数 \`maxpixels\`:类型\`number\`,输出图片最大像素数 
可选参数 concurrent:类型:number,同时运行的图片处理进程最大值

可选参数 inputextentions: 类型:string,输入图片文件后缀，多个用逗号隔开，默认为"jpg,png,jpeg,bmp,webp"
`);
    console.error("示例:");
    console.error(
        `node ./dist/cli.js --input=D:/baidupandownload/图片输入/  --output=D:/baidupandownload/暴力切割图片/`
    );
    console.error(
        `node ./dist/cli.js --input=D:/baidupandownload/图片输入  --output=D:/baidupandownload/输出切割图片/ --maxpixels=4000000 --concurrent=4`
    );
    console.error("输入的参数有误!");
    process.exit(1);
}

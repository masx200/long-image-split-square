#!/usr/bin/env node

import process from "process";
import loadjson from "./加载JSON.js";
import { start } from "./index.js";
import { parseargs } from "./parse-args.js";
import IMAGECONFIG from './IMAGECONFIG.js';
const argsobj = parseargs(process.argv.slice(2));
const { input, output } = argsobj;

const filenameurl = import.meta.url;
const jsonurl = new URL("../image-config.json", filenameurl);
const maxpixels = Number(argsobj["maxpixels"]);

if (input && output) {
    loadjson(jsonurl).then((config:IMAGECONFIG) => {
        if (maxpixels) {
            config.maxpixels = maxpixels;
        }
        const options = Object.assign({}, config, { input, output });
        console.log(options);
        start(options);
    });
} else {
    console.error("批量把长图竖直拆分成接近正方形的小图片");
    console.error("示例:");
    console.error(
        `node ./dist/cli.js --input=D:/baidupandownload/图片输入/  --output=D:/baidupandownload/暴力切割图片/`
    );
    console.error(
        `node ./dist/cli.js --input=D:/baidupandownload/图片输入  --output=D:/baidupandownload/输出切割图片/ --maxpixels=4000000`
    );

    console.error("输入的参数有误!");
    process.exit(1);
}

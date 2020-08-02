import fs from "fs";
//import path from "path";
const fspromises = fs.promises;
export default async function loadjson(pathdir: string | URL) {
    const imageconfigbuffer = await fspromises.readFile(pathdir);
    const config = JSON.parse(imageconfigbuffer.toString());
    return config;
}

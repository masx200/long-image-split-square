import fs from "fs";
const fspromises = fs.promises;
export default async function loadjson(pathdir) {
    const imageconfigbuffer = await fspromises.readFile(pathdir);
    const config = JSON.parse(imageconfigbuffer.toString());
    return config;
}

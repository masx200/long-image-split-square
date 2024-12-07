import fs from "fs";
import IMAGECONFIG from "./IMAGECONFIG";
//import path from "path";
const fspromises = fs.promises;
/**
 * Asynchronously loads and parses a JSON file containing image configuration.
 *
 * This function reads a JSON file from the specified path or URL and parses its contents into an image configuration object.
 * It is designed to handle file paths represented as strings or URLs, providing flexibility for accessing configurations
 * from different sources. The use of async/await ensures non-blocking file reading and parsing, suitable for asynchronous operations.
 *
 * @param pathdir - The path or URL to the image configuration file. Supports local file paths and network URLs.
 * @returns A promise that resolves to an object of type IMAGECONFIG, representing the parsed image configuration.
 */
export default async function loadjson(
    pathdir: string | URL
): Promise<IMAGECONFIG> {
    const imageconfigbuffer = await fspromises.readFile(pathdir);
    const config = JSON.parse(imageconfigbuffer.toString());
    return config as IMAGECONFIG;
}

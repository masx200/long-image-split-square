import stream from "node:stream";
declare const _default: typeof gmcrop;
export default _default;
declare function gmcrop(
    inputfile: string,
    outfile: string,
    width: number,
    height: number,
    left: number,
    top: number
): Promise<{
    stdout: string;
    stderr: string;
    cmd: string;
}>;
export declare function streamToString(
    readable: stream.Readable | string
): Promise<string>;

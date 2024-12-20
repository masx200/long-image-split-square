import gm from "gm";
declare const _default: typeof gmresize;
export default _default;
export declare const gm_sub: gm.SubClass | typeof gm;
declare function gmresize(
    inputfile: string,
    outfile: string,
    width: number,
    height: number,
    maxpixels: number
): Promise<{
    stdout: string;
    stderr: string;
    cmd: string;
}>;

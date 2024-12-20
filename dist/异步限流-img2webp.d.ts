declare const _default: typeof img2webp;
export default _default;
declare function img2webp(
    input: string,
    output: string
): Promise<{
    stdout: string;
    stderr: string;
    cmd: string;
    args: string[];
}>;
export declare function cwebp_crop(
    input: string,
    output: string,
    width: number,
    height: number,
    left: number,
    top: number
): Promise<{
    stdout: string;
    stderr: string;
    cmd: string;
    args: string[];
}>;

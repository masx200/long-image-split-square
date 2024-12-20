import child_process from "child_process";

const { execFile } = child_process;
export interface EXECERROR {
    error: child_process.ExecException;
    stdout: string;
    stderr: string;
}
/**
 * 执行外部命令并返回标准输出和标准错误输出
 * 该函数使用 Node.js 的 child_process 模块中的 execFile 方法来执行指定的命令
 * 并将其标准输出和标准错误输出作为 Promise 的结果返回
 *
 * @param cmd 要执行的命令
 * @param args 命令的参数数组
 * @returns 一个 Promise 对象，解析为包含标准输出和标准错误输出的对象
 */
export default function executeCommand(
    cmd: string,
    args: string[]
): Promise<{ stdout: string; stderr: string; cmd: string; args: string[] }> {
    return new Promise((res, rej) => {
        execFile(cmd, args, function (error, stdout, stderr) {
            if (error) {
                return rej({ error, stdout, stderr, cmd, args });
            } else {
                /*有的程序会往标准错误输出里写入*/
                return res({ stdout, stderr, cmd, args });
            }
        });
    });
}

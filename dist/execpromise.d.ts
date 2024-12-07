import child_process from "child_process";
export interface EXECERROR {
    error: child_process.ExecException;
    stdout: string;
    stderr: string;
}
export default function executeCommand(
    cmd: string,
    args: string[]
): Promise<{
    stdout: string;
    stderr: string;
}>;

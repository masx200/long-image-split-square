import child_process from "child_process";
const { execFile } = child_process;
export default function executeCommand(cmd, args) {
    return new Promise((res, rej) => {
        execFile(cmd, args, function (error, stdout, stderr) {
            if (error) {
                return rej({ error, stdout, stderr, cmd, args });
            } else {
                return res({ stdout, stderr, cmd, args });
            }
        });
    });
}

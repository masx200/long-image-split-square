import process from "process";
import parseargs from "@masx200/mini-cli-args-parser";
const argsobj = parseargs(process.argv.slice(2));
export default argsobj;

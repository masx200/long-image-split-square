import 创建异步限流队列 from "@masx200/async-task-current-limiter";
import argsobj from "./parsed-cli-options.js";
const 同时读取的最大文件数 = Number(argsobj["concurrent"]) || 8;
const 图片处理限流 = 创建异步限流队列(同时读取的最大文件数);
export default 图片处理限流;

import { wrapasynclimit } from "./wrap-async-function.js";
import { gm_sub } from "./异步限流-gmresize.js";
export default wrapasynclimit(getimgsize);
async function getimgsize(filename) {
    const result = await new Promise((s, j) => {
        gm_sub(filename).size((e, dimensions) => {
            if (e) {
                return j(e);
            } else {
                return s(dimensions);
            }
        });
    });
    return result;
}

export default 创建异步限流队列;
import createeventtarget from "@masx200/event-emitter-target";
function 创建异步限流队列(同时读取的最大文件数) {
    if (!(同时读取的最大文件数 > 0)) {
        throw Error();
    }
    const cachesymbol = new Map();
    const getsymbolcached = (name) => {
        const cached = cachesymbol.get(name);
        if (cached) {
            return cached;
        }
        else {
            const s = Symbol(name);
            cachesymbol.set(name, s);
            return s;
        }
    };
    let pointer = 0;
    let 当前同时读取的文件数 = 0;
    const target = createeventtarget();
    const queue = [];
    let shouldrun = true;
    target.on("free", () => {
        shouldrun = true;
        next();
    });
    target.on("full", () => {
        shouldrun = false;
    });
    function next() {
        const index = pointer;
        if (!shouldrun) {
            return;
        }
        if (index >= queue.length) {
            shouldrun = false;
            return;
        }
        if (status() === "full") {
            shouldrun = false;
            return;
        }
        incre();
        const funargs = queue[index];
        if (!funargs) {
            throw Error();
        }
        const [fun, args] = funargs;
        const promise = Promise.resolve(Reflect.apply(fun, undefined, args));
        const settle = () => {
            target.emit(getsymbolcached("settle" + index), promise);
            decre();
            queue[index] = undefined;
        };
        promise.then(settle, settle);
        pointer++;
        Promise.resolve().then(() => {
            next();
        });
    }
    function add(funargs) {
        let index = queue.length;
        queue.push(funargs);
        if (status() === "free") {
            shouldrun = true;
            next();
        }
        return new Promise(res => {
            target.once(getsymbolcached("settle" + index), (settledpromise) => {
                res(settledpromise);
            });
        });
    }
    function status() {
        return 当前同时读取的文件数 < 同时读取的最大文件数 ? "free" : "full";
    }
    const asyncwrap = function (fun) {
        return async function (...args) {
            return await 文件读取队列.add([fun, args]);
        };
    };
    const 文件读取队列 = {
        add,
        asyncwrap,
        status,
        limiter: {
            get max() {
                return 同时读取的最大文件数;
            },
            get current() {
                return 当前同时读取的文件数;
            }
        },
        queue: {
            get max() {
                return queue.length;
            },
            get current() {
                return pointer;
            }
        },
        target
    };
    function decre() {
        if (当前同时读取的文件数 - 1 < 0) {
            throw Error();
        }
        当前同时读取的文件数--;
        dispatchstatus();
    }
    function dispatchstatus() {
        if (当前同时读取的文件数 >= 同时读取的最大文件数) {
            target.emit("full", status());
        }
        else {
            target.emit("free", status());
        }
    }
    function incre() {
        if (当前同时读取的文件数 < 同时读取的最大文件数) {
            当前同时读取的文件数++;
            dispatchstatus();
        }
        else {
            throw Error();
        }
    }
    return 文件读取队列;
}
//# sourceMappingURL=创建异步限流队列.js.map
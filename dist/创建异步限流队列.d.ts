export default 创建异步限流队列;
export declare type 空闲状态 = "free" | "full";
export interface FUNANDARGS<T, S extends FUNRETPRO<T>> extends Array<any> {
    0: S;
    1: Parameters<S>;
    length: 2;
}
declare type FUNRETPRO<T> = (...arg: any[]) => Promise<T>;
export declare type 队列类型 = ReturnType<typeof 创建异步限流队列>;
declare function 创建异步限流队列(
    同时读取的最大文件数: number
): {
    add: <T, S extends FUNRETPRO<T>>(funargs: FUNANDARGS<T, S>) => Promise<T>;
    asyncwrap: <T_1 extends (...args: any[]) => Promise<any>>(fun: T_1) => T_1;
    status: () => 空闲状态;
    limiter: {
        readonly max: number;
        readonly current: number;
    };
    queue: {
        readonly max: number;
        readonly current: number;
    };
    target: {
        [Symbol.toPrimitive]: () => string;
        [Symbol.toStringTag]: string;
        [Symbol.iterator]: () => IterableIterator<
            [
                string | symbol,
                import("@masx200/event-emitter-target").EVENTLISTENER[]
            ]
        >;
        entries: () => IterableIterator<
            [
                string | symbol,
                import("@masx200/event-emitter-target").EVENTLISTENER[]
            ]
        >;
        listenerCount: (name: string | symbol) => number;
        clear: (name: string | symbol) => void;
        removeAllListeners: (name: string | symbol) => void;
        on: (
            name: string | symbol,
            callback: import("@masx200/event-emitter-target").EVENTLISTENER
        ) => void;
        addListener: (
            name: string | symbol,
            callback: import("@masx200/event-emitter-target").EVENTLISTENER
        ) => void;
        off: (
            name: string | symbol,
            callback: import("@masx200/event-emitter-target").EVENTLISTENER
        ) => void;
        removeListener: (
            name: string | symbol,
            callback: import("@masx200/event-emitter-target").EVENTLISTENER
        ) => void;
        once: (
            name: string | symbol,
            callback: import("@masx200/event-emitter-target").EVENTLISTENER
        ) => void;
        emit: (name: string | symbol, event?: any) => void;
        dispatch: (name: string | symbol, event?: any) => void;
        eventNames: () => (string | symbol)[];
        listeners: (
            name: string | symbol
        ) => import("@masx200/event-emitter-target").EVENTLISTENER[];
    };
};

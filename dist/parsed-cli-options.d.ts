declare const argsobj: Record<string, string | boolean> & {
    [Symbol.iterator]: () => IterableIterator<string>;
};
export default argsobj;

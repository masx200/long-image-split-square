function findfiles(pattern, root) {
    return new Promise((s, j) => {
        find.file(pattern, root, (files) => {
            s(files);
        }).error((e) => {
            j(e);
        });
    });
}
export default findfiles;
import find from "find";

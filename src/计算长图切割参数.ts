export default function 计算长图切割参数(height: number, width: number) {
    if (height > width * 3 && width > 400) {
        /* 竖向切割,只有top在变 */
        const 切割个数 = Math.floor(height / width);
        const left = 0;
        const w = Math.floor(width);
        const h = Math.floor(height / 切割个数);
        return Array(切割个数)
            .fill(undefined)
            .map((v, index) => {
                const top = Math.floor(h * index);
                return { left, top, width: w, height: h };
            });
    } else if (width > height * 3 && height > 400) {
        /* 横向切割，只有left在变 */
        const 切割个数 = Math.floor(width / height);
        const top = 0;
        const w = Math.floor(width / 切割个数);
        const h = Math.floor(height);
        return Array(切割个数)
            .fill(undefined)
            .map((v, index) => {
                const left = Math.floor(w * index);
                return { left, top, width: w, height: h };
            });
    } else {
        return;
    }
}
/* 长图判定方法

图片长边与短边的比例大于3，且短边大于400像素 */

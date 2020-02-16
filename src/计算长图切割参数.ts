export default function 计算长图切割参数(height: number, width: number) {
    if (height > width * 3 && width > 400) {
        var 切割个数 = Math.floor(height / width);

        return Array(切割个数)
            .fill(undefined)
            .map((v, index) => {
                var left = 0;

                var w = Math.floor(width);
                var h = Math.floor(height / 切割个数);
                var top = Math.floor(h * index);
                return { left, top, width: w, height: h };
            });
    } else {
        return;
    }
}

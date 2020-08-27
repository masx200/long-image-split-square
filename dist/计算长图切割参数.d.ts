export default function 计算长图切割参数(
    height: number,
    width: number
):
    | {
          left: number;
          top: number;
          width: number;
          height: number;
      }[]
    | undefined;

# long-image-split-square

此仓库仅供学习交流之用

批量把长图竖直或水平拆分成接近正方形的小图片的脚本

给文件读取异步操作限流,防止文件打开过多报错

这些图片往往是微博图片特色，或者是全景照片

## 安装依赖

先安装 `GraphicsMagick`

```shell
sudo apt install graphicsmagick
```

或者下载`GraphicsMagick`

https://cdn.jsdelivr.net/gh/masx200/long-image-split-square@GraphicsMagick-1.3.34-Q16-win64/GraphicsMagick-1.3.34-Q16-win64-dll.exe.zip

https://cdn.jsdelivr.net/gh/masx200/long-image-split-square@GraphicsMagick-1.3.34-Q16-win64/GraphicsMagick-1.3.34.tar.xz

如果要处理`webp`文件需要安装`libwebp`

```shell
sudo apt install  libwebp
```

或者下载`libwebp`的可执行文件

http://downloads.webmproject.org/releases/webp/

https://cdn.jsdelivr.net/gh/masx200/long-image-split-square@libwebp/libwebp-1.0.1-windows-x64.zip

https://cdn.jsdelivr.net/gh/masx200/long-image-split-square@libwebp-1.1.0-aarch64/libwebp-1.1.0-aarch64.zip

官方说明

https://github.com/webmproject/libwebp

http://www.linuxfromscratch.org/blfs/view/svn/general/libwebp.html

http://www.graphicsmagick.org/README.html

## 安装 `node_modules`

```
yarn add @masx200/long-image-split-square
```

```shell
yarn install
```

## 编译脚本

```shell
yarn build
```

## 运行脚本

```shell
yarn start
```

# 长图判定方法

图片长边与短边的比例大于 3，且短边大于 400 像素,横向或竖向均可

## 配置

编辑`image-config.json`文件

https://github.com/masx200/long-image-split-square/blob/master/dist/IMAGECONFIG.d.ts

`inputextentions`：输入的文件扩展名,使用逗号分隔

`input`：输入文件的目录

`output`：输出文件的目录

`outputextention`:输出文件的扩展名

`maxpixels`:输出图片的最大像素总数限制,若无限制,则为 0

```ts
interface IMAGECONFIG {
    inputextentions: string[];
    input: string;
    output: string;
    outputextention: string;
    maxpixels: number;
}
```

# 支持的图片格式

`webp` 和 `GraphicsMagick Supported Formats`

https://github.com/masx200/long-image-split-square/blob/master/gm%20convert%20-list%20format.txt

http://www.graphicsmagick.org/formats.html

# 命令行用法示例

必选参数 `input`:类型`string`,输入图片目录

必选参数 `output`:类型`string`,输出图片目录

可选参数 `maxpixels`:类型`number`,输出图片最大像素数

可选参数 concurrent:类型:number,同时运行的图片处理进程最大值

可选参数 gm-path: 类型:string,输入 gm 的路径

可选参数 cwebp-path: 类型:string,输入 cwebp 的路径

```shell
node ./dist/cli.js --input=D:/baidupandownload/图片输入  --output=D:/baidupandownload/输出切割图片/
```

```shell
node ./dist/cli.js --input=D:/baidupandownload/图片输入  --output=D:/baidupandownload/输出切割图片/ --maxpixels=4000000 --concurrent=4
```

```shell
npx @masx200/long-image-split-square --input=D:/baidupandownload/图片输入  --output=D:/baidupandownload/输出切割图片/ --maxpixels=4000000
```

# 更新日志

升级版本 GraphicsMagick 1.3.45 之后支持了 webp 作为输入文件格式了

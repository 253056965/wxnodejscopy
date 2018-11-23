
import * as path from "path"
import FileUtil from "./FileUtil";
import * as fs from "fs";
export default class WxGame {
    public static getSrcToDistMap(srcPath: string, srcFiles: Array<string>, dist: string) {
        let map: Map<string, string> = new Map();
        srcFiles.forEach((item, index) => {
            let temp = item.replace(srcPath, "")
            let tempPath = path.join(dist, temp);
            map.set(item, tempPath);
        });
        return map;
    }
    public static copyFileToWx(srcPath: string, filePath: string, dist: string) {
        let srcFiles = FileUtil.getFileText(filePath);
        let map = WxGame.getSrcToDistMap(srcPath, srcFiles, dist);
        map.forEach((v, k) => {
            if (fs.existsSync(k)) {
                FileUtil.mkdirs(v)
                FileUtil.copy(k, v);
                console.log(`当前目录${k}=====目标目录${v}`)
            }
        })
    }
}
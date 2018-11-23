import * as path from "path"
import FileUtil from "./FileUtil";
import * as fs from "fs";
export default class WxGame {
    public static getSrcToDistMap(srcPath: string, srcFiles: Array<string>, dist: string) {
        let map: Map<string, string> = new Map();
        srcFiles.forEach((item, index) => {
            let dirname = path.dirname(item);
            let basename = path.basename(item);
            let extName = path.extname(item);
            let files = fs.readdirSync(dirname);
            files.forEach((fl) => {
                let newName = fl.substring(0, fl.indexOf("."))
                if (`${newName}${extName}` == basename) {
                    //console.log(fl);
                    item = path.join(dirname,fl);
                }
            })
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
            console.log(k)
            if (fs.existsSync(k)) {
                FileUtil.mkdirs(v)
                FileUtil.copy(k, v);
                console.log(`当前目录${k}=====目标目录${v}`)
            }
        })
    }
}
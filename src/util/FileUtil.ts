import * as path from "path"
import * as fs from "fs"
export default class FileUtil {
    public static mkdirs(filePath: string) {
        let temppath = path.dirname(filePath);
        FileUtil.mkdirsForLinux(temppath);
    }
    private static mkdirsForLinux(dirpath: string) {
        let dirs = dirpath.split(path.sep);
        //console.log(temppath);
        let pathtmp = null;
        dirs.forEach((dirname, index) => {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
                //console.log(pathtmp);
            } else {
                pathtmp = "/" + dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                fs.mkdirSync(pathtmp)
            }
        })
    }
    public static copy(src: string, dst: string) {
        if (fs.existsSync(src)) {
            if (fs.existsSync(dst)) {
                fs.unlinkSync(dst);
            }
        }
        let readable = fs.createReadStream(src);
        let writable = fs.createWriteStream(dst, { encoding: "utf8" });
        readable.pipe(writable);
    }
    private static mkdirsForWindos(filePath: string) {
        //filePath
        //path.sep
    }

    public static getFileText(filePath: string): Array<string> {
        let texts: Array<string> = new Array();
        if (fs.existsSync(filePath)) {
            let text = fs.readFileSync(filePath, "utf-8");
            let d = text.split("\n");
            texts = texts.concat(d);
        }
        return texts;
    }
}
import FileUtil from "./util/FileUtil";
import WxGame from "./util/WxGame"
class App {
    public static main() {
        WxGame.copyFileToWx("/Users/wuyake/Documents/tools","/Users/wuyake/Documents/tools/path.txt","/Users/wuyake/Documents/testtools/")
    }
}
App.main();
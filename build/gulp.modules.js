const yn = require("yn");
const exec = require("child_process").exec;
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const gulp = require("gulp");
const glob = require("glob");
const projectRoot = global.process.cwd();
const lockFilePath = projectRoot + "/build-lock.json";

const cwd = path.join(
    __dirname,
    "../",
    process.argv.includes("--private") ? "private-modules" : "modules"
);
const getAllModulesRoot = () => {
    return glob
        .sync("**/package.json", {
            cwd,
            ignore: ["**/node_modules/**", "**/node_production_modules/**"],
        })
        .map((x) => path.join(cwd, x))
        .map((x) => path.dirname(x));
};
const readModuleConfig = (modulePath) => {
    const packagePath = path.join(modulePath, "package.json");
    if (!fs.existsSync(packagePath)) {
        throw new Error(
            `Module "${modulePath}" didn't have a package.json file at its root`
        );
    }
    return JSON.parse(fs.readFileSync(packagePath));
};
const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};
/**
 * Command Build Module
 * @author HuyVo huyvh19@gmail.com
 * @param {*} moduleName
 * @param {*} cb
 * @param {*} env
 */
const runCommand = (moduleName, cb, env) => {
    const buildCommand = `npm run mix ${env} ${moduleName}`;
    console.log(buildCommand);
    exec(
        `${buildCommand}`,
        {
            /*cwd: "" */
            maxBuffer: 1024 * 1024 * 1000,
        },
        (err, stdout, stderr) => {
            if (err) {
                console.error(stderr);
                return cb(err);
            }
            cb();
        }
    );
};
async function notDoing() {
    console.log("Don't have module need build");
}
const readBuildLock = () => {
    //lock json
    let lockData = {};
    if (fs.existsSync(lockFilePath)) {
        try {
            lockData = JSON.parse(fs.readFileSync(lockFilePath));
        } catch (e) {}
    }
    return lockData;
};
function replaceAll(str, find, replace) {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, "g"), replace);
}
const checkUpdate = (newVersion, oldVersion) => {
    newVersion = replaceAll(newVersion, ".", "");
    oldVersion = replaceAll(oldVersion, ".", "");
    if (newVersion > oldVersion) {
        return true;
    }
    return false;
};
/**
 * Build AllModule
 * @author HuyVo huyvh19@gmail.com
 * @returns
 */
const buildAllModules = () => {
    const modules = getAllModulesRoot();
    const tasks = modules
        .map((m) => {
            const config = readModuleConfig(m);
            const moduleName = capitalize(_.get(config, "name", "Unknown"));
            //module json
            let jsonData = fs.readFileSync(
                projectRoot + "/modules/" + moduleName + "/package.json"
            );
            jsonData = JSON.parse(jsonData);
            //
            lockData = readBuildLock();
            let taskName = "";
            if (
                lockData[moduleName] == undefined ||
                checkUpdate(jsonData.version, lockData[moduleName].version)
            ) {
                //build
                taskName = `build-module ${moduleName}`;
                gulp.task(taskName, (cb) => {
                    runCommand(
                        moduleName,
                        (err) => {
                            if (!err) {
                                let lockData = readBuildLock();
                                lockData[moduleName] = {};
                                lockData[moduleName].version = jsonData.version;
                                fs.writeFileSync(
                                    lockFilePath,
                                    JSON.stringify(lockData)
                                );
                            }
                            cb();
                        },
                        "production"
                    );
                });
            }
            return taskName;
        })
        .filter((m) => m != "");
    if (yn(process.env.GULP_PARALLEL)) {
        return gulp.parallel(tasks);
    }
    if (tasks.length == 0) {
        return notDoing;
    }
    return gulp.series([tasks]);
};

// const devModule = () => {
//    console.log(1);
//    let moduleName = process.argv[3] ? process.argv[3] : null;

//    if (moduleName) {
//       const taskName = `build-module ${moduleName}`;
//       const tasks = gulp.task(taskName, (cb) => {
//          runCommand(moduleName, cb, "production");
//       });
//       gulp.series(tasks);
//    }
//    return gulp.series(["build-module:Ktv"]);
// };
const build = () => {
    return gulp.series([buildAllModules()]);
};

// const dev = () => {
//    console.log(process.argv);
//    const prod = process.argv.includes("--prod") ? "--nomap" : "";
//    // gulp.task("build:studio", gulp.series([devModule]));
//    // return gulp.series(["build:studio"]);
// };

module.exports = {
    build,
    // dev,
};

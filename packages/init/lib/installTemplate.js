import path from 'path'
import { pathExistsSync } from 'path-exists';
import fse from 'fs-extra';
import ora from 'ora';
import { log } from '@llzcli/utils';
import { getCacheDir } from "./downloadTemplate.js";

function getNpmPackageDir(cacheDir, template) {
    return path.resolve(cacheDir, template.npmName, 'template')
}

function copyTemplate(cacheDir, template, installDir) {
    const npmPackageDir = getNpmPackageDir(cacheDir, template);
    fse.copySync(npmPackageDir, installDir);
}

export default function installTemplate(selectedTemplate, opts) {
    const { force = false } = opts;
    const { template, name } = selectedTemplate;
    // 当前执行文件路径
    const rootdir = process.cwd();
    const installDir = path.resolve(rootdir, name);
    if(pathExistsSync(installDir)) {
        if(!force) {
            log.error(`当前目录下已存在${installDir}文件`);
            return
        }else {
            fse.removeSync(installDir);
            fse.ensureDirSync(installDir);
        }
    }else {
        fse.ensureDirSync(installDir);
    };
    copyTemplate(getCacheDir(), template, installDir)
}
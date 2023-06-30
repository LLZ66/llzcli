import { homedir } from 'os'
import path from 'path';
import { pathExistsSync } from 'path-exists';
import fse from 'fs-extra';
import ora from 'ora';
import { execa } from 'execa'
import { log, printErrorLog } from '@llzcli/utils';

const TEMP_HOME = '.llzcli'

export function getCacheDir() {
    return path.resolve(getTargetPath(), 'node_modules');
}

function getTargetPath() {
    return path.resolve(homedir(), TEMP_HOME, 'templates')
};

function makeCacheDir() {
    const cachePath = getCacheDir()
    if(!pathExistsSync(cachePath)) {
        fse.mkdirpSync(cachePath);
    }
};

async function downloadAddTemplate(template) {
    const { npmName, version} = template;
    const installCommand = 'npm install';
    const installArgs = [`${npmName}@${version}`];
    const cwd = getCacheDir()
    try {
        const subProcess = execa(installCommand, installArgs, {
            cwd
        });
        await subProcess;
    }catch(e) {
        printErrorLog(e)
    }
}



export default async function downloadTemplate(selectedTemplate) {
    const { template } = selectedTemplate;
    makeCacheDir();
    const spinner = ora('正在下载模板').start();
    try {
        await downloadAddTemplate(template);
        spinner.stop()
        log.info('下载成功')
    }catch(e) {
        spinner.stop()
        printErrorLog(e)
    }

}
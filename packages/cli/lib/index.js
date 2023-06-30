'use strict';
import path from 'node:path'
import semver from 'semver';
import chalk from 'chalk';
import { program } from 'commander'
import { log, isDebug } from '@llzcli/utils';
import createInitCommand from '@llzcli/init';
import { dirname } from 'dirname-filename-esm';
import fse from 'fs-extra'

const LOWEST_NODE_VERSION = '14.0.0';
const __dirname = dirname(import.meta);
const pkgPath = path.resolve(__dirname, "../package.json");
const pkg = fse.readJSONSync(pkgPath);

function checkNodeVersion() {
  console.log(process.version);
  if(semver.gt(LOWEST_NODE_VERSION, process.version)) {
    throw new Error(chalk.red(`llzcli 需要安装 ${LOWEST_NODE_VERSION} 版本以上的node.js`))
  };
}

function preAction() {
  checkNodeVersion();
};

process.on('uncaughtException', (e) => {
  if(isDebug) {
    console.log(e);
  }else {
    console.log(e.message);
  }
})

export default function(args) {

  program
    .name(Object.keys(pkg.bin)[0])
    .usage("<command> [options]")
    .version(pkg.version)
    .option("-d, --debug", "是否开启调试模式", false);

  createInitCommand(program);
  program.hook('preAction', preAction)
  program.parse(process.argv);
};


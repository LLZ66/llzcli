'use strict';

import log from './log.js';
import isDebug from './isDebug.js';
import { makeList, makeInput } from './inquirer.js';
import { getNpmInfo, getLastestVersion } from './npm.js';

function printErrorLog(e, type) {
  if(isDebug) {
    log.error(type, e)
  }else {
    log.error(type, e.message)
  }
}

export {
  log,
  isDebug,
  makeList,
  makeInput,
  getNpmInfo,
  getLastestVersion,
  printErrorLog,
}
#!/usr/bin/env node

import importLocal from 'import-local';
import log from 'npmlog';
import entry from '../lib/index.js';

if(importLocal(import.meta.url)) {
    log.info("cli", "使用本地cli版本")
}else {
    entry(process.argv)
}
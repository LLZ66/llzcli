'use strict';
import Command from '@llzcli/command';
import createTemplate from './createTemplate.js';
import downloadTemplate from './downloadTemplate.js';
import installTemplate from './installTemplate.js';
import { log } from '@llzcli/utils';

class InitCommand extends Command {
  get command() {
    return 'init [name]'
  }

  get descrition() {
    return 'init project'
  }

  get options() {
    return [
      ["-f, --force", "是否强制更新", false]
    ]
  }
  async action([name, opts]) {
    // 1:选择项目模板 生成项目信息
    const selectedTemplate = await createTemplate(name, opts);
    // 2:下载项目至缓存目录
    await downloadTemplate(selectedTemplate);
    // 3：安装项目至项目目录
    installTemplate(selectedTemplate, opts)
  }
  preAction() {
    // console.log('preaction');
  }
  postAction() {
    // console.log('postaction');
  }
}

function Init(instance) {
  return new InitCommand(instance);
};

export default Init; 

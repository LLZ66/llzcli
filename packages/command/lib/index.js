'use strict';

class Command {
  constructor(instance) {
    if(!instance) {
      throw new Error("command instance must not be null!")
    };
    this.program = instance;
    const cmd = this.program.command(this.command)
    cmd.description(this.descrition)
    if(this.options?.length > 0) {
      this.options.forEach(option => {
        cmd.option(...option)
      });
    };
    cmd.action((...params) => {
      this.action(params)
    })
    cmd.hook('preAction', () => {
      this.preAction()
    })
    cmd.hook('postAction', () => {
      this.postAction()
    })
    
  }
  get command() {
    throw new Error('command must be implements')
  }
  get descrition() {
    throw new Error('descrition must be implements')
  }
  get options() {
    return []
  }
  action() {
    throw new Error('action must be implements')
  }
  preAction() {
    //empty
  }
  postAction() {
    //empty
  }
}

export default Command;

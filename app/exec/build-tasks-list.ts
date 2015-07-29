import cmdm = require('../lib/tfcommand');
import cm = require('../lib/common');

export function describe(): string {
    return 'list build tasks';
}

export function getCommand(): cmdm.TfCommand {
    // this just offers description for help and to offer sub commands
    return new BuildTaskList;
}

// requires auth, connect etc...
export var isServerOperation: boolean = true;

// unless you have a good reason, should not hide
export var hideBanner: boolean = false;

export class BuildTaskList extends cmdm.TfCommand {
    public exec(args: string[], options: cm.IOptions): any {
        var agentapi = this.getWebApi().getQTaskAgentApi(this.connection.accountUrl);
        return agentapi.getTaskDefinitions(['Build']);
    }

    public output(data: any): void {
        if (!data) {
            throw new Error('no tasks supplied');
        }

        if (!(data instanceof Array)) {
            throw new Error('expected an array of tasks');
        }

        data.forEach((task) => {
            console.log();
            console.log('id   : ' + task.id);
            console.log('name : ' + task.name);
        });
    }   
}
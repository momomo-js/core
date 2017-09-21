import 'reflect-metadata';
import {Mo} from '../define/mo.class';
import {InstanceManager} from './instance-manager';

/**
 * 创建MoServer实例
 */
export class MoServer extends Mo {
    instanceManager: InstanceManager;

    /**
     * 创建实例
     * 单一Node进程中应只包含单一 Instance
     * @param instance 应用实例
     * @returns {Promise<MoServer>}
     */
    static async create(instance: any): Promise<MoServer> {
        const ins = new MoServer();
        if (ins && await ins.onCreate(instance)) {
            return ins;
        } else {
            throw new Error(`moServer create fail`);
        }
    }

    static ErrorHandler(reason: Error) {
        console.log(reason.stack);
        throw reason;
    }

    async onCreate(instance: any) {
        try {
            this.instanceManager = InstanceManager.create(instance, this);
            this.bindExitProcess();
            await this.onInit();
        } catch (e) {
            MoServer.ErrorHandler(e);
        }
        return true;
    }


    protected constructor() {
        super();
    }

    private async onInit() {
        await this.instanceManager.onInit();
    }

    private async onStart() {
        await this.instanceManager.onStart();
    }

    private async onStop() {
        await this.instanceManager.onStop();
    }

    async onExit() {
        await this.instanceManager.onExit();
    }

    /**
     * 开始加载服务器
     * 并设置状态
     */
    async startSever() {
        this.debug('starting MoBasicServer');
        await this.onStart();
    }


    /**
     * 绑定结束进程
     */
    private bindExitProcess() {
        process.on('SIGINT', () => {
            this.onStop().then(() => {
                this.onExit().then(() => {
                    process.exit(0);
                });
            });
        });
    }

}


/**
 * Created by yskun on 2017/5/15.
 * MoProject COPYRIGHT
 */

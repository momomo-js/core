import 'reflect-metadata';
import {ServerManager} from './server-manager';
import {MoBasicServer} from '../define/mo-server.class';
import {RouterManager} from './router-manager';
import {Component} from '../define/component.class';
import {ReflectiveInjector} from 'injection-js';
import {Mo} from '../define/mo.class';
import {MoApplicationCycleLife} from '../define/mo-cycle-life.interface';
import {INSTANCE, MODULE, MoServerToken, SERVER, TARGET} from '../decorator/symbol';
import {InstanceOptions} from '../define/instance-options.interface';
import {ModuleOptions} from '../define/module-options.interface';
import {ServerOptions} from '../define/server-options';
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
        this.instanceManager = InstanceManager.create(instance, this);
        this.bindExitProcess();
        await this.onInit().catch(MoServer.ErrorHandler);
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
        await this.onStart().catch(MoServer.ErrorHandler);
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

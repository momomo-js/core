import { IRouter } from "./router.interface";
export interface IController {
    modelList: Map<String, Object>;
    router: IRouter;
}

import { Response, Router } from 'express';
import HandlerResponse from '@customTypes/handlerResponse';
import { defaultHandler } from '..//handlers/handler';
import { IRouter } from 'express';
export type handlerFunction = (message: string, ...args: any) => Promise<any>;
export type modelFunction = (...args: any) => Promise<any>;

export interface defaultRoute {
  path: string;
  args?: any[];
  message: string;
  handler?: handlerFunction;
  modelFunction?: modelFunction;
}

// Provides support for register default routes
// These are routes that don't do anything but call handlers / models
// TODO : sanitize path inputs to add '/' if they dont have
// TODO : return error if args are missing? need some system to determine which should get through...
export default class RouteHandler {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  sendResponse(handlerResponse: HandlerResponse, res: Response) {
    res.status(handlerResponse.statusCode).send(handlerResponse);
  }

  register(
    type: string,
    path: string,
    message: string,
    handler: handlerFunction,
    args: any[] = [],
  ) {
    // Keeps track of method specific information
    const methodFunctionMap: any = {
      get: {
        methodFunction: this.router.get,
        argSourceKey: 'params',
      },
      post: {
        methodFunction: this.router.post,
        argSourceKey: 'body',
      },
    };

    type = type.toLowerCase();
    const methodFunction = methodFunctionMap[type].methodFunction;
    const argSourceKey = methodFunctionMap[type].argSourceKey; // Depending on request, will need to extract from either params or body

    methodFunction.bind(this.router)(path, (req: any, res: any) => {
      const handlerArgs = args.map(arg => req[argSourceKey][arg]);

      handler(message, ...handlerArgs)
        .then((handlerResponse: HandlerResponse) => this.sendResponse(handlerResponse, res))
        .catch(err => console.error('ERROR: ', err));
    });
  }

  // Takes in an array of default routes and adds them to the router
  registerDefaults(defaultRoutes: defaultRoute[]) {
    for (const route of defaultRoutes) {
      let args = []; // The model function is used by the default handler so it needs to be added to the args first
      if (route.modelFunction) args.push(route.modelFunction);
      if (route.args) args = args.concat(route.args);

      const explodedUrl = route.path.split('+');
      const method = explodedUrl[0];
      const path = explodedUrl[1];

      this.register(method, path, route.message, route.handler || defaultHandler, args);
    }
  }
}

import HandlerResponse from '@/types/handlerResponse';
import { modelFunction } from '../routes/route';

export const defaultSuccessResponse: HandlerResponse = {
  statusCode: 200,
  message: 'good',
  success: true,
};

export const defaultFailResponse: HandlerResponse = {
  statusCode: 401,
  message: 'Something went wrong',
  success: false,
};

// Handles promise and response creation database interactions that
// don't need any extra steps
export function defaultModelHandler(
  successMessage: string,
  modelPromise: Promise<any>,
  includeData = true,
) {
  return new Promise((resolve, reject) => {
    const response = { ...defaultSuccessResponse };
    response.message = successMessage;

    modelPromise
      .then(modelResponse => {
        if (includeData) response.data = modelResponse;
        resolve(response);
      })
      .catch(err => {
        console.log(1, err);
        const failedResponse = { ...defaultFailResponse };
        failedResponse.data = { message: err.toString() };
        resolve(failedResponse);
      });
  });
}

// Default handler function for routes that don't need
// anything extra besides querying the db
export function defaultHandler(message: string, modelFunction: modelFunction, ...args: any) {
  const modelPromise = modelFunction(...args);
  return defaultModelHandler(message, modelPromise);
}

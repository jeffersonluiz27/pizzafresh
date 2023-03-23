import { LocalStorageKeys } from "types/localStorageKeys";
import { LocalStorageHelper } from "helpers/LocalStorageHelper";
import { Auth } from "helpers/Auth";

type args = [input: RequestInfo, init?: RequestInit | undefined];

function requestInterceptor(config: RequestInit | undefined){
  if(config){
    const token = {
      Authorization: `Bearer ${LocalStorageHelper.get(LocalStorageKeys.TOKEN)}`,
    };
    config.headers = {...config.headers, ...token};
  }
}

function responseReceptor(res: Response){
  if(res.status === 401) Auth.logout();
}

export const Api = async (...args: args) : Promise<Response> => {
  let [url, config] = args;
  requestInterceptor(config);
  const response = await fetch(url, config);
  responseReceptor(response);
  return response;
}
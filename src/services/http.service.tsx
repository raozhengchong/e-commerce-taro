import axios, { AxiosRequestConfig } from 'axios';

type IMethod = 'GET' | 'PUT' | 'DELETE' | 'POST';

interface ICommonOption {
  [key: string]: any;
}

// 创建一个Axios实例以便于统一配置
const instance = axios.create();

// 修改请求拦截器以使用 btoa 替代 Buffer
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 添加基本认证头
    const username = 'ck_d869f154cb59edbaf95b7f853dfda8a45bee0bff';
    const password = 'cs_02a2cae0f8bdc3d109d49d7c7aa90e70d3135583';
    const auth = btoa(`${username}:${password}`);
    config.headers = { ...config.headers, Authorization: `Basic ${auth}` };
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

const http = (method: IMethod, url: string, data: ICommonOption = {}, headerMaps?: ICommonOption, otherParams?: ICommonOption): Promise<any> => {
  const requestAddress = 'https://optical6.com/wp-json/wc/v3';
  const requestData = data;

  return new Promise((resolve) => {
    const axiosSendConfig: ICommonOption = {
      method: method,
      withCredentials: false,
      url: `${requestAddress}${url}`,
      headers: headerMaps,
      timeout: otherParams && otherParams.timeout ? otherParams.timeout : 300000
    };

    if (method === 'GET') {
      axiosSendConfig.params = requestData;
    } else {
      const contentType = axiosSendConfig.headers['content-type'];
      axiosSendConfig.data = JSON.stringify(requestData);
      axiosSendConfig.headers['content-type'] = contentType || 'application/json';
    }

    instance(axiosSendConfig)
      .then((response) => {
        const { code = '', data = {}, msg = '' } = response.data;

        if (!code) {
          resolve([null, response.data]);
          return;
        }

        // if (code === 401 || code === 10005) {
        //   return false;
        // }

        resolve([{ code, msg }, data]);
      })
      .catch((err) => {
        console.warn('err:', err);
        resolve([{}, null]);
      });
  });
};

export { http };

// undici-shim.js - 一个简单的undici垫片
// 用于解决在Node.js环境中使用Web API的问题

// 导出一个空对象来替代undici
export default {};

// 如果需要，可以添加一些基本的polyfill
if (typeof globalThis.File === 'undefined') {
  globalThis.File = class File {};
}

export const fetch = globalThis.fetch || function() {
  throw new Error('fetch is not available in this environment');
};

export const Request = globalThis.Request || class Request {};
export const Response = globalThis.Response || class Response {};
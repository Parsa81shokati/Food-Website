const { ProxyAgent, setGlobalDispatcher } = require("undici");

const proxy = new ProxyAgent("http://127.0.0.1:10809");

setGlobalDispatcher(proxy);

console.log("✅ Global proxy enabled: http://127.0.0.1:10809");
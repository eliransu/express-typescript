"use strict";
/**
 * Bootstrap your App
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./providers/App");
// if (cluster.isMaster) {
//   NativeEvent.process();
//   App.clearConsole();
//   App.loadConfiguration();
//   const CPUS: any = os.cpus();
//   CPUS.forEach(() => cluster.fork());
//   NativeEvent.cluster(cluster);
//   App.loadQueue();
// 	setTimeout(() => App.loadWorker(), 1000 * 60);
// }else {
// App.loadDatabase();
App_1.default.loadServer();
// }
//# sourceMappingURL=index.js.map
/**
 * Bootstrap your App
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import * as os from "os";
import * as cluster from "cluster";

import App from "./providers/App";
import NativeEvent from "./exception/NativeEvent";

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
App.loadServer();
// }

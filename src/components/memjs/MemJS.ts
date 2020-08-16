import memjs from "memjs";
import memjsConfig from "../../config/memjs";

process.env.MEMCACHIER_SERVERS = `${memjsConfig.host}:${memjsConfig.port}`;

export class MemJS {
	static instance: memjs.Client = memjs.Client.create();
	static getInstance() {
		return this.instance;
	}
}

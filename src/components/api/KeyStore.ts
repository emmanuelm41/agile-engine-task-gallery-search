import config from "../../config/keys.js";
import { AgileEngine } from "./AgileEngine";

export class KeyStore {
    static instance: KeyStore;

    protected apiKey: string;
    protected token: string | null = null;

    static getInstance() {
        if (!this.instance) this.instance = new KeyStore(60);
        return this.instance;
    }

    constructor(ttl: number) {
        if (process.env.NODE_ENV === "production") {
            if (!process.env.API_KEY) throw new Error("No api key was configured");
            else this.apiKey = process.env.API_KEY;
        } else {
            this.apiKey = config.apiKey;
        }

        this.getAuthToken();

        setInterval(() => {
            this.getAuthToken();
        }, ttl * 1000);
    }

    private getAuthToken = async () => {
        try {
            const apiKey = this.apiKey;
            const response = await AgileEngine.getInstance().post("/auth", { apiKey });
            const {
                data: { auth, token },
            } = response;

            this.token = auth ? token : null;
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            this.token = null;
        }

        console.log(`Actual token: ${this.token}`);
    };

    public getAuthorizationHeader() {
        if (!this.token) throw new Error("No token is present");
        return { Authorization: `Bearer ${this.token}` };
    }

    public isToken() {
        return !!this.token;
    }
}

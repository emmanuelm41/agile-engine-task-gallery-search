import { GenericIndex } from "./GenericIndex";

export class Tag {
    static instance: GenericIndex;
    static getInstance() {
        if (!this.instance) this.instance = new GenericIndex();

        return this.instance;
    }
}

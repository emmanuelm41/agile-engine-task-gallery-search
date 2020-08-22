export class GenericIndex {
    index: { [key: string]: { [key: string]: any } } = {};

    constructor() {}

    addImem(indexValue: string, id: string, data: any = true) {
        let localIndex = this.index[indexValue] || {};

        localIndex[id] = data;
        this.index[indexValue] = localIndex;
    }

    getItem(indexValue: string) {
        return this.index[indexValue];
    }
}

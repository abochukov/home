export class Message<T> {
    public header: string;
    public body: T;

    constructor(header: string, body: T) {
        this.header = header;
        this.body = body;
    }
}
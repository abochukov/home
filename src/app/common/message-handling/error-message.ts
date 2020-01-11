import { Message } from './message';

export class ErrorMessage<T> extends Message<T> {
    constructor(header: string, body: T) {
        super(header, body);
    }
}
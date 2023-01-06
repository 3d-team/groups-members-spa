export class EchoResponder {
    callback: any;

    constructor(callback: any) {
        this.callback = callback;
    }

    fireAndForget(payload: any) {
        this.callback(payload)
    }
}
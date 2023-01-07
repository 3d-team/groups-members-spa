import axiosClient from "./axiosClient";

class ChatApi {

    constructor() {}

    static async send(data: any) {
        const url = `/api/chats`;
        return axiosClient.post(url, data);
    }
};

export default ChatApi;
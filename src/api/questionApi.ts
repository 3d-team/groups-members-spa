import axiosClient from "./axiosClient";

class QuestionApi {

    static async all(id: string) {
        const url = `/api/presentations/${id}/questions`;
        return axiosClient.get(url);
    }

    static async sendNewQuestion(data: any) {
        const url = `/api/questions`;
        return axiosClient.post(url, data);
    }

    static async markAnswered(id: string) {
        const url = `/api/questions/${id}?action=MARK_ANSWERED`;
        return axiosClient.post(url);
    }

    static async upVote(id: string) {
        const url = `/api/questions/${id}?action=UPVOTE`;
        return axiosClient.post(url);
    }
}

export default QuestionApi;
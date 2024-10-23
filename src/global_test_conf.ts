const conf: ITestCase[] = [];

export interface ITestCase {
    id: string,
    question: {
        type: "text" | "audio",
        src?: string,
        text?: string
    },
    variants:
    {
        type: "text" | "audio",
        src?: string,
        text?: string
    }[],
    answer: {
        good_answer_index: number,
        answer_user: number,
    }
}

export default conf;
export interface ILearnCaseAudio {
    language: "ru" | "eng" | "chn",
    language_icon: string,
    src: string,
    alt: string,
    text_origin: string,
    text_translate: string,
}

export interface ILearnCase {
    id: number,
    title: string,
    desc: {
        leng: string,
        icon: string,
        title: string,
        text: string
    }[],
    pic: {
        src: string,
        alt: string
    },
    audios: ILearnCaseAudio[],
}
import { useState } from "react"
import { ILearnCaseAudio } from "../../global_learn_cong";
import Btn from "../Btn";

function Audio(props: {
    audio: ILearnCaseAudio
}) {
    const [isView, setIsView] = useState(false); // Состояние показа "транскрипции"
    const handleOpen = () => {
        setIsView((state) => !state);
    }
    return (
        <div
            className='px-5 py-4 rounded-2xl w-full bg-dark-400 shadow-sm mb-4'
        >
            <div className='w-full flex gap-2 items-center mb-2'>
                <audio controls={true} src={props.audio.src} className="w-full">
                    Ваш браузер не поддерживает встроенное аудио. Попробуйте скачать его
                    <a href={props.audio.src} download>по ссылке</a>.
                </audio>
                <img className='w-full h-full max-h-[48px] max-w-[48px]' src={props.audio.language_icon} alt={`icon ${props.audio.language}`} />
                <Btn isArrow={true} isRotate={isView} onClick={handleOpen} children={undefined} />
            </div>
            {isView ? <p className="text-xl"><i>{props.audio.text_origin}</i></p> : null}
        </div>
    )
}

export default Audio
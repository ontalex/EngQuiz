import { Link, useParams } from 'react-router-dom'
import useFetch from '../../hooks/getLearn';
import { ILearnCase, ILearnCaseAudio } from '../../global_learn_cong';

function AudioComponent(props: {
    audio: ILearnCaseAudio
}) {
    return (
        <div
            className='p-4 rounded-md w-full'
        >
            <div className='w-full flex gap-2 items-center'>
                <audio controls={true} src={props.audio.src}>
                    Ваш браузер не поддерживает встроенное аудио. Попробуйте скачать его
                    <a href={props.audio.src} download>по ссылке</a>.
                </audio>
                <img className='w-full h-full max-h-[48px] max-w-[48px]' src={props.audio.language_icon} alt={`icon ${props.audio.language}`} />
            </div>
            <p><i>{props.audio.text_origin}</i></p>
        </div>
    )
}

function Lesson() {

    const { id } = useParams();

    const data = useFetch<ILearnCase>("/cases_learn.json", id);

    if (data.loading) {
        return <p>Loading...</p>
    }

    if (data.error) {
        return <p>Error...</p>
    }

    if (!id) {
        return <p>Error... Getting ID lesson</p>
    }

    if (!data.data) {
        return <p>Error... None data!</p>
    }

    return (
        <>
            <header
                className='p-4'>
                <Link
                    to={`/`}
                    className='block box-border px-5 py-3 rounded-md bg-black/30 w-max'
                >
                    <span className='text-white font-normal text-lg'>К карточкам</span>
                </Link>
            </header>
            <main className='p-5 w-max gap-4 max-w-[100svw]'>
                <div className='w-full min-w-fit'>
                    <img
                        className='w-full h-full max-w-[420px] max-h-[420px] object-cover rounded-md'
                        src={data.data?.pic.src}
                        alt={data.data?.pic.alt}
                    />
                    <h1 className='font-bold text-3xl my-6 text-center'>{data.data?.title}</h1>
                </div>
                <ul className='w-full min-w-full'>
                    {data.data?.audios.length == 0 ? <p>0 item</p> : null}
                    {
                        data.data?.audios.map((audio) => <AudioComponent audio={audio} key={audio.text_origin} />)
                    }
                </ul>
            </main></>
    )
}

export default Lesson
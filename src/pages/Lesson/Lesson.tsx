import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/getLearn';
import { ILearnCase } from '../../global_learn_cong';
import { joinStyle } from '../../utils/styles';
import LinkComponent from '../../components/LinkComponent';

import Audio from '../../components/Audio';

import st from "./lesson.module.css";
import React from 'react';
import LoadingStatus from '../../components/LoadingStatus';
function Lesson() {

    const { id } = useParams();

    const [translateIndex, setTranslateIndex] = React.useState(0);

    const data = useFetch<ILearnCase>("/cases_learn.json", id);

    if (data.loading) {
        return <LoadingStatus />
    }

    if (data.error) {
        return <p className='text-center'>Error...</p>
    }

    if (!id) {
        return <p className='text-center'>Error... Getting ID lesson</p>
    }

    if (!data.data) {
        return <p className='text-center'>Error... None data!</p>
    }

    return (
        <main className={joinStyle(st.page, "bg-dark-300 max-h-svh")}>
            <header
                className='w-full p-3 flex justify-start text-center bg-water-200'>
                <LinkComponent link={`/`} hasArrow={true} fullWidth={false}>
                    <span className='text-white font-normal text-lg'>Каталог</span>
                </LinkComponent>
            </header>
            <section className={joinStyle(st.section, 'p-5 gap-4 w-full max-w-[100svw] h-full overflow-y-scroll')}>
                <div className='w-full space-y-4'>
                    <div className='rounded-xl bg-dark-400 p-3 flex justify-center'>
                        <img
                            className='max-h-[420px] object-cover'
                            src={data.data?.pic.src}
                            alt={data.data?.pic.alt}
                        />
                    </div>
                    <div className='px-6 py-8 rounded-2xl bg-dark-400 shadow-md'>
                        <div className='flex justify-items-start'>
                            <ul className='flex items-center border-water-0 border-2 rounded-lg'>
                                {
                                    data.data?.desc.map(
                                        (item, index) => {
                                            const id = `#_${index}_${item.leng}`;
                                            return (
                                                <div>
                                                    <input
                                                        type="radio"
                                                        value={index}
                                                        id={id}
                                                        onChange={(event) => setTranslateIndex(+event.target.value)}
                                                        defaultChecked={index == 0}
                                                        name="desc"
                                                        className={joinStyle(st.input, "sr-only")}
                                                    />
                                                    <label htmlFor={id} className={joinStyle(st.item_leng, 'flex w-full py-2 px-4')}>
                                                        <div className='flex gap-2 items-center'>
                                                            <img className='w-6 h-6' src={item.icon} alt="" />
                                                            <p className='font-medium text-base uppercase'>{item.leng}</p>
                                                        </div>
                                                    </label>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </ul>
                        </div>
                        <h1 className='font-bold text-3xl my-6 text-center'>{data.data?.desc[translateIndex].title}</h1>
                        <p className='text-center font-normal text-lg'>{data.data?.desc[translateIndex].text}</p>
                    </div>
                </div>
                <ul className='w-full min-w-full list-none'>
                    {data.data?.audios.length == 0 ? <p className='text-center'>Нету аудио файлов</p> : null}
                    {
                        data.data?.audios.map(
                            (audio) => <Audio audio={audio} key={audio.text_origin} />
                        )
                    }
                </ul>
            </section>
        </main>
    )
}

export default Lesson
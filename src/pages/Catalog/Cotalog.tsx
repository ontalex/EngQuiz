import { ILearnCase } from '../../global_learn_cong.ts';
import useFetch from '../../hooks/getLearn.ts';

import st from "./Cotalog.module.css";
import { joinStyle } from '../../utils/styles.ts';
import LinkComponent from '../../components/LinkComponent/index.tsx';
import LoadingStatus from '../../components/LoadingStatus/index.tsx';
import React from 'react';

export default function Cotalog() {

    const learn_data = useFetch<ILearnCase[]>("./cases_learn.json", null);

    return (
        <>
            <main className={joinStyle(st.page)}>
                <section className='bg-slate-400 pb-20'>
                    <header className='w-full p-3 text-center bg-water-200'>
                        <h1 className='font-bold text-3xl text-dark-100'>PC Components Quiz</h1>
                    </header>
                    <div className='p-4'>
                        {learn_data.loading ? <LoadingStatus /> : null}
                        {learn_data.error ? <p className='text-center'>Тут какая-то ошибка...</p> : null}
                        {learn_data.data ? <List cases={learn_data.data} /> : <p className='text-center'>Не вижу данных</p>}
                    </div>
                </section>
            </main>
            <div className='fixed bottom-0 left-0 w-full p-3 flex justify-left items-center gap-4 bg-slate-500 bg-water-200'>
                <LinkComponent link={`/test`} hasArrow={true} fullWidth={false}>
                    <span className='text-white font-normal text-lg'>Тестирование</span>
                </LinkComponent>
            </div>
        </>
    )
}


function Card(props: {
    card: ILearnCase
}) {
    const [translateIndex, setTranslateIndex] = React.useState(0);

    return (
        <article className={joinStyle(st.card, "rounded-3xl p-4 bg-dark-400 gap-5 shadow-md")}>
            <img
                className='w-full h-full max-w-[320px] max-h-[320px] bg-grass-0 object-cover rounded-2xl'
                src={props.card.pic.src}
                alt={props.card.pic.alt}
            />
            <div className='box-border'>
                <ul className='w-max overflow-hidden flex items-center border-water-0 border-2 rounded-lg'>
                    {
                        props.card.desc.map(
                            (item, index) => {
                                const id = `#_${index}_${item.leng}_${props.card.id}`;
                                return (
                                    <div key={id} data-id={id}>
                                        <input
                                            type="radio"
                                            value={index}
                                            id={id}
                                            onChange={(event) => setTranslateIndex(+event.target.value)}
                                            defaultChecked={index == 0}
                                            name={`desc_${props.card.id}`}
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

                <h2 className='text-2xl mt-4 text-center font-medium'>{props.card.desc[translateIndex].title}</h2>
            </div>
            <LinkComponent link={`/lesson/${props.card.id}`} hasArrow={true} fullWidth={false}>
                <span>Изучить</span>
            </LinkComponent>
        </article>
    )
}

function List(props: {
    cases: ILearnCase[]
}) {
    return (
        <ul className={joinStyle(st.list, "w-full m-0 p-0 h-max")}>
            {
                props.cases.map((item) => <Card card={item} key={item.id} />)
            }
        </ul>
    )
}
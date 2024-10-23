import { Link } from 'react-router-dom';
import { ILearnCase } from '../../global_learn_cong.ts';
import useFetch from '../../hooks/getLearn.ts';
import React from 'react';

import st from "./Cotalog.module.css";
import { splitStyle } from '../../utils/styles.ts';

export default function Cotalog() {

    const learn_data = useFetch<ILearnCase[]>("./cases_learn.json", null);

    return (
        <>
            <main className={splitStyle(st.page)}>
                <section className='p-4 h-full bg-slate-400 overflow-y-scroll'>
                    <h1 className='font-bold text-3xl text-center'>Eng-China-Quize</h1>
                    <div>
                        {learn_data.loading ? <span>Loading...</span> : null}
                        {learn_data.error ? <span>Error...</span> : null}
                        {learn_data.data ? <List cases={learn_data.data} /> : <p>None data</p>}
                    </div>
                </section>
                <div className='w-full p-2 flex justify-between gap-4 bg-slate-500'>
                    <Link
                        to={`/test`}
                        className='block box-border px-5 py-3 rounded-md bg-black/30 w-max'
                    >
                        <span className='text-white font-normal text-lg'>Тестирование</span>
                    </Link>
                </div>
            </main>

        </>
    )
}

function Card(props: {
    card: ILearnCase
}) {
    return (
        <article className={splitStyle(st.card, "rounded-lg p-4")}>
            <img className='w-full h-full max-w-[320px] max-h-[320px] object-cover rounded-md' src={props.card.pic.src} alt={props.card.pic.alt} />
            <div className='box-border '>
                <h2 className='font-bold text-3xl my-6 text-center'>{props.card.title}</h2>

                <Link
                    to={`/lesson/${props.card.id}`}
                    className='block mx-auto box-border px-5 py-3 rounded-md bg-black/30 w-max'
                >
                    <span className='text-white font-normal text-lg'>Изучить</span>
                </Link>
            </div>
        </article>
    )
}

function List(props: {
    cases: ILearnCase[]
}) {
    React.useEffect(() => console.log(props.cases), [])
    return (
        <ul className={splitStyle(st.list, "m-0 p-0 w-max h-max")}>
            {
                props.cases.map((item) => <Card card={item} key={item.id} />)
            }
        </ul>
    )
}
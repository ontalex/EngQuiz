import { ILearnCase } from '../../global_learn_cong.ts';
import useFetch from '../../hooks/getLearn.ts';

import st from "./Cotalog.module.css";
import { joinStyle } from '../../utils/styles.ts';
import LinkComponent from '../../components/LinkComponent/index.tsx';
import LoadingStatus from '../../components/LoadingStatus/index.tsx';

export default function Cotalog() {

    const learn_data = useFetch<ILearnCase[]>("./cases_learn.json", null);

    return (
        <>
            <main className={joinStyle(st.page, "max-h-svh")}>
                <header className='w-full p-3 text-center bg-water-200'>
                    <h1 className='font-bold text-3xl text-dark-100'>Викторина ПК комплектующих</h1>
                </header>
                <section className='bg-slate-400 overflow-y-scroll'>
                    <div className='p-4'>
                        {learn_data.loading ? <LoadingStatus /> : null}
                        {learn_data.error ? <p className='text-center'>Тут какая-то ошибка...</p> : null}
                        {learn_data.data ? <List cases={learn_data.data} /> : <p className='text-center'>Не вижу данных</p>}
                    </div>
                </section>
                <div className='w-full p-3 flex justify-left items-center gap-4 bg-slate-500 bg-water-200'>
                    <LinkComponent link={`/test`} hasArrow={true} fullWidth={false}>
                        <span className='text-white font-normal text-lg'>Тестирование</span>
                    </LinkComponent>
                </div>
            </main>

        </>
    )
}

function Card(props: {
    card: ILearnCase
}) {
    return (
        <article className={joinStyle(st.card, "rounded-3xl p-4 bg-dark-400 gap-5 shadow-md")}>
            <img className='w-full h-full max-w-[320px] max-h-[320px] bg-grass-0 object-cover rounded-2xl' src={props.card.pic.src} alt={props.card.pic.alt} />
            <div className='box-border'>
                <h2 className='text-2xl mb-4 text-center font-medium'>{props.card.title}</h2>
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
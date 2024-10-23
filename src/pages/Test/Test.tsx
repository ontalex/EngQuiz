import { clean, create_answering, data_test, ITestStore, next_task } from '../../stores/testSlice';
// import { useAppDispatch, useAppSelector } from '../../stores/storeTest';
import { Link } from 'react-router-dom';
// import useFetch from '../../hooks/getLearn';
import React from 'react';
import { splitStyle } from '../../utils/styles';

import st from "./Test.module.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import { AsyncThunkAction } from '@reduxjs/toolkit';

export interface ITest {
    id: string;
    question: Question;
    variants: Question[];
    answer: Answer;
}

export interface Answer {
    good_answer_index: number;
}

export interface Question {
    type: string;
    text: string;
}

export default function Test() {
    const [indexSelect, setIndexSelect] = React.useState<{
        id: string,
        index: number
    } | undefined>();
    const [isError, setIsError] = React.useState<boolean>(false);
    const [isSelected, setIsSelected] = React.useState<boolean>(false);

    // const dispatch = useAppDispatch();
    const dispatch = useDispatch();
    // const test: ITestStore = useAppSelector(state => state.test)
    const test: ITestStore = useSelector((state: { test: ITestStore }) => state.test);
    // const testConf = useFetch<ITest[]>("/cases_test.json", null);

    const next_case = () => dispatch(next_task());
    const clean_history = () => dispatch(clean());
    const answering = (answer: number, id: string) => dispatch(create_answering({
        answer_index: answer,
        id: id
    }));

    const handleAnswering = () => {

        if (indexSelect != null) {
            console.log("handleAnswering - true");

            setIsError(false);
            setIndexSelect(undefined);

            answering(indexSelect.index, indexSelect.id);
            next_case();
        } else {
            console.log("handleAnswering - false");
            setIsError(true);
        }
        console.log("STORE: ", test);
    }
    const handleChoseAnswer = (index: number, id: string) => {
        console.log("Chose:", index);
        setIndexSelect({ index: index, id: id });

        setIsError(false);
        setIsSelected(true);
    }
    const handleClean = () => {
        setIsError(false);
        setIndexSelect(undefined);
        setIsSelected(false);
        clean_history();
        window.location.reload();
    }

    React.useEffect(
        () => {
            dispatch(data_test());
        },
        [dispatch]
    );

    if (test.loading) {
        console.log("TEST (test.loading):", test);
        return (
            <p>Loading...</p>
        )
    }

    if (test.error) {
        console.log("TEST (test.error):", test);
        return (
            <p>Error: {test.error}</p>
        )
    }

    if (test.is_end && !test.loading && !test.error && test.varians.length > 0) {
        return (
            <section className={splitStyle(st.section, 'bg-slate-500 max-h-[100svh] h-full')}>
                <header className='w-full p-5 bg-slate-600'>
                    <Link
                        to={`/`}
                        className='block box-border px-5 py-3 rounded-md bg-black/30 w-max'
                    >
                        <span className='text-white font-normal text-lg'>К карточкам</span>
                    </Link>
                </header>
                <main className='w-full p-5 overflow-y-scroll flex flex-col items-center justify-center'>
                    <h1 className='text-3xl text-center font-bold'>Итоги</h1>
                    <p className='text-lg my-5 text-center'>{test.statistic.good_answered} из {test.statistic.total}</p>
                    <button
                        className='block box-border px-5 py-3 bg-red-800 text-white font-medium rounded-md'
                        onClick={handleClean}
                    >
                        <span>Заново</span>
                    </button>
                </main>
                <footer></footer>
            </section>
        )
    } else if (!test.is_end && !test.loading && !test.error && test.varians.length > 0) {
        console.log("TEST (!test.is_end && !test.loading && !test.error):", test);
        return (
            <section className={splitStyle(st.section, 'bg-slate-500 max-h-[100svh] h-full')}>
                <header className='w-full p-5 bg-slate-600'>
                    <Link
                        to={`/`}
                        className='block box-border px-5 py-3 rounded-md bg-black/30 w-max'
                    >
                        <span className='text-white font-normal text-lg'>К карточкам</span>
                    </Link>
                </header>

                <main className='w-full p-5 overflow-y-scroll'>

                    {test.loading ? <p>Loading...</p> : null}

                    {test.error ? <p>Error...</p> : null}

                    {test.varians ? <div>
                        <div className='flex items-center gap-4 mb-4'>
                            <span className='block w-8 h-8 border-black border-[3px] rounded-full text-center text-[18px] font-sans font-bold'>?</span>
                            {
                                test.varians[test.current_state].question.type == "text" ?
                                    <h1 className='text-xl'>{test.varians[test.current_state].question.text}</h1> :
                                    null
                            }
                        </div>

                        <ul className='grid grid-cols-1 gap-4'>
                            {
                                test.varians && test.varians.length > 0 ?
                                    test.varians[test.current_state].variants.map((item, index) => {

                                        // console.log(data?.id + "_" + index + "_" + item.text);

                                        const data = test.varians ? test.varians[test.current_state] : {
                                            id: ""
                                        };

                                        return (<label
                                            className='flex flex-nowrap gap-2 items-center bg-white/20 py-2 px-4 rounded-md'
                                            htmlFor={data?.id + "_" + index + "_" + item.text}
                                            key={data?.id + "_" + index + "_" + item.text}
                                        >
                                            <input
                                                type="radio"
                                                name={data?.id + "_answer"}
                                                id={data?.id + "_" + index + "_" + item.text}
                                                value={index}
                                                onChange={() => handleChoseAnswer(index, data?.id)}
                                            />
                                            <span className='text-lg'>{item.text}</span>
                                        </label>)
                                    }) :
                                    <p className='text-center'>Нету данных</p>
                            }
                        </ul>

                    </div> : null}

                </main>

                <footer className='w-full flex items-center gap-4 p-5 bg-slate-600 font-sans'>
                    <button
                        className='block box-border px-5 py-3 bg-red-800 text-white font-medium rounded-md'
                        onClick={handleClean}
                    >
                        <span>Заново</span>
                    </button>
                    <button
                        className='w-full block box-border px-5 py-3 bg-green-800 disabled:text-white/50 text-white font-medium rounded-md'
                        onClick={handleAnswering}
                        disabled={(isError || !isSelected)}
                    >
                        <span>Ответить</span>
                    </button>
                </footer>

            </section>

        )
    }


}

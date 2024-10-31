import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITest } from "../pages/Test/Test";
import axios from "axios";

export interface ITestStore {
    current_state: number,
    count_variants: number,
    varians: ITest[],
    statistic: {
        good_answered: number,
        total: number
    },
    answers_user: TStoreAnswer[],
    is_end: boolean,
    loading: boolean,
    error: string | null,
}

type TStoreAnswer = {
    id: number,
    answer: number,
    is_good?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const data_test: any = createAsyncThunk('test/fetchTestData', async (_, thunkAPI) => {
    try {
        const req = await axios("/cases_test.json");
        return req.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: "Some Error!" });
    }
});

const initial: ITestStore = {
    current_state: 0,
    answers_user: [],
    varians: [],
    statistic: {
        good_answered: 0,
        total: 0
    },
    is_end: false,
    count_variants: 0,
    loading: false,
    error: null,
};

const testSlice = createSlice({
    name: "test",
    initialState: initial,
    reducers: {
        next_task(state: ITestStore) {
            console.group('next_task');
            console.log("Переход на следующий тест");
            console.log(state.current_state);
            console.groupEnd();

            state.current_state++;
            state.is_end = state.current_state == state.statistic.total;
        },

        clean() {
            localStorage.removeItem("test_data");
            return {
                ...initial
            };
        },

        create_answering(state: ITestStore, action) {
            console.group('create answering');
            console.log("State:", state);
            console.log("Action:", action);

            const case_test_find = state.varians.filter((item) => item.id == action.payload.id);

            state.answers_user.push({
                id: action.payload.id,
                answer: action.payload.answer_index,
                is_good: case_test_find[0].answer.good_answer_index == action.payload.answer_index
            });

            if (case_test_find[0].answer.good_answer_index == action.payload.answer_index) {
                state.statistic.good_answered++;
            }

            console.log("Store-current_state:", state.current_state);
            console.log("Answers-answers_user:", state.answers_user);
            console.groupEnd();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(data_test.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(data_test.fulfilled, (state, action) => {
                state.loading = false;
                state.varians = action.payload; // установить данные в varians
                state.statistic.total = action.payload.length; // установите общее количество вариантов

                console.log("STATE:", state);
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(data_test.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error; // сохранить сообщение об ошибке
            });
    }
});

export const { next_task, clean, create_answering } = testSlice.actions;
export default testSlice.reducer;
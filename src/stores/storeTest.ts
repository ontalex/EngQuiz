import { configureStore } from '@reduxjs/toolkit';

import testReducers from "./testSlice";
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        test: testReducers
    },
})


export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
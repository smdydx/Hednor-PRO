"use client";
import { Provider } from 'react-redux';
import { store } from '@/state/store/store';
export const ReactReduxProvider = ({ children }: {
    children: React.ReactNode
}) => {

    return <Provider store={store}>
        {children}
    </Provider>;
};
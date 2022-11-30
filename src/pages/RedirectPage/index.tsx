import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {useAppDispatch} from '@/redux';
import {authActions} from '@/redux/feature/auth/slice';

export default function RedirectPage() {

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatcher = useAppDispatch();
    
    setTimeout(() => {
        const token = searchParams.get('token');
        const tokenValue = (token) ? token : "cc";
        console.log(searchParams.get('token'));
        dispatcher(authActions.setToken(tokenValue));
        dispatcher(authActions.loginSucceed());
        window.location.href = "/";
      }, 3000);

    return (
        <CircularProgress />
    );
};
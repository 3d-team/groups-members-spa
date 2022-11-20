import {useAppSelector} from '@/redux';
import React from 'react';
import {useSelector} from 'react-redux';

export default function Home() {
  const data = useAppSelector(state => state.user.data);
  console.log('@DUKE__', data);

  return <div>home</div>;
}

import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import styles from './styles.module.css';

export default function PresentShow() {
  const {presentationId} = useParams();
  console.log('@DUKE___presentId: ', presentationId);

  // const getPresentationById


  useEffect(()=>{
    // fetch data of presentation
  })
  
  return (
    <div>
      <div>hello</div>
    </div>
  );
}

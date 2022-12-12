import { MockMultipleChoice, MultipleChoiceModel } from '@/models/page';
import React from 'react'
import styles from './styles.module.css'
interface Props {
    data: MultipleChoiceModel
}

const PreviewSlide = ({data = MockMultipleChoice}: Props) => {
  return (
    <div className={styles.container}>
        <div className={styles.slide}></div>
    </div>
  )
}


export default PreviewSlide;
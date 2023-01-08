import {MultipleChoiceModel} from '@/models/presentation';
import React, {useState} from 'react';

import styles from './styles.module.css';

interface Props {
  data: MultipleChoiceModel;
}

export default function SlideOption({data}: Props) {
  const [choosedIndex, setChoosedIndex] = useState<number>(0);
  return (
    <div className={styles.container}>
      <p className={styles.title}>{data.title}</p>
      <div>
        {data.options.map((item, index) => {
          return (
            <div>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

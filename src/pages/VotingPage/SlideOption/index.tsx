import {MultipleChoiceModel} from '@/models/presentation';
import {Check} from '@mui/icons-material';
import React, {useEffect, useState} from 'react';

import styles from './styles.module.css';

interface Props {
  data: MultipleChoiceModel;
  onChooseOption: (prevIndex: number, newIndex: number) => void;
  slideIndex: number;
}

export default function SlideOption({data, onChooseOption, slideIndex}: Props) {
  const [choosedIndex, setChoosedIndex] = useState<number>(-1);

  const onPressRadioBtn = (newIndex: number) => {
    onChooseOption(choosedIndex, newIndex);
    setChoosedIndex(newIndex);
  };

  useEffect(() => {
    setChoosedIndex(0);
  }, [slideIndex]);

  return (
    <div>
      <p className={styles.title}>{data.title}</p>
      <div>
        {data.options.map((item, index) => {
          if (!item.name) return;
          return (
            <div className={styles.optionCtn}>
              <button className={styles.radioCustom} onClick={() => onPressRadioBtn(index)}>
                {index === choosedIndex && <Check sx={{color: '#fff'}} />}
              </button>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

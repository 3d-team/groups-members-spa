import {MockMultipleChoice, MultipleChoiceModel} from '@/models/page';
import Helper from '@/ultilities/Helper';
import {DoneAll, RemoveCircleOutline} from '@mui/icons-material';
import {TextField} from '@mui/material';
import React, {useState} from 'react';
import styles from './styles.module.css';

const ToolSide = () => {
  const [data, setData] = useState<MultipleChoiceModel>(MockMultipleChoice);

  const onChangeQuestion = (text: string) => {
    setData(prev => {
      return {
        ...prev,
        title: text,
      };
    });
  };

  const onChangeOptionTitle = (text: string, index: number) => {
    setData(prev => {
      const newOptions = [...prev.options];
      newOptions[index].name = text;
      return {
        ...prev,
        options: newOptions,
      };
    });
  };

  const deleteOption = (index: number) => {
    setData(prev => {
      return {
        ...prev,
        options: Helper.removeItemByIndex(prev.options, index),
      };
    });
  };

  const addOption = () => {
    setData(prev => {
      return {
        ...prev,
        options: [...prev.options, {name: '', value: 0}],
      };
    });
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Tools</p>
      <div className={styles.toolCtn}>
        <div className={styles.tools}>
          <div className={styles.section}>
            <p className={styles.heading}>Your question: </p>
            <input
              className={styles.inputText}
              value={data.title}
              type={'text'}
              onChange={e => {
                onChangeQuestion(e.target.value);
              }}
            />
          </div>

          <div className={styles.section}>
            <p className={styles.heading} style={{marginBottom: 16}}>
              Options:
            </p>
            <div className={styles.optionsCtn}>
              {data.options.map((item, index) => {
                return (
                  <div className={styles.option}>
                    <input
                      className={styles.inputText}
                      placeholder={`Option ${index + 1}`}
                      value={item.name}
                      type={'text'}
                      onChange={e => {
                        onChangeOptionTitle(e.target.value, index);
                      }}
                    />
                    <button
                      className={styles.deleteButton}
                      onClick={() => {
                        deleteOption(index);
                      }}>
                      <RemoveCircleOutline />
                    </button>
                  </div>
                );
              })}
            </div>
            <button className={styles.addOptionBtn} onClick={addOption}>
              + Add option
            </button>
          </div>

          <div>
            <input className={styles.radioBtn} type="radio" id="bar-chart" name="fav_language" value="barchart" />
            <label htmlFor="bar-chart">Bar chart</label>
            <br />
            <br />
            <input className={styles.radioBtn} type="radio" id="pie-chart" name="fav_language" value="piechart" />
            <label htmlFor="pie-chart">Pie chart</label>
          </div>
        </div>
      </div>
      <button className={styles.button}>
        <DoneAll />
        <p style={{marginLeft: 8}}>Submit Changes!</p>
        <div></div>
      </button>
    </div>
  );
};

export default ToolSide;
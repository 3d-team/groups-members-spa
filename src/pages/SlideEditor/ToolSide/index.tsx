import {ChartType, MockMultipleChoice, MultipleChoiceModel} from '@/models/presentation';
import Helper from '@/ultilities/Helper';
import {BarChart, DoneAll, PieChart, RemoveCircleOutline} from '@mui/icons-material';
import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

interface Props {
  onChangeChart: (type: ChartType) => void;
  selectedType: ChartType;
  onSubmitData: (data: MultipleChoiceModel) => void;
  currentData: MultipleChoiceModel;
}

interface ChartOption {
  type: ChartType;
  name: string;
}

const ChartOptions: ChartOption[] = [
  {
    type: 'bar-chart',
    name: 'Bars',
  },
  {
    type: 'pie-chart',
    name: 'Pie',
  },
];

const mock: MultipleChoiceModel = {
  backgroundImage: '',
  options: [],
  title: '',
  type: 'multiple-choice',
};

const ToolSide = ({onChangeChart, selectedType = 'bar-chart', onSubmitData, currentData}: Props) => {
  const [data, setData] = useState<MultipleChoiceModel>(currentData || mock);
  // console.log('@DUKE____WHAT', {data, mock});

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

  const renderChartIcon = (type: ChartType) => {
    switch (type) {
      case 'bar-chart':
        return <BarChart />;
      case 'pie-chart':
        return <PieChart />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (currentData) {
      setData(currentData);
    }
  }, [currentData]);

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

          <div className={styles.chartBtnCtn}>
            {ChartOptions.map((item, index) => {
              return (
                <button
                  className={clsx([styles.chartBtn, selectedType === item.type && styles.chartSelected])}
                  onClick={() => {
                    onChangeChart(item.type);
                  }}>
                  {renderChartIcon(item.type)}
                  <p>{item.name}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          onSubmitData(data);
        }}>
        <DoneAll />
        <p style={{marginLeft: 8}}>Save</p>
        <div></div>
      </button>
    </div>
  );
};

export default ToolSide;

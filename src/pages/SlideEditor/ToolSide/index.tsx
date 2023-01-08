import {ChartType, MockMultipleChoice, MultipleChoiceModel, OptionModel} from '@/models/presentation';
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
  paragraph: '',
  type: 'multiple-choice',
};

const ToolSide = ({onChangeChart, selectedType = 'bar-chart', onSubmitData, currentData}: Props) => {
  const [data, setData] = useState<MultipleChoiceModel>(currentData);

  const onChangeHeading = (text: string) => {
    setData(prev => {
      return {
        ...prev,
        title: text,
      };
    });
  };

  const onChangeParagraph = (text: string) => {
    setData(prev => {
      return {
        ...prev,
        paragraph: text,
      };
    });
  };

  const onChangeOptionTitle = (text: string, index: number) => {
    setData(prev => {
      return {
        ...prev,
        options: prev.options.map((item: OptionModel, _index) => {
          if (_index === index) {
            return {
              ...item,
              name: text,
            };
          }
          return item;
        }),
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
        options: [...prev.options, {uuid: '', name: '', value: 0}],
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
  if (!data) {
    return <></>;
  }
  return (
    <div className={styles.container}>
      <p className={styles.title}>Tools</p>

      <div className={styles.toolCtn}>
        <div className={styles.tools}>
          <div className={styles.section}>
            <p className={styles.heading}>Heading: </p>
            <input
              className={styles.inputText}
              value={data.title}
              type={'text'}
              onChange={e => {
                onChangeHeading(e.target.value);
              }}
            />
          </div>

          <div className={styles.section}>
            <p className={styles.heading}>Paragraph: </p>
            <input
              className={styles.inputText}
              value={data.paragraph}
              type={'text'}
              onChange={e => {
                onChangeParagraph(e.target.value);
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
                  <div className={styles.option} key={index}>
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
                  key={index}
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

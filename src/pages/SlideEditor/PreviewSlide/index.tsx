import {ChartType, MockMultipleChoice, MultipleChoiceModel, OptionModel} from '@/models/presentation';
import CustomBarChart from './CustomBarChart';
import CustomPieChart from './CustomPieChart';
import styles from './styles.module.css';
interface Props {
  data: MultipleChoiceModel;
  type?: ChartType;
}

const PreviewSlide = ({data = MockMultipleChoice, type = 'bar-chart'}: Props) => {
  const renderChart = (type: ChartType, data: OptionModel[]) => {
    switch (type) {
      case 'bar-chart':
        return <CustomBarChart data={data} />;
      case 'pie-chart':
        return <CustomPieChart data={data} />;
      default:
        return <></>;
    }
  };

  const _width = data?.options?.length ? 100 + data.options.length * 100 : 200;

  return (
    <div className={styles.container}>
      <div className={styles.slide}>
        <div className={styles.content}>
          <div className={styles.questionCtn}>
            <p className={styles.question}>{data.title}</p>
          </div>
          <p className={styles.question}>{data.paragraph}</p>
          <div className={styles.chartCtn}>
            <div style={{width: type === 'bar-chart' ? _width : '100%', height: '100%'}}>{renderChart(type, data.options)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSlide;

import {ChartType, MockMultipleChoice, MultipleChoiceModel} from '@/models/page';
import CustomBarChart from './CustomBarChart';
import CustomPieChart from './CustomPieChart';
import styles from './styles.module.css';
interface Props {
  data: MultipleChoiceModel;
  type?: ChartType;
}

const PreviewSlide = ({data = MockMultipleChoice, type = 'pie-chart'}: Props) => {
  const renderChart = (type: ChartType) => {
    switch (type) {
      case 'bar-chart':
        return <CustomBarChart />;
      case 'pie-chart':
        return <CustomPieChart />;
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.slide}>
        <div className={styles.content}>
          <div className={styles.questionCtn}>
            <p className={styles.question}>Chọn ngày vấn đáp đi mấy đứa!</p>
          </div>
          <div className={styles.chartCtn}>{renderChart(type)}</div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSlide;

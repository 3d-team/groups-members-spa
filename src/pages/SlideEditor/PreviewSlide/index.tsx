import {ChartType, MockMultipleChoice, MultipleChoiceModel, OptionModel} from '@/models/page';
import CustomBarChart from './CustomBarChart';
import CustomPieChart from './CustomPieChart';
import styles from './styles.module.css';
interface Props {
  data: MultipleChoiceModel;
  type?: ChartType;
}

const PreviewSlide = ({data = MockMultipleChoice, type = 'pie-chart'}: Props) => {
  
  const renderChart = (type: ChartType, data: OptionModel[]) => {
    switch (type) {
      case 'bar-chart':
        console.log('@DUKE_DATA_BAR', data);

        return <CustomBarChart data={data} />;
      case 'pie-chart':
        console.log('@DUKE_DATA_PIE', data);
        
        return <CustomPieChart data={data} />;
      default:
        return <></>;
    }
  };

  const _width = data?.options?.length ? 100 + data.options.length*100 : 200;  

  return (
    <div className={styles.container}>
      <div className={styles.slide}>
        <div className={styles.content}>
          <div className={styles.questionCtn}>
            <p className={styles.question}>Chọn ngày vấn đáp đi mấy đứa!</p>
          </div>
          <div className={styles.chartCtn}>
            <div style={{width: _width, height: '90%'}}>{renderChart(type, data.options)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSlide;

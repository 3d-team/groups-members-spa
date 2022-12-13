import styles from './styles.module.css';
import {ChartType, MultipleChoiceModel} from '@/models/presentation';

interface Props {
  data: MultipleChoiceModel | undefined;
  typeChart: ChartType;
}

export default function MultipleChoice({data, typeChart}: Props) {
  return <div className={styles.container}>MultipleChoice</div>;
}

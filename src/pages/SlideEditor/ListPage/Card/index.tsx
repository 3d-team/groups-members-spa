import {TemplatePage} from '@/models/page';
import styles from './styles.module.css';

interface Props {
  template: TemplatePage;
}

export default function Card({template}: Props) {
  return <div className={styles.container}>Card</div>;
}

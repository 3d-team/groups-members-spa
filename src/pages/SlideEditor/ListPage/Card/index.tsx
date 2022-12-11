import {TemplatePage} from '@/models/page';
import Default from '../../Template/Default';
import MultipleChoice from '../../Template/MultipleChoice';
import styles from './styles.module.css';

interface Props {
  template: TemplatePage;
}

export default function Card({template}: Props) {
  switch (template) {
    case 'multiple-choice':
      return <MultipleChoice />;
    default:
      return <Default />;
  }
  return <div className={styles.container}>Card</div>;
}

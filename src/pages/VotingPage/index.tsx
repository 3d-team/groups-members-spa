import {useParams} from 'react-router-dom';
import styles from './styles.module.css';

export default function VotingPage() {
  const presentationId = useParams();
  console.log('@DUKE__this is presentation id: ', presentationId);

  return <div className={styles.container}>VotingPage</div>;
}

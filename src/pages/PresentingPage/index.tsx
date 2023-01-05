import {useParams} from 'react-router';

export default function PresentingPage() {
  const presentationId = useParams();

  return <div>PresentingPage</div>;
}

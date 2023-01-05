import {MockMultipleChoice, MOCK_PRESENTATION_MODEL, MultipleChoiceModel, PresentationModel} from '@/models/presentation';
import {ChevronLeft, ChevronRight} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import SlideShow from './SlideShow';
import styles from './styles.module.css';

export default function PresentingPage() {
  const presentationId = useParams();
  const [currentSlideIndex, setcurrentSlideIndex] = useState<number>(0);
  const [presentation, setPresentation] = useState<PresentationModel>((): PresentationModel => {
    return {
      ...MOCK_PRESENTATION_MODEL,
      slides: [
        {
          type: 'multiple-choice',
          title: 'Who is the best football player in the world?',
          backgroundImage: '',
          paragraph: '',
          options: [
            {uuid: '1', name: 'Cristio Ronaldo', value: 7},
            {uuid: '2', name: 'Leo Messi', value: 7},
            {uuid: '3', name: 'Pele', value: 10},
            {uuid: '4', name: 'Mbappe', value: 6},
          ],
        },
        MockMultipleChoice,
      ],
    };
  });

  useEffect(() => {
    // 1. callApi get presentation data
    // 2. set
  }, []);

  const increasePage = () => {
    setcurrentSlideIndex(prev => {
      return prev >= presentation.slides.length ? presentation.slides.length : prev + 1;
    });
  };

  const decreasePage = () => {
    setcurrentSlideIndex(prev => {
      return prev <= 0 ? 0 : prev - 1;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.slidePage}>
        <p>{`${currentSlideIndex}/${presentation.slides.length}`}</p>
      </div>
      <div className={styles.arrowBtn} onClick={decreasePage}>
        <ChevronLeft sx={{fontSize: 50, color: '#fff'}} />
      </div>
      <SlideShow data={presentation.slides[currentSlideIndex]} type={'bar-chart'} />
      <div className={styles.arrowBtn} onClick={increasePage}>
        <ChevronRight sx={{fontSize: 50, color: '#fff'}} />
      </div>
    </div>
  );
}

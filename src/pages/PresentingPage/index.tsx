import {ChartType, MockMultipleChoice, MOCK_PRESENTATION_MODEL, PresentationModel} from '@/models/presentation';
import {ChevronLeft, ChevronRight, ContactSupport} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import SlideShow from './SlideShow';
import styles from './styles.module.css';
import {Widget, addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import {fontSize} from '@mui/system';
import {dialogRef, showDialog} from '../Home/index.props';
import DialogContainer from '../Home/DialogContainer';

export default function PresentingPage() {
  const presentationId = useParams();
  const [currentSlideIndex, setcurrentSlideIndex] = useState<number>(0);
  const [typeChart, setTypeChart] = useState<ChartType>('bar-chart');
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

  // Listen incomming message, remember that: don't forget add dependencies in useEffect() hook
  useEffect(() => {
    addResponseMessage('Hello, this is respone message');
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

  const getNewMessage = (newMessage: any) => {
    console.log(`New message incoming! ${newMessage}`);
  };

  const showQuestionDialog = () => {
    showDialog('question');
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
      <div className={styles.chatBox}>
        <Widget handleNewUserMessage={getNewMessage} title={'Group Chatting'} subtitle={'Chat box of this presentation'} emojis showBadge={false} />
      </div>
      {/* button open dialog question here */}
      <div className={styles.questionBtn} onClick={showQuestionDialog}>
        <ContactSupport sx={{fontSize: 50, color: '#fff'}} />
      </div>
      <DialogContainer ref={dialogRef} />
    </div>
  );
}

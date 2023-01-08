import {ChartType, MockMultipleChoice, MOCK_PRESENTATION_MODEL, PresentationModel} from '@/models/presentation';
import {ChevronLeft, ChevronRight, ContactSupport} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {v4 as uuidv4} from 'uuid';

import styles from './styles.module.css';
import {Widget, addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import {dialogRef, showDialog} from '../Home/index.props';
import DialogContainer from '../Home/DialogContainer';
import PresentationApi from '@/api/presentationApi';
import {EchoResponder} from '@/api/EchoResponder';
import UserApi from '@/api/userApi';
import ChatApi from '@/api/chatApi';
import SlideOption from './SlideOption';

const {IdentitySerializer, JsonSerializer, RSocketClient} = require('rsocket-core');
const RSocketWebSocketClient = require('rsocket-websocket-client').default;

export default function VotingPage() {
  const {presentationId} = useParams();
  const [currentSlideIndex, setcurrentSlideIndex] = useState<number>(1);
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

  const fetchPresentation = async (presentationId: string) => {
    const response: PresentationModel = await PresentationApi.findById(presentationId);
    setPresentation(response);
  };
  // useEffect(() => {
  //   fetchPresentation(String(presentationId));
  // }, []);

  const increasePage = () => {
    setcurrentSlideIndex(prev => {
      return prev >= presentation.slides.length ? presentation.slides.length : prev + 1;
    });
  };

  const decreasePage = () => {
    setcurrentSlideIndex(prev => {
      return prev <= 1 ? 1 : prev - 1;
    });
  };

  /* End RSocket */

  return (
    <div className={styles.container}>
      <div className={styles.slidePage}>
        <p>{`${currentSlideIndex}/${presentation.slides.length}`}</p>
      </div>
      <div className={styles.arrowBtn} onClick={decreasePage}>
        <ChevronLeft sx={{fontSize: 50, color: '#fff'}} />
      </div>
      <SlideOption data={presentation.slides[currentSlideIndex - 1]} />
      <div className={styles.arrowBtn} onClick={increasePage}>
        <ChevronRight sx={{fontSize: 50, color: '#fff'}} />
      </div>
    </div>
  );
}

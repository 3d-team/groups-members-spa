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
  const [currentSlideIndex, setcurrentSlideIndex] = useState<number>(0);
  const [typeChart, setTypeChart] = useState<ChartType>('bar-chart');
  const [isSumit, setIsSubmit] = useState<boolean>(false);
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
        {
          type: 'multiple-choice',
          title: 'Who is the best singer in Viet Nam?',
          backgroundImage: '',
          paragraph: '',
          options: [
            {uuid: '1', name: 'Đan Trường', value: 11},
            {uuid: '2', name: 'Cẩm Ly', value: 7},
            {uuid: '3', name: 'Mỹ Tâm', value: 10},
            {uuid: '4', name: 'Sơn Tùng MTP', value: 6},
          ],
        },
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

  const submit = () => {
    setcurrentSlideIndex(prev => {
      return prev >= presentation.slides.length - 1 ? presentation.slides.length - 1 : prev + 1;
    });
    if (currentSlideIndex + 1 === presentation.slides.length) {
      // callApi submit this presentation ===  api save this presentation
      setIsSubmit(true);
    }
  };

  const onChooseOption = (prevIndex: number, newIndex: number) => {
    setPresentation(prev => {
      return {
        ...prev,
        slides: prev.slides.map((item, index) => {
          if (index === currentSlideIndex) {
            return {
              ...item,
              options: item.options.map((option, _index) => {
                if (_index === prevIndex) {
                  return {
                    ...option,
                    value: option.value - 1,
                  };
                }
                if (_index === newIndex) {
                  return {
                    ...option,
                    value: option.value + 1,
                  };
                }
                return option;
              }),
            };
          }
          return item;
        }),
      };
    });
  };

  console.log('@DUKE___presentation', presentation.slides[currentSlideIndex]);

  /* End RSocket */

  return (
    <div className={styles.container}>
      {isSumit ? (
        <div className={styles.thanksMessage}>Thanks you for submit!</div>
      ) : (
        <>
          <div className={styles.slidePage}>
            <p>{`${currentSlideIndex + 1}/${presentation.slides.length}`}</p>
          </div>
          <div className={styles.slideContainer}>
            <div>
              <SlideOption data={presentation.slides[currentSlideIndex]} onChooseOption={onChooseOption} slideIndex={currentSlideIndex} />
              <button onClick={submit} className={styles.submitButton}>
                {currentSlideIndex + 1 === presentation.slides.length ? 'Submit' : 'Next question'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

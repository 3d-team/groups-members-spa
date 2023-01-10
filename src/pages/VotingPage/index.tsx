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

const sampleData: PresentationModel = {
  ...MOCK_PRESENTATION_MODEL,
  slides: [
    {
      type: 'multiple-choice',
      title: '',
      backgroundImage: '',
      paragraph: '',
      options: [
        {uuid: uuidv4(), name: '', value: 0},
        {uuid: uuidv4(), name: '', value: 0},
        {uuid: uuidv4(), name: 'Pele', value: 0},
      ],
    },
    {
      type: 'multiple-choice',
      title: '',
      backgroundImage: '',
      paragraph: '',
      options: [
        {uuid: uuidv4(), name: '', value: 0},
        {uuid: uuidv4(), name: '', value: 0},
        {uuid: uuidv4(), name: '', value: 0},
      ],
    },
  ],
};

export default function VotingPage() {
  const {presentationId} = useParams();
  const [currentSlideIndex, setcurrentSlideIndex] = useState<number>(0);
  const [typeChart, setTypeChart] = useState<ChartType>('bar-chart');
  const [isSumit, setIsSubmit] = useState<boolean>(false);
  const [presentation, setPresentation] = useState<PresentationModel>(sampleData);
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");

  const fetchPresentation = async (presentationId: string) => {
    const response: PresentationModel = await PresentationApi.findById(presentationId);
    setPresentation(response);
  };
  useEffect(() => {
    fetchPresentation(String(presentationId));
  }, []);

  const submit = async () => {
    await voting(selectedOptionId);
    setcurrentSlideIndex(prev => {
      return prev >= presentation.slides.length - 1 ? presentation.slides.length - 1 : prev + 1;
    });
    if (currentSlideIndex + 1 === presentation.slides.length) {
      // callApi submit this presentation ===  api save this presentation
      setIsSubmit(true);
    }
    
  };

  const onChooseOption = (prevIndex: number, newIndex: number, uuid: string) => {
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
    setSelectedOptionId(uuid);
  };

  const voting = async (uuid: string) => {
    const payload = {
      optionId: uuid,
      clientId: clientId
    };
    console.log(payload);
    const response = await PresentationApi.voting(String(presentationId), payload);
    console.log(response);
  }

  console.log('@DUKE___presentation', presentation.slides[currentSlideIndex]);

  /* End RSocket */
  /* RSocket */
  const [clientId, setClientId] = useState<string>('');
  const [client, setClient] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);
  const messageReceiver = async (payload: any) => {
    const metadata: string = payload.metadata;
    const presentationMetadata: string = String.fromCharCode('presentation:update'.length) + 'presentation:update';
    console.log(payload);
    if (!payload.data.presentation) {
      return;
    }
    setPresentation(payload.data.presentation);
  };
  const createClient = (id: string) => {
    const PRESENTATION_ENDPOINT: string = 'presentation:join';

    const client = new RSocketClient({
      serializers: {
        data: JsonSerializer,
        metadata: IdentitySerializer,
      },
      setup: {
        payload: {
          data: {
            clientId: id,
            presentationId: presentationId,
          },
          metadata: String.fromCharCode(PRESENTATION_ENDPOINT.length) + PRESENTATION_ENDPOINT,
        },
        keepAlive: 60000,
        lifetime: 180000,
        dataMimeType: 'application/json',
        metadataMimeType: 'message/x.rsocket.routing.v0',
      },
      responder: new EchoResponder(messageReceiver),
      transport: new RSocketWebSocketClient({
        url: 'ws://localhost:8080/rsocket',
      }),
    });
    return client;
  };

  useEffect(() => {
    const id = uuidv4();
    setClientId(id);

    const client = createClient(id);
    setClient(client);

    client.connect().subscribe({
      onComplete: (socket: any) => {
        const PRESENTATION_STREAM: string = 'presentation:update';
        const CHAT_STREAM: string = 'chat:update';
        socket
          .requestStream({
            data: {
              clientId: id,
              presentationId: presentationId,
            },
            metadata: String.fromCharCode(PRESENTATION_STREAM.length) + PRESENTATION_STREAM,
          })
          .subscribe({
            onComplete: () => console.log('Completed'),
            onError: (error: string) => {
              console.log('Connection error: ', error);
            },
            onNext: (payload: any) => {
              console.log(payload);
            },
            onSubscribe: (subscription: any) => {
              subscription.request(1000);
            },
          });

        socket
          .requestStream({
            data: {
              clientId: id,
              presentationId: presentationId,
            },
            metadata: String.fromCharCode(CHAT_STREAM.length) + CHAT_STREAM,
          })
          .subscribe({
            onComplete: () => console.log('Completed'),
            onError: (error: string) => {
              console.log('Connection error: ', error);
            },
            onNext: (payload: any) => {
              console.log(payload);
            },
            onSubscribe: (subscription: any) => {
              subscription.request(1000);
            },
          });

        setSocket(socket);
      },
      onError: (error: string) => {
        console.log('Error: ', error);
      },
      onSubscribe: () => {},
    });
  }, []);
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
              <SlideOption 
                  data={presentation.slides[currentSlideIndex]} 
                  onChooseOption={onChooseOption} 
                  slideIndex={currentSlideIndex} />
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

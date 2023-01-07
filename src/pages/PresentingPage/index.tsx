import {ChartType, MockMultipleChoice, MOCK_PRESENTATION_MODEL, PresentationModel} from '@/models/presentation';
import {ChevronLeft, ChevronRight, ContactSupport} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {v4 as uuidv4} from 'uuid';

import SlideShow from './SlideShow';
import styles from './styles.module.css';
import {Widget, addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import {dialogRef, showDialog} from '../Home/index.props';
import DialogContainer from '../Home/DialogContainer';
import PresentationApi from '@/api/presentationApi';
import { EchoResponder } from '@/api/EchoResponder';

const {IdentitySerializer, JsonSerializer, RSocketClient} = require('rsocket-core');
const RSocketWebSocketClient = require('rsocket-websocket-client').default;

export default function PresentingPage() {
  const {presentationId} = useParams();
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

  const fetchPresentation = async (presentationId: string) => {
    const response: PresentationModel = await PresentationApi.findById(presentationId);
    setPresentation(response);
  };
  useEffect(() => {
    fetchPresentation(String(presentationId));
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

  /* RSocket */
  const [clientId, setClientId] = useState<string>('');
  const [client, setClient] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);
  const messageReceiver = (payload: any) => {
    setPresentation(payload.data.presentation);
  };
  const createClient = (id: string) => {
    const PRESENTATION_ENDPOINT: string = "presentation:join";
    
    const client = new RSocketClient({
      serializers: {
        data: JsonSerializer,
        metadata: IdentitySerializer,
      },
      setup: {
        payload: {
          data: {
            clientId: id,
            presentationId: presentationId
          },
          metadata: String.fromCharCode(PRESENTATION_ENDPOINT.length) + PRESENTATION_ENDPOINT
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
        socket.requestStream({
          data: {
            clientId: id,
            presentationId: presentationId
          },
          metadata: String.fromCharCode(PRESENTATION_STREAM.length) + PRESENTATION_STREAM
        }).subscribe({
          onComplete: () => console.log("Completed"),
          onError: (error: string) => {
            console.log("Connection error: ", error);
          },
          onNext: (payload: any) => {
            console.log(payload);
          },
          onSubscribe: (subscription: any) => {
            subscription.request(1000);
          }
        });

        setSocket(socket);
      },
      onError: (error: string) => {
        console.log("Error: ", error);
      },
      onSubscribe: () => {}
    });
  }, []);
  /* End RSocket */

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
        <Widget 
            handleNewUserMessage={getNewMessage} 
            title={'Group Chatting'} 
            subtitle={'Chat box of this presentation'} 
            emojis 
            showBadge={false} />
      </div>
      {/* button open dialog question here */}
      <div className={styles.questionBtn} onClick={showQuestionDialog}>
        <ContactSupport sx={{fontSize: 50, color: '#fff'}} />
      </div>
      <DialogContainer ref={dialogRef} />
    </div>
  );
}

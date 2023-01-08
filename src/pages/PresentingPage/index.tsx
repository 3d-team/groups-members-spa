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
import {EchoResponder} from '@/api/EchoResponder';
import UserApi from '@/api/userApi';
import ChatApi from '@/api/chatApi';

const {IdentitySerializer, JsonSerializer, RSocketClient} = require('rsocket-core');
const RSocketWebSocketClient = require('rsocket-websocket-client').default;

export default function PresentingPage() {
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
  useEffect(() => {
    fetchPresentation(String(presentationId));
    // 2. set
  }, []);

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

  const getNewMessage = async (newMessage: any) => {
    const profile: any = await UserApi.getProfile();

    const data = {
      sender: profile.fullName,
      content: newMessage,
      createdDate: new Date(),
      presentationId: presentationId,
    };
    const response = await ChatApi.send(data);
    console.log(response);
  };

  const showQuestionDialog = () => {
    showDialog('question');
  };

  /* RSocket */
  const [clientId, setClientId] = useState<string>('');
  const [client, setClient] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);
  const messageReceiver = async (payload: any) => {
    const metadata: string = payload.metadata;
    const presentationMetadata: string = String.fromCharCode('presentation:update'.length) + 'presentation:update';
    const chatMetadata: string = String.fromCharCode('chat:update'.length) + 'chat:update';
    if (metadata == presentationMetadata) {
      setPresentation(payload.data.presentation);
    } else if (metadata == chatMetadata) {
      const profile: any = await UserApi.getProfile();

      const message: any = payload.data.message;
      if (message.senderId != profile.uuid) {
        addResponseMessage(message.content);
      }
    }

    console.log(payload);
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
      <div className={styles.slidePage}>
        <p>{`${currentSlideIndex}/${presentation.slides.length}`}</p>
      </div>
      <div className={styles.arrowBtn} onClick={decreasePage}>
        <ChevronLeft sx={{fontSize: 50, color: '#fff'}} />
      </div>
      <SlideShow data={presentation.slides[currentSlideIndex - 1]} type={'bar-chart'} />
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

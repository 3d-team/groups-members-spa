import {ChartType, MockMultipleChoice, MultipleChoiceModel, SlideModel} from '@/models/presentation';
import {useAppDispatch, useAppSelector} from '@/redux';
import PresentationThunks from '@/redux/feature/presentation/thunk';
import Helper from '@/ultilities/Helper';
import {useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from './Header';
import ListPage from './ListPage';
import PreviewSlide from './PreviewSlide';
import styles from './styles.module.css';
import ToolSide from './ToolSide';
import { PresentationModel } from '@/models/presentation';
import { useParams, useSearchParams } from 'react-router-dom';
import PresentationApi from '@/api/presentationApi';
import { EchoResponder } from '@/api/EchoResponder';

const { IdentitySerializer, JsonSerializer, RSocket, RSocketClient } = require('rsocket-core');
const RSocketWebSocketClient = require('rsocket-websocket-client').default;

const defaultPage: MultipleChoiceModel = {
  type: 'multiple-choice',
  title: 'Are you ready?',
  paragraph: '',
  backgroundImage: '',
  options: [
    {uuid: '', name: 'Yes', value: 0},
    {uuid: '', name: 'No', value: 0},
  ],
};

const multipleChoicePage: MultipleChoiceModel = {
  type: 'multiple-choice',
  title: 'Are you ready?',
  paragraph: '',
  backgroundImage: '',
  options: [
    {uuid: '', name: 'Yes', value: 1},
    {uuid: '', name: 'No', value: 2},
  ],
};

const MOCK_PRESENTATION_MODEL: PresentationModel = {
  uuid: 'test',
  name: 'DEV_TEST_PRESENTATION',
  hostId: 'DEV_',
  accessCode: 'DEV_ACCESS_CODE',
  slides: [MockMultipleChoice],
};

const PRESENTATION_ENDPOINT: string = "presentation:join";

const SlideEditor = () => {
  const {presentationId} = useParams();
  const dispatcher = useAppDispatch();

  /* RSocket */
  const [clientId, setClientId] = useState<string>("");
  const [client, setClient] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);
  const messageReceiver = (payload: any) => {
    console.log(payload);
  };
  const createClient = (id: string) => {
    setClientId(id);
    const client = new RSocketClient({
      serializers: {
        data: JsonSerializer,
        metadata: IdentitySerializer
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
        metadataMimeType: 'message/x.rsocket.routing.v0'
      },
      responder: new EchoResponder(messageReceiver),
      transport: new RSocketWebSocketClient({
        url: "ws://localhost:8080/rsocket"
      })
    });
    return client;
  }
  useEffect(() => {
    const id = uuidv4();
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

  /* Presentation */
  const [presentation, setPresentation] = useState<PresentationModel>(MOCK_PRESENTATION_MODEL);
  const [listPage, setListPage] = useState<MultipleChoiceModel[]>(presentation.slides);
  const fetchPresentation = async () => {
    const response: PresentationModel = await PresentationApi.findById(String(presentationId));
    setPresentation(response);
    setListPage(response.slides);
  }
  useEffect(() => {
    fetchPresentation();
  }, []);
  /* End presentation */

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [typeChart, setTypeChart] = useState<ChartType>('bar-chart');

  const onSelectedPage = (index: number) => {
    setSelectedIndex(index);
  };

  const onDeletePage = (index: number) => {
    if (listPage.length < 2) {
      return;
    }
    setListPage(Helper.removeItemByIndex(listPage, index));
  };

  const addNewMultipleChoicePage = () => {
    setListPage(prev => {
      return [...prev, MockMultipleChoice];
    });
  };

  const onChangeTypeChart = (type: ChartType) => {
    setTypeChart(type);
  };

  const onSubmitData = (data: MultipleChoiceModel) => {
    setListPage(prev => {
      const newList = [...prev];
      newList[selectedIndex] = data;

      const payload = {
        id: presentationId,
        slides: newList
      }
      dispatcher(PresentationThunks.saveAllSlides(payload));
      return newList;
    });
  };

  const onSave = () => {
    const payload = {
      id: presentationId,
      slides: listPage
    }
    dispatcher(PresentationThunks.saveAllSlides(payload));
  };

  const onPresent = () => {};

  const onShare = () => {};

  // ----- Side Effect ----
  useEffect(() => {
    return () => {
      onSave();
    };
  }, []);
  console.log('@DUKE__CMN');

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <Header onSave={onSave} onPresent={onPresent} onShare={onShare} />
      </div>

      <div className={styles.bodyContainer}>
        <div className={styles.leftContainer}>
          <ListPage listPage={listPage} addNewPage={addNewMultipleChoicePage} onSelect={onSelectedPage} onDelete={onDeletePage} selectedIndex={selectedIndex} />
        </div>
        <div className={styles.centerContainer}>
          <PreviewSlide data={listPage[selectedIndex]} type={typeChart} />
        </div>
        <div className={styles.rightContainer}>
          <ToolSide onChangeChart={onChangeTypeChart} selectedType={typeChart} onSubmitData={onSubmitData} currentData={listPage[selectedIndex]} />
        </div>
      </div>
    </div>
  );
};

export default SlideEditor;

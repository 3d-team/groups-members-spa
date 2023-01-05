import {ChartType, MockMultipleChoice, MultipleChoiceModel, SlideModel} from '@/models/presentation';
import {useAppDispatch, useAppSelector} from '@/redux';
import PresentationThunks from '@/redux/feature/presentation/thunk';
import Helper from '@/ultilities/Helper';
import {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import Header from './Header';
import ListPage from './ListPage';
import PreviewSlide from './PreviewSlide';
import styles from './styles.module.css';
import ToolSide from './ToolSide';
import {PresentationModel} from '@/models/presentation';
import {useParams, useSearchParams} from 'react-router-dom';
import PresentationApi from '@/api/presentationApi';

const {IdentitySerializer, JsonSerializer, RSocket, RSocketClient} = require('rsocket-core');
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

const PRESENTATION_ENDPOINT = 'presentation:register';
const CHANNEL_PRESENTATION: string = 'presentation:test';

const SlideEditor = () => {
  const {presentationId} = useParams();
  const dispatcher = useAppDispatch();
  const [clientId, setClientId] = useState<string>('');
  const [presentation, setPresentation] = useState<PresentationModel>(MOCK_PRESENTATION_MODEL);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [listPage, setListPage] = useState<MultipleChoiceModel[]>(presentation.slides);
  const [typeChart, setTypeChart] = useState<ChartType>('bar-chart');

  const createClient = () => {
    const clientId = uuidv4();
    setClientId(clientId);
    const client = new RSocketClient({
      serializers: {
        data: JsonSerializer,
        metadata: IdentitySerializer,
      },
      setup: {
        payload: {
          data: clientId,
          metadata: String.fromCharCode(PRESENTATION_ENDPOINT.length) + PRESENTATION_ENDPOINT,
        },
        keepAlive: 60000,
        lifetime: 180000,
        dataMimeType: 'application/json',
        metadataMimeType: 'message/x.rsocket.routing.v0',
      },
      transport: new RSocketWebSocketClient({
        url: 'ws://localhost:8080/rsocket',
      }),
    });
    return client;
  };

  useEffect(() => {
    createClient()
      .connect()
      .subscribe({
        onComplete: (socket: any) => {
          socket
            .requestStream({
              data: null,
              metadata: String.fromCharCode(CHANNEL_PRESENTATION.length) + CHANNEL_PRESENTATION,
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
        },
        onError: (error: string) => {
          console.log('Error: ', error);
        },
        onSubscribe: () => {},
      });
  }, []);

  const fetchPresentation = async () => {
    const response: PresentationModel = await PresentationApi.findById(String(presentationId));
    setPresentation(response);
    setListPage(response.slides);
  };

  useEffect(() => {
    fetchPresentation();
  }, []);

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
        slides: newList,
      };
      dispatcher(PresentationThunks.saveAllSlides(payload));
      return newList;
    });
  };

  const onSave = () => {
    const payload = {
      id: presentationId,
      slides: listPage,
    };
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

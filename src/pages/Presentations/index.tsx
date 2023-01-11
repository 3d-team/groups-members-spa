import {useEffect, useState} from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Grid from '@mui/material/Grid';

import {AppDispatch} from '@/redux/store';
import {useDispatch} from 'react-redux';
import PresentationThunks from '@/redux/feature/presentation/thunk';
import CenterContainer from '@/components/CenterContainer';
import {useAppSelector} from '@/redux';
import PresentationApi from '@/api/presentationApi';
import {PresentationActions} from '@/redux/feature/presentation/slice';
import {CircularProgress} from '@mui/material';
import PresentationCard from '@/components/PresentationCard/PresentationCard';

export default function Presentations() {
  // State - Variable ////////////////////////
  const dispatcher = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const presentations: any = useAppSelector(state => state.presentation.presentationList);
  const token = useAppSelector(state => state.auth.token);

  // Function ////////////////////////
  const fetchPresentations = async () => {
    const response = await PresentationApi.all();
    dispatcher(PresentationActions.setPresentationList(response));
    setLoading(false);
  };

  const deletePresentation = (presentationId: string) => {

    dispatcher(PresentationThunks.deletePresentation({presentationId}));
  };

  // Side Effect ////////////////////////
  useEffect(() => {
    fetchPresentations();
  }, [presentations.length]);

  // Render Component ////////////////////////
  if (loading) {
    return (
      <CenterContainer>
        <CircularProgress />
      </CenterContainer>
    );
  }

  return (
    <>
      {presentations.length === 0 ? (
        <CenterContainer>
          <div>No presentations found! Create new a presentation!</div>
        </CenterContainer>
      ) : (
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" px={5} py={2}>
          {presentations.map((item: any, index: number) => (
            <div key={index}>
              <PresentationCard
                hostId={item.hostId}
                name={item.name}
                numberSlide={item.numberSlide}
                uuid={item.uuid}
                createdTime={item.createDate}
                modifiedTime={item.modifiedDate}
                deletePresentation={() => deletePresentation(item.uuid)}
              />
            </div>
            //name, numberSlide, ownerId, createdTime, modifiedTime, uuid
          ))}
        </Grid>
      )}
    </>
  );
}

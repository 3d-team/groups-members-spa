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
  const dispatcher = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPresentations = async () => {
    const response = await PresentationApi.all();
    dispatcher(PresentationActions.setPresentationList(response));
    setLoading(false);
  };

  useEffect(() => {
    fetchPresentations();
  }, []);

  const presentations = useAppSelector(state => state.presentation.presentationList);
  const numberOfSlideInPresentation = 1;

  if (loading) {
    return (
      <CenterContainer>
        <CircularProgress />
      </CenterContainer>
    );
  }

  return (
    <>
      <Navbar />

      {presentations.length === 0 ? (
        <CenterContainer>
          <div>No presentations found! Create new a presentation!</div>
        </CenterContainer>
      ) : (
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" px={5} py={2}>
          {presentations.map((item: any) => (
            <div key={item.uuid}> 
              <PresentationCard ownerId={item.ownerId} name={item.name} numberSlide={item.numberSlide}
               uuid={item.uuid} createdTime={item.createdTime} modifiedTime={item.modifiedTime}/>
            </div>
            //name, numberSlide, ownerId, createdTime, modifiedTime, uuid
          ))}
        </Grid>
      )}
    </>
  );
}

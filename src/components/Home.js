// import React, { useEffect}from 'react'
import styled from 'styled-components'
import ImgsSlider from './ImgsSlider'
import Viewer from './Viewer'
import Recommended from './Recommended'
import NewDisney from './NewDisney'
import Trendings  from './Trendings'
import Originals from './Originals'
import db from '../firebase'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setMovies } from '../features/movie/movieSlice'
// import { or } from 'firebase/firestore'
// import { collection, getDocs } from 'firebase/firestore';
import { collection, onSnapshot } from 'firebase/firestore';


function Home() {

    const dispatch = useDispatch();
    
    
    useEffect(() => {
      
      const unsubscribe = onSnapshot(collection(db, 'movies'), (snapshot) => {
        const recommends = [];
        const newDisneys = [];
        const originals = [];
        const trendings = [];
    
        snapshot.forEach((doc) => {
          switch (doc.data().type) {
            case 'recommend':
              recommends.push ({ id: doc.id, ...doc.data() });
              break;
    
            case 'new':
              newDisneys.push({ id: doc.id, ...doc.data() });
              break;
    
            case 'original':
              originals.push({ id: doc.id, ...doc.data() });
              break;
    
            case 'trending':
              trendings.push({ id: doc.id, ...doc.data() });
              break;
              
          }
        });
    
        dispatch(
          setMovies({
            recommend: recommends,
            newDisney: newDisneys,
            original: originals,
            trending: trendings,
          })
        );
      });
    
      return () => unsubscribe();
    }, []);
    
   return (
    <Container>
      <ImgsSlider />
      <Viewer />
      <Recommended />
      <NewDisney />
      <Originals />
      <Trendings />
    </Container>
  )
}

export default Home

const Container = styled.main`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    top: 70px;
    overflow-x: hidden;
    &:after {
        background: url("/images/home-background.png") center center / cover
        no-repeat fixed;        
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`
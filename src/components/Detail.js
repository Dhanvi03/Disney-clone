import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Detail() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const docRef = doc(db, "movies", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDetailData(docSnap.data());
        } else {
          console.log("No such document in Firebase 🔥");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    fetchMovieData();
  }, [id]);

  return (
    <Container>
      <Background>
        <img src={detailData.backgroundImg} alt={detailData.title} />
      </Background>
      <ImageTitle>
        <img src={detailData.titleImg} alt={detailData.title} />
      </ImageTitle>
      <Controls>
        <PlayButton>
          <img src="/images/play-icon-black.png" alt="error" />
          <span>PLAY</span>
        </PlayButton>
        <TrailerButton>
          <img src="/images/play-icon-white.png" alt="error" />
          <span> TRAILER </span>
        </TrailerButton>
        <AddButton>
          <span>+</span>
        </AddButton>
        <GroupWatchButton>
          <img src="/images/group-icon.png" alt="error" />
        </GroupWatchButton>
      </Controls>
      <SubTitle>{detailData.subTitle}</SubTitle>
      <Description>{detailData.description}</Description>
    </Container>
  );
}

export default Detail;

const Container = styled.div`
  min-height: calc(100vh );
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;
`;
const Background = styled.div`
  position: absolute;
  top: 70px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0.6;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ImageTitle = styled.div`
  margin-top: 120px;
  height: 30vh;
  min-height: 170px;
  width: 35vw;
  min-width: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const Controls = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;
const PlayButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  height: 56px;
  padding: 0 24px;
  letter-spacing: 1.8px;
  margin-right: 22px;
  background-color: rgb(249, 249, 249);
  cursor: pointer;

  &:hover {
    background-color: rgb(198, 198, 198);
  }
`;
const TrailerButton = styled(PlayButton)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);

  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;
const AddButton = styled.button`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid white;
  cursor: pointer;
  span {
    font-size: 30px;
    color: white;
  }
`;
const GroupWatchButton = styled(AddButton)`
  background: rgb(0, 0, 0);
`;
const SubTitle = styled.div`
  margin-top: 26px;
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
`;
const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
  max-width: 700px;
  color: rgb(249, 249, 249);
`;

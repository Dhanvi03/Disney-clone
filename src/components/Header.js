import React from 'react'
import styled from 'styled-components'
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuth , signInWithPopup} from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';
import { selectUserName, selectUserEmail, selectUserPhoto, setUserLoginDetails, setSignOutState } from '../features/user/userSlice';


function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUserName);
  const userphoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
       navigate("/");
      }
    });
  }, [username]);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleAuth = () =>{

    if(!username){

      signInWithPopup(auth , provider)
      .then((result) => {
        setUser(result.user);
      }).catch((error) => {
        alert(error.message)
      });
    }else if(username){
      auth
      .signOut()
      .then(() => {
        dispatch(setSignOutState());
       navigate("/login");
      })
      .catch((err) => alert(err.message));
    }
  
};

const setUser = (user) =>{
  dispatch(
    setUserLoginDetails({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    })
  )
}
  return (
    <Nav>
      <Logo src="/images/logo.svg" alt='error'/>

      {
        !username ? 
        (
        <LoginContainer>
          <Login onClick={handleAuth}>login</Login>
        </LoginContainer>
        ) :
        (<>
        <NavMenu> 
          <a >
            <img src="/images/home-icon.svg" alt='error'/ >
            <span>HOME</span>
          </a>

          <a>
            <img src="/images/search-icon.svg" alt='error'/ >
            <span>SEARCH</span>
          </a>

          <a>
            <img src="/images/watchlist-icon.svg" alt='error'/ >
            <span>WATCHLIST</span>
          </a>

          <a>
            <img src="/images/original-icon.svg" alt='error'/ >
            <span>ORIGINAL</span>
          </a>

          <a>
            <img src="/images/movie-icon.svg" alt='error'/ >
            <span>MOVIES</span>
          </a>

          <a>
            <img src="/images/series-icon.svg" alt='error'/ >
            <span>SERIES</span>
          </a>
      </NavMenu>
      <Signout>
        <UserImg src={userphoto} alt={username}/>
      <DropDown>
          <span onClick={handleAuth}>Sign out</span>
      </DropDown>

      </Signout>

      </>)
      }
    </Nav>
  )
}
export default Header

const Nav= styled.nav`
  position: fixed;
  top: 0px;
  bottom: 70px;
  left: 0px;
  right: 0px;
  height: 70px;
  background: #090b13 ;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow: hidden;
  z-index: 2;
 
`

const Logo= styled.img`
width: 80px;
`

const NavMenu= styled.div`
display: flex;
flex: 1;
margin: 25px;
align-items: center;
a{
  display: flex;
  align-items: center;
  padding: 0 12px;
  cursor: pointer;

  img{
    height: 20px;
  }
  span{
    font-size: 13px;
    letter-spacing: 1.42px;
    position: relative;

    &:after{
      content: "";
      height: 2px;
      background-color: white;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -6px;
      opacity: 0;
      transform-origin: left center;
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      transform: scaleX(0);

    }
  }

  &:hover{
    span:after{

      transform: scaleX(1);
      opacity: 1;
    }
  }
}
`
const UserImg= styled.img`

height: 48px;
width: 48px;
border-radius: 50%;
cursor: pointer;
`

const Login= styled.a`
background-color: rgba(0,0,0,0.6);
padding: 8px 16px;
text-transform: uppercase;
letter-spacing: 1.5px;
border: 1px solid #f9f9f9;
border-radius: 4px;
transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
    cursor: pointer;
  }
`
const LoginContainer = styled.div`
flex: 1;
display: flex;
justify-content: flex-end;
`

const DropDown = styled.div`
  position: absolute;
  top: 23px;
  right: 50px;
  background: rgb(19, 19, 19);
  border: 2px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 3px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 86px;
  opacity: 0;
`;

const Signout = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      z-index: 23;
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

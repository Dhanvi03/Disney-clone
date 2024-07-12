import React from 'react'
import styled from 'styled-components'
function Login() {
  return (
    <Container>
       <CTA>
        <CTALogoOne src="/images/cta-logo-one.svg" />
        <SignUp >GET ALL THERE</SignUp>
        <CTALogoTwo src="/images/cta-logo-two.png" />
       </CTA>
    </Container>
  )
}

export default Login

const Container=styled.div`
position: relative;
height: calc(100vh );
display: flex;
align-items: center;
justify-content: center;
&:before{
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    background-image: url("/images/login-background.jpg");
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    opacity: 0.7;
}
`
const CTA=styled.div`

max-width: 650px;
width: 80%;
display: flex;
flex-direction: column;
padding: 80px 40px;
/* margin-top: 100px; */

`
const CTALogoOne=styled.img`
`

const SignUp=styled.a`
background-color: #0063e5;
width: 100%;
font-weight: bold;
padding: 17px 0;
text-align: center;
color: #f9f9f9;
border-radius: 4px;
font-size: 18px;
cursor: pointer;
transition: all 250ms;
letter-spacing: 1.5px;
margin-top: 8px;
margin-bottom: 12px;

&:hover{
    background-color: #0483ee;

}
`
const CTALogoTwo=styled.img`
`
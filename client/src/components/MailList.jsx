import styled from "styled-components"

const Mail = styled.div`
  width: 100%;
  margin-top: 30px;
  background-color: #003580;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 50px;
`
const MailTitle = styled.h1`
  font-size: 25px;
`
const MailDesc = styled.span`
  
`
const MailInputContainer = styled.div`
  & > input{
    width: 300px;
    height: 20px;
    padding: 10px;
    border: none;
    margin-right: 10px;
    border-radius: 5px;
  }
  & > button{
    height: 40px;
    background-color: #0071c2;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`
const MailListContainer = styled.div`
  width: ${(props) => props.width || "100%"};
`;

export const MailList = ({ width }) => {
  return (
    <MailListContainer width={width}>
    <Mail>
      <MailTitle>Save time, save money!</MailTitle>
      <MailDesc>Sign up and we'll send the best deals to you</MailDesc>
      <MailInputContainer>
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </MailInputContainer>
    </Mail>
    </MailListContainer>
  )
}

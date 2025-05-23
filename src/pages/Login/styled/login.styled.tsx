import { Card, Input, Row } from "antd";
import { styled } from "styled-components";

const Container = styled(Row)`
  height: 100vh;
`;

const StyledCard = styled(Card)`
  background-color: #000;
`;

const Title = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 30px;
`;

const Logo = styled.img`
  width: 100%;
  background: black
`;

const StyledInput = styled(Input)`
  height: 60px;
  font-size: 16px;

  ::placeholder {
    color: #888;
  }
`;

const StyledPassword = styled(Input.Password)`
  height: 60px;
  font-size: 16px;
`;


export {
  Container,
  StyledCard,
  Title,
  Logo,
  StyledInput,
  StyledPassword
}
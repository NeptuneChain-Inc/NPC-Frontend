import styled from "styled-components";


export const WELCOME_LOGO = styled.img`
width: ${({width}) => width ? width : '200px'};
  height: auto;
  
  margin: 20px 0;
`;

export const WELCOME_HEADING = styled.h1`
font-size: ${({ size }) => size ? size : '1.25rem'};
  margin-bottom: 50px;
  color: #333;
`;

export const INPUT = styled.input`
width: 80%;
padding: 12px 16px;
margin-bottom: 24px;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 4px;
outline: none;
transition: border-color 0.3s ease, box-shadow 0.3s ease;

&::placeholder {
  color: #999;
}

&:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}
`;

export const BUTTON = styled.button`
width: 100%;
padding: 10px;
background-color: blue;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;

`;

export const BUTTON_SEC = styled(BUTTON)`
width: 50%;
background-color: #007bff;

&:hover {
  background-color: #0056b3;
}
`;
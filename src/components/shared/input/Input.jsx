import styled from "styled-components";

export const Input = styled.input`
  background: ${({ theme, error }) => error ? theme.colors.red50 : theme.colors.ui50};
  height: ${({ theme }) => theme.formHeightMd};
  padding: 0px 8px;
  
  border-radius: ${({ theme }) => theme.borderRadius.default};
  color: ${({ theme }) => theme.colors.ui800};
  margin: 0px;
  font-weight: 500;
  border: 1px solid ${({theme, error}) => error ? theme.colors.red300 : theme.colors.ui300};
`;


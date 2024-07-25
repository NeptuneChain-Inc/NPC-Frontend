import styled from "styled-components";

export const Select = styled.select`
  background: ${({ theme }) => theme.colors.ui50};
  height: ${({ theme }) => theme.formHeightMd};
  padding: 0px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  color: ${({ theme }) => theme.colors.ui800};
  margin: 0px;
  width: 100%;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.ui300};
  option {
    color: ${({ theme }) => theme.colors.ui600};
  }
`;

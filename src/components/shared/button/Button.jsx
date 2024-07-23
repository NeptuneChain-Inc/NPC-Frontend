import styled from "styled-components";

const Button = styled.button`
  height: ${({ theme }) => theme.formHeightMd};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 14px;
  font-weight: 600;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
`;

export const ButtonPrimary = styled(Button)`
  background: ${({ theme }) => theme.colors.primary500};
  color: white;

  :disabled {
    background: ${({ theme }) => theme.colors.ui200};
    color: ${({ theme }) => theme.colors.ui500};
  }
`;

export const ButtonSecondary = styled(Button)`
  border: 1px solid ${({ theme }) => theme.colors.ui200};
  color: ${({ theme }) => theme.colors.primary500};
  background: none;
  height: ${({ theme }) => theme.formHeightMd};
`;

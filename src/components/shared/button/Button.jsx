import styled from "styled-components";

const Button = styled.button`
  height: ${({ theme }) => theme.formHeightMd};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 14px;
  font-weight: 600;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
`;

export const ButtonPrimary = styled(Button)`
  background: ${({ theme }) => theme.colors.primary500};
  transition: 0.1s linear all; 
  color: white;
  &:hover {
    background: ${({ theme }) => theme.colors.primary600};
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.ui200};
    color: ${({ theme }) => theme.colors.ui500};
  }
`;

export const ButtonSecondary = styled(Button)`
  border: 1px solid ${({ theme }) => theme.colors.ui200};
  color: ${({ theme }) => theme.colors.primary500};
  background: white;
  height: ${({ theme }) => theme.formHeightMd};
  &:hover {
    background: ${({ theme }) => theme.colors.ui100};
  }
`;

export const ButtonLink = styled(Button)`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.primary500};
  padding: 0px;
  background: white;
  svg {
    color: ${({ theme }) => theme.colors.ui600};
    font-size: 12px;
  }
`;

export const ButtonIcon = styled(Button)`
  height: 40px;
  width: 40px;
  font-size: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background: ${({ theme }) => theme.colors.ui50};
  color: ${({ theme }) => theme.colors.ui800};
  border: 1px solid ${({ theme }) => theme.colors.ui200};

  padding: 0px;
`;

export const ButtonDanger = styled(Button)`
  background: ${({ theme }) => theme.colors.red500};
`;

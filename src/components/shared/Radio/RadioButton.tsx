import styled from "styled-components";

export const RadioButton = styled.input.attrs({ type: "radio" })`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-bottom: 0px;
  accent-color: ${({ theme }) => theme.colors.primary500};
`;

const StyledRadioButtonWithLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  label {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.ui800};
    margin-bottom: 0px;
  }
`;

export function RadioWithLabel({ label, onChange, checked }) {
  return (
    <StyledRadioButtonWithLabel>
      <RadioButton onChange={onChange} checked={checked} id="radio" />
      <label htmlFor="radio">{label}</label>
    </StyledRadioButtonWithLabel>
  );
}

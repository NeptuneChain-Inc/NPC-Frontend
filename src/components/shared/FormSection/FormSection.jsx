import React from 'react'
import styled from 'styled-components'
import { Label } from '../Label/Label'

const StyledFormSection = styled.div`
position: relative;
width: 100%;
${Label} {
    margin-bottom: 4px;
}
`

const Error = styled.div`
color: ${({theme}) => theme.colors.red500};
font-size: 12px;
position: absolute;
top: calc(100% + 4px);
font-weight: 500; 

`


function FormSection({label, children, error}) {
    return (
        <StyledFormSection>

            <Label>
        {label}
      </Label>
            {children}
            <Error>
                {error}
            </Error>
        </StyledFormSection>
    )
}

export default FormSection

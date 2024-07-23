import styled from "styled-components"

const Dashboard = styled.main`
width: 100%;
height: 100%;
`

const TitleContent = styled.div``


export const DashboardPage = ({children, title}) => {
    return ( 
        <Dashboard>
            <TitleContent>
            {title}
            </TitleContent>
            {children}
        </Dashboard>
    )
}
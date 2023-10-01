import React from 'react';
import styled from 'styled-components';

// Common Card Styles
const CardContainer = styled.div`
flex: 0 0 auto;
width: ${({ width }) => width ? width : '300px'};
height: 400px;
margin: auto;
display: flex;
padding: 0.5rem;
min-width: 300px;
position: relative;
box-shadow: 0px 0px 10px 0px #d4d4d4;
box-sizing: border-box;
align-items:center;
border-radius: 4px;
flex-direction: column;
background-color: #ffffff;

@media (max-width: 768px) {
  width: 300px;
}
`;

const CardTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 1.5rem;
`;

const Metrics = styled.div`
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

const ActionButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

// Simple Bar Graph Component
const BarGraph = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 10px;
  border: 1px solid black;
`;

const Bar = styled.div`
  width: ${(props) => props.width || '10%'}%;
  background-color: ${(props) => props.color || '#007bff'};
  height: 30px;
`;

// Simple Pie Chart Component (For example)
const PieChart = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: conic-gradient(
    #007bff ${(props) => props.blue || '50%'},
    #28a745 ${(props) => props.green || '50%'}
  );
`;

// Individual Dashboard Cards with more metrics and visualization
const FinancialMetricsCard = () => (
  <CardContainer>
    <CardTitle>Financial Metrics</CardTitle>
    <Metrics>
      Revenue: $50,000 <br />
      Expenses: $30,000 <br />
      Profit: $20,000
    </Metrics>
    <BarGraph>
      <Bar width={50} color="#007bff" />
      <Bar width={30} color="#dc3545" />
      <Bar width={20} color="#28a745" />
    </BarGraph>
    <ActionButton>View Financials</ActionButton>
  </CardContainer>
);

const EnvironmentalMetricsCard = () => (
  <CardContainer>
    <CardTitle>Environmental Metrics</CardTitle>
    <Metrics>
      Carbon Footprint: 2000 kgCO2 <br />
      Trees Planted: 150
    </Metrics>
    <PieChart blue="80" green="20" />
    <ActionButton>View Impact</ActionButton>
  </CardContainer>
);

const OperationalMetricsCard = () => (
  <CardContainer>
    <CardTitle>Operational Metrics</CardTitle>
    <Metrics>
      Uptime: 99.9% <br />
      Efficiency: 95%
    </Metrics>
    <BarGraph>
      <Bar width={99.9} color="#007bff" />
      <Bar width={95} color="#ffc107" />
    </BarGraph>
    <ActionButton>View Operations</ActionButton>
  </CardContainer>
);

// Export all cards
export { EnvironmentalMetricsCard, OperationalMetricsCard };

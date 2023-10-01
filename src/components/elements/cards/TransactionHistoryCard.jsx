import React from 'react';
import styled from 'styled-components';
import { CardContainer } from '../../lib/global-styled-components';

// Card Title
const CardTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

// Table Styles
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Header = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
  background-color: #f2f2f2;
`;

const Row = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const Cell = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
`;

const ActionButton = styled.button`
  margin-top: 20px;
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

const TransactionHistoryCard = ({title, transactions, styles}) => (
  <CardContainer style={styles}>
    <CardTitle>{title}</CardTitle>
    <Table>
      <thead>
        <Row>
          <Header>ID</Header>
          <Header>Type</Header>
          <Header>Amount</Header>
          <Header>Date</Header>
        </Row>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <Row key={tx.id}>
            <Cell>{tx.id}</Cell>
            <Cell>{tx.type}</Cell>
            <Cell>{tx.amount}</Cell>
            <Cell>{tx.date}</Cell>
          </Row>
        ))}
      </tbody>
    </Table>
    <ActionButton>View All Transactions</ActionButton>
  </CardContainer>
);

export default TransactionHistoryCard;

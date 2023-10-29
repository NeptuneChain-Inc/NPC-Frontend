import React, { memo } from 'react';
import styled from 'styled-components';
import { CardContainer } from '../../lib/global-styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import 'font-awesome/css/font-awesome.min.css'; // Import the font-awesome CSS

// Enhanced Card Header
const CardHeader = styled.div`
  background: linear-gradient(45deg, #007bff, #0056b3);
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  color: white;
  display: flex;
  justify-content: space-between;
`;

// Card Title with Gradient
const CardTitle = styled.h3`
  font-size: 1.8rem;
`;

const Summary = styled.div`
  font-size: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

const Header = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 12px 15px;
  text-align: left;
  background-color: #f7f7f7;
  font-weight: bold;
`;

const Row = styled(motion.tr)`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #e6f7ff;
    transform: scale(1.02);
    transition: transform 0.3s;
  }
`;

const Cell = styled.td`
  border-top: 1px solid #eee;
  padding: 12px 15px;
  text-align: left;

  &.income {
    color: green;
  }

  &.expense {
    color: red;
  }
`;

const Icon = styled.i`
  margin-right: 8px;
`;

const TransactionHistoryCard = memo(({ title, transactions, styles }) => {
  // Calculate records for summary
      // const income = transactions
      //   .filter(tx => tx.type === 'Minted')
      //   .reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
      // const expenses = transactions
      //   .filter(tx => tx.type === 'Sold')
      //   .reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
      // const balance = income - expenses;

  return (
    <CardContainer style={{padding: 0, ...styles}}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <Summary>
          {`
          + ${income.toFixed(2)}
          - ${expenses.toFixed(2)}
          Balance: ${balance.toFixed(2)}
          `}
        </Summary> */}
      </CardHeader>
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
              <Cell>
                <Icon className={`fa ${tx.type === 'income' ? 'fa-arrow-up' : 'fa-arrow-down'}`} />
                {tx.type}
              </Cell>
              <Cell className={tx.type}>{tx.amount}</Cell>
              <Cell>{tx.date}</Cell>
            </Row>
          ))}
        </tbody>
      </Table>
    </CardContainer>
  );
});

TransactionHistoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      amount: PropTypes.string,
      date: PropTypes.string,
    })
  ).isRequired,
  styles: PropTypes.object,
};

export default TransactionHistoryCard;

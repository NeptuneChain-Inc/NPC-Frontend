import React, { memo } from "react";
import styled from "styled-components";
import { CardContainer } from "../../lib/styled";
import { motion } from "framer-motion";
import "font-awesome/css/font-awesome.min.css"; // Import the font-awesome CSS
import { logDev } from "../../../scripts/helpers";

// Enhanced Card Header
const CardHeader = styled.div`
  color: ${({ theme }) => theme.colors.ui800};
  width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box;

  color: white;
  display: flex;
  justify-content: space-between;
`;

// Card Title with Gradient
const CardTitle = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.ui800};
`;

const TableWrap = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.ui200};
  padding: 32px;
  width: 100%;
  background: ${({ theme }) => theme.colors.ui50};
  border-radius: ${({ theme }) => theme.borderRadius.default};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  width: 100%;
`;

const Header = styled.th`
  padding: 12px 15px;
  text-align: left;
  background-color: #f7f7f7;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ui600};
`;

const Row = styled(motion.tr)`
  width: 100%;
  color: ${({ theme }) => theme.colors.ui900};
  font-weight: 500;
  font-size: 14px;
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

  @media (max-width: 768px) {
    padding: 0px;
    text-align: center;
  }
`;

const Icon = styled.i`
  margin-right: 8px;
`;

const TransactionHistoryCard = memo(({ data }) => {
  const { title, transactions } = data || {};

  logDev("TransactionHistoryCard Data:", data);
  // Calculate records for summary
  // const income = transactions
  //   .filter(tx => tx.type === 'Minted')
  //   .reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
  // const expenses = transactions
  //   .filter(tx => tx.type === 'Sold')
  //   .reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
  // const balance = income - expenses;

  return (
    <CardContainer>
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
      <TableWrap>
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
            {transactions?.map((tx) => (
              <Row key={tx.id}>
                <Cell>{tx.id}</Cell>
                <Cell>
                  {/* <Icon className={`fa ${tx.type === 'income' ? 'fa-arrow-up' : 'fa-arrow-down'}`} /> */}
                  {tx.type}
                </Cell>
                <Cell className={tx.type}>{tx.amount}</Cell>
                <Cell>{tx.date}</Cell>
              </Row>
            ))}
          </tbody>
        </Table>
      </TableWrap>
    </CardContainer>
  );
});

export default TransactionHistoryCard;

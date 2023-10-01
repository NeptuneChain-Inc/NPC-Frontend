const financialDash = {
    name: "Finacial Metrics",
    sections: [
        {
            alignment: 'flex-start',
            cards: [
                {
                    type: 'overview',
                    width: '92%',
                    data: {
                        cardTitle: 'Credit Balance',
                        metricValue: '0',
                        metricUnit: 'credits',
                        icon: 'wallet'
                    }
                },
                {
                    type: 'overview',
                    width: '92%',
                    data: {
                        cardTitle: 'Credit Price',
                        metricValue: '$0,00',
                        metricUnit: 'Price',
                        icon: 'money-bill-1'
                    }
                },
                {
                    type: 'overview',
                    width: '92%',
                    data: {
                        cardTitle: 'Total Earnings',
                        metricValue: '$0,00',
                        metricUnit: 'Earned',
                        icon: 'sack-dollar'
                    }
                },
                {
                    type: 'overview',
                    width: '92%',
                    data: {
                        cardTitle: 'Pending Transactions',
                        metricValue: '0',
                        metricUnit: 'Pending',
                        icon: 'hourglass-half'
                    }
                }
            ]
        },
        {
            alignment: 'center',
            cards: [
                {
                    type: 'tx-history',
                    styles: {
                        width: '60vw',
                        alignItems: 'center'
                    },
                    data: {
                        title: 'Transaction History',
                        // Dummy transaction data
                        transactions:  [
                            { id: 1, type: 'Minted', amount: '200', date: '2022-01-01' },
                            { id: 2, type: 'Sold', amount: '100', date: '2022-01-02' },
                            { id: 3, type: 'Withdrawal', amount: '50', date: '2022-01-03' },
                            // ... more transactions
                          ]
                    }
                }
            ]
        }
    ]
};

export default financialDash;
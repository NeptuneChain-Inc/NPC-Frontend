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
                    type: 'records',
                    data: {
                        title: 'Transaction History',
                        records: [
                            { date: "2023-09-01", amount: 100, status: "Success" },
                            { date: "2023-09-02", amount: 200, status: "Pending" },
                            { date: "2023-09-03", amount: 150, status: "Failed" },
                            // ... more records
                        ]
                    }
                }
            ]
        }
    ]
};

export default financialDash;
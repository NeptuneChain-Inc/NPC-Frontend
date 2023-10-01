const tradingActivityDash = {
    name: "Trading Activity",
    sections: [
        {
            alignment: 'flex-start',
            cards: [
                {
                    type: 'overview',
                    width: '92%',
                    data: {
                        cardTitle: '',
                        metricValue: '',
                        metricUnit: '',
                        icon: ''
                    }
                },
                {
                    type: 'overview',
                    width: '92%',
                    data: {
                        cardTitle: ' ',
                        metricValue: '',
                        metricUnit: '',
                        icon: ''
                    }
                },
                {
                    type: 'overview',
                    width: '92%',
                    data: {
                        cardTitle: '',
                        metricValue: '',
                        metricUnit: '',
                        icon: ''
                    }
                },
                {
                    type: 'overview',
                    width: '92%',
                    data: {
                        cardTitle: ' ',
                        metricValue: '',
                        metricUnit: '',
                        icon: ''
                    }
                }
            ]
        },
        {
            alignment: 'flex-start',
            cards: [
                {
                    type: 'data',
                    data: {
                        cardTitle: 'Trading Activity',
                        icon: 'chart-simple',
                        contents: []
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
                        title: 'Activity',
                        // Dummy transaction data
                        transactions:  [
                            { id: 1, type: 'Minted', amount: '200', date: '2022-01-01' },
                            { id: 2, type: 'Sold', amount: '100', date: '2022-01-02' },
                            // ... more transactions
                          ]
                    }
                }
            ]
        }
    ]
};

export default tradingActivityDash;
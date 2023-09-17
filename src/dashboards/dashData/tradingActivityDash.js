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
                    type: 'records',
                    data: {
                        title: 'Activity',
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

export default tradingActivityDash;
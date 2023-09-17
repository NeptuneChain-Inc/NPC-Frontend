const verificationDash = {
    name: "Verification Data",
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
                        cardTitle: '',
                        metricValue: '',
                        metricUnit: '',
                        icon: ''
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
                        title: 'Recent  Transactions',
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

export default verificationDash;
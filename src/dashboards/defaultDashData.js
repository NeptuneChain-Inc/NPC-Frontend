const defaultDashData = {
    farmer: {
        main: {
            name: "Dashboard",
            sections: [
                {
                    alignment: 'flex-start',
                    cards: [
                        {
                            type: 'overview',
                            data: {
                                cardTitle: 'Credit Balance',
                                metricValue: '0',
                                metricUnit: 'credits',
                                icon: 'wallet'
                            }
                        },
                        {
                            type: 'overview',
                            data: {
                                cardTitle: 'Credit Price',
                                metricValue: '$0,00',
                                metricUnit: 'Price',
                                icon: 'money-bill-1'
                            }
                        },
                        {
                            type: 'overview',
                            data: {
                                cardTitle: 'Total Earnings',
                                metricValue: '$0,00',
                                metricUnit: 'Earned',
                                icon: 'sack-dollar'
                            }
                        },
                        {
                            type: 'overview',
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
                    alignment: 'flex-start',
                    cards: [
                        {
                            type: 'data',
                            data: {
                                cardTitle: 'Trading Activity',
                                icon: 'chart-simple',
                                contents: []
                            }
                        },
                        {
                            type: 'data-table',
                            data: {
                                cardTitle: 'Metrics',
                                icon: 'chart-simple',
                                contents: []
                            }
                        },
                        {
                            type: 'data',
                            data: {
                                cardTitle: 'Notifications',
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
                                title: 'Transaction History',
                                // Dummy transaction data
                                transactions: [
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
        },
        environmental: {
            name: "Environmental Metrics",
            sections: [
                {
                    alignment: 'flex-start',
                    cards: [
                        {
                            type: 'overview',
                            width: '92%',
                            data: {
                                cardTitle: 'Removals',
                                metricValue: '0',
                                metricUnit: 'Removed',
                                icon: 'leaf'
                            }
                        }
                    ]
                },
                {
                    alignment: 'flex-start',
                    cards: [
                        {
                            type: 'data-table',
                            data: {
                                cardTitle: 'MPC BUOY Dummy Data',
                                icon: 'chart-simple',
                                contents: [
                                    {
                                        Timestamp: '2023-09-01 8:00',
                                        'Chlorophyll-a (µg/L)': 12.5,
                                        'Phycocyanin (µg/L)': 8.3,
                                        'pH Level': 7.2,
                                        'Water Temperature (°C)': 20.5,
                                        'Turbidity (NTU)': 12.8,
                                        'Dissolved Oxygen (mg/L)': 8.9,
                                    },
                                ]
                            }
                        },
                        {
                            type: 'data-table',
                            data: {
                                cardTitle: 'In-Situ VuLink Telemetry Device Dummy Data',
                                icon: 'chart-simple',
                                contents: [
                                    {
                                        "Timestamp": "2023-09-01 8:00",
                                        "Temperature (°C)": 20.1,
                                        "Conductivity (µS/cm)": 450,
                                        "pH Level": 7.4,
                                        "Dissolved Oxygen (mg/L)": 9,
                                        "Turbidity (NTU)": 12
                                    },
                                    {
                                        "Timestamp": "2023-09-01 12:00",
                                        "Temperature (°C)": 21.3,
                                        "Conductivity (µS/cm)": 460,
                                        "pH Level": 7.5,
                                        "Dissolved Oxygen (mg/L)": 9.3,
                                        "Turbidity (NTU)": 11.2
                                    },
                                    {
                                        "Timestamp": "2023-09-01 16:00",
                                        "Temperature (°C)": 19.7,
                                        "Conductivity (µS/cm)": 445,
                                        "pH Level": 7.3,
                                        "Dissolved Oxygen (mg/L)": 8.8,
                                        "Turbidity (NTU)": 12.5
                                    }
                                ]
                            }
                        },
                        {
                            type: 'data-table',
                            data: {
                                cardTitle: 'DraganFly Drone Dummy Data',
                                icon: 'chart-simple',
                                contents: [
                                    {
                                        Timestamp: '2023-09-01 8:00',
                                        'Chlorophyll-a (µg/L)': 12.5,
                                        'Phycocyanin (µg/L)': 8.3,
                                        'pH Level': 7.2,
                                        'Water Temperature (°C)': 20.5,
                                        'Turbidity (NTU)': 12.8,
                                        'Dissolved Oxygen (mg/L)': 8.9,
                                    },
                                ]
                            }
                        },
                    ]
                }
            ]
        },
        financial: {
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
                                transactions: [
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
        },
        verification: {
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
            ]
        }
    },
    verifier: {
        main: {
            name: "Dashboard",
            sections: [
                {
                    alignment: 'flex-start',
                    cards: [
                        {
                            type: 'overview',
                            data: {
                                cardTitle: 'Credit Balance',
                                metricValue: '0',
                                metricUnit: 'credits',
                                icon: 'wallet'
                            }
                        },
                        {
                            type: 'overview',
                            data: {
                                cardTitle: 'Credit Price',
                                metricValue: '$0,00',
                                metricUnit: 'Price',
                                icon: 'money-bill-1'
                            }
                        },
                        {
                            type: 'overview',
                            data: {
                                cardTitle: 'Total Earnings',
                                metricValue: '$0,00',
                                metricUnit: 'Earned',
                                icon: 'sack-dollar'
                            }
                        },
                        {
                            type: 'overview',
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
                    alignment: 'flex-start',
                    cards: [
                        {
                            type: 'data',
                            data: {
                                cardTitle: 'Trading Activity',
                                icon: 'chart-simple',
                                contents: []
                            }
                        },
                        {
                            type: 'data-table',
                            data: {
                                cardTitle: 'Metrics',
                                icon: 'chart-simple',
                                contents: []
                            }
                        },
                        {
                            type: 'data',
                            data: {
                                cardTitle: 'Notifications',
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
                                title: 'Transaction History',
                                // Dummy transaction data
                                transactions: [
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
        },
        financial: {
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
                                transactions: [
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
        },
        verification: {
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
            ]
        }
    },
    violator: {
        main: {
            name: "Dashboard",
            sections: [
                {
                    alignment: 'flex-start',
                    cards: [
                        {
                            type: 'overview',
                            data: {
                                cardTitle: 'Credit Balance',
                                metricValue: '0',
                                metricUnit: 'credits',
                                icon: 'wallet'
                            }
                        },
                        {
                            type: 'overview',
                            data: {
                                cardTitle: 'Credit Price',
                                metricValue: '$0,00',
                                metricUnit: 'Price',
                                icon: 'money-bill-1'
                            }
                        },
                        {
                            type: 'overview',
                            data: {
                                cardTitle: 'Total Earnings',
                                metricValue: '$0,00',
                                metricUnit: 'Earned',
                                icon: 'sack-dollar'
                            }
                        },
                        {
                            type: 'overview',
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
                    alignment: 'flex-start',
                    cards: [
                        {
                            type: 'data',
                            data: {
                                cardTitle: 'Trading Activity',
                                icon: 'chart-simple',
                                contents: []
                            }
                        },
                        {
                            type: 'data-table',
                            data: {
                                cardTitle: 'Metrics',
                                icon: 'chart-simple',
                                contents: []
                            }
                        },
                        {
                            type: 'data',
                            data: {
                                cardTitle: 'Notifications',
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
                                title: 'Transaction History',
                                // Dummy transaction data
                                transactions: [
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
        },
        financial: {
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
                                transactions: [
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
        },
    }
}
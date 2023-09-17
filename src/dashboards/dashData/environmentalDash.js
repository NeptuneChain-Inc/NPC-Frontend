const environmentalDash = {
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

export default environmentalDash;
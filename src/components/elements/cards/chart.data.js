var utilizationCtx = document.getElementById("utilization");
var utilization = new Chart(utilizationCtx, {
  type: 'line',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
    datasets: [{
      label: 'Beläggningsgrad Vunna Uppdrag, Procent',
      data: [85, 80, 75, 73, 76, 65, 60, 55, 40, 38, 20, 16],
      fill: true,
      backgroundColor: lightgreen,
      borderColor: green,
      borderWidth: 3
    }, {
      label: 'Beläggningsgrad inkl Prospekt, Procent',
      data: [105, 90, 85, 83, 80, 69, 62, 60, 50, 40, 38, 30],
      fill: true,
      backgroundColor: lightblue,
      borderColor: blue,
      borderWidth: 3,
      cubicInterpolationMode: "monotone"
    }]
  },
  options: {
    layout: {padding: {right:10}},
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      display:false,
      xAxes: [{
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      }],
      yAxes: [{
        ticks: {
          display: false,
          beginAtZero: false
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }]
    }
  }
});
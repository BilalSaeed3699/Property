var barChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  datasets: [
    {
      label: "Datasets",
      backgroundColor: "#7497e0",
      borderColor: "#3067da",
      borderWidth: 1,
      data: [15, 30, 20, 35, 38, 50, 60, 58, 62, 90, 100, 95, 90]
    },
  ],
};

window.onload = function () {
  var ctx = document.getElementById("performance-chart-area").getContext("2d");
  window.myBar = new Chart(ctx, {
    type: "bar",
    data: barChartData,
    options: {
      responsive: true,
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  });
};

var chart = new Chart("performance-chart-area", {
  type: "bar",
  data: data,
  options: options,
});



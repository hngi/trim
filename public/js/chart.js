    // Load charts
function showChart(ev, divElement) {
  const data = getChartInfo(ev.target.dataset.clip); // retrieve metrics for the selected url
  console.log(data);

  var chartCanvas = document.getElementById(divElement);
  google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);

  // Draw the chart and set the chart values
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Device', 'Clicks'],
      ['Desktop', 8],
      ['Mobile', 2],
      ['Tablet', 1],
      ['Other', 4],
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {
      'title': 'Clicks by devices',
      'width': 450,
      'height': 350
    };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(chartCanvas);
    chart.draw(data, options);
    chartCanvas.className = '';
  }
}


function getChartInfo(urlShortenId) {
  fetch(`/metrics/${urlShortenId}`)
  .then(res => res.json())
  .then(data => console.log(data)) //Be sure to handle error response from the server.
  .catch(console.error); //If the browser fails to communicate with the server, handle such errors here.
}

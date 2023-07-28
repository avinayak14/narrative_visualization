charts.chart3 = function() {
  getAndDrawDataChart3();
}


function getAndDrawDataChart3() {

  console.log("has hit chart 2 get and draw data");

  const xScale = d3.scaleLog().domain([10, 150]).range([0, 200]);
  const yScale = d3.scaleLog().domain([10, 150]).range([200, 0]);

  const xAxis = d3.axisBottom(xScale).tickValues([10, 20, 50, 100]);
  const yAxis = d3.axisLeft(yScale).tickValues([10, 20, 50, 100]);

  const svg = d3.select('#svg3');
  svg.append('g')
      .attr('transform', 'translate(50,50)')
      .call(yAxis);

  svg.append('g')
      .attr('transform', 'translate(50,250)')
      .call(xAxis);

  const annotations = [
    {
      note: {
        label: "Lower Engine Cylinder Count"
      },
      connector: {
        end: "arrow"
      },
      type: d3.annotationLabel,
      x: 120,
      y: 125,
      dx: 0,
      dy: -25
    },
    {
      note: {
        label: "Peak so far"
      },
      connector: {
        end: "arrow"
      },
      type: d3.annotationLabel,
      x: 250,
      y: 100,
      dx: 0,
      dy: 25
    }
  ];
  const makeAnnotations = d3.annotation().annotations(annotations);
  svg.append('g').call(makeAnnotations);

  const row = d => {
    d.EngineCylinders = +d.EngineCylinders;
    d.AverageHighwayMPG = +d.AverageHighwayMPG;
    d.AverageCityMPG = +d.AverageCityMPG;
    return d;
  };

  d3.csv('data/cars_2017.csv', row, data => {

    // adding checkboxes:
    paramsChart3.forEach(function(param) {
      console.log(param.id);
      if (!d3.select('#' + param.id).property('checked')) {
        console.log("testing reach");
        console.log(data);
        data = data.filter(d => d.AverageCityMPG < 20);
        console.log("now filtered");
        console.log(data);
      }

    });

    console.log("going into svg");
    console.log(data);
    svg.selectAll('circle').remove();

    svg.append('g').attr('transform', 'translate(50,50)').selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr('cx', d => xScale(d.AverageCityMPG))
        .attr('cy', d => yScale(d.AverageHighwayMPG))
        .attr('r', d => parseInt(d.EngineCylinders, 10) + 2);
  });

}

const paramsChart3 = [
  {
    id: "Include_City_MPG_More_20",
  },
];

function updateChart3Data() {
  getAndDrawDataChart3();
}

charts.chart1 = function() {
  console.log("has hit chart 1 function");
  getAndDrawDataChart1();
}

function getAndDrawDataChart1() {
  const xScale = d3.scaleLog().domain([10, 150]).range([0, 200]);
  const yScale = d3.scaleLog().domain([10, 150]).range([200, 0]);

  const xAxis = d3.axisBottom(xScale).tickValues([10, 20, 50, 100]);
  const yAxis = d3.axisLeft(yScale).tickValues([10, 20, 50, 100]);

  const svg = d3.select('#svg1');
  console.log("has hit chart 1 svg");
  svg.append('g')
      .attr('transform', 'translate(50,50)')
      .call(yAxis);

  svg.append('g')
      .attr('transform', 'translate(50,250)')
      .call(xAxis);

  const annotations = [
    {
      note: {
        label: "Higher Engine Cylinder Count"
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
        label: "Lower Engine Cylinder Count"
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
    svg.append('g').attr('transform', 'translate(50,50)').selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr('cx', d => xScale(d.AverageCityMPG))
        .attr('cy', d => yScale(d.AverageHighwayMPG))
        .attr('r', d => parseInt(d.EngineCylinders, 10) + 2);
  });
}

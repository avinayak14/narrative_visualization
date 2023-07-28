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
        label: "High Engine Cylinder Count"
      },
      connector: {
        end: "arrow"
      },
      type: d3.annotationLabel,
      x: 120,
      y: 50,
      dx: 0,
      dy: -25
    },
    {
      note: {
        label: "Low Engine Cylinder Count"
      },
      connector: {
        end: "arrow"
      },
      type: d3.annotationLabel,
      x: 200,
      y: 200,
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

    // // adding checkboxes:
    // paramsChart1.forEach(function(param) {
    //   console.log(param.id);
    //       if (!d3.select('#' + param.id).property('checked')) {
    //         console.log("testing reach");
    //         data = data.filter(d => d.EngineCylinders == 0);
    //       }
    //     });

    svg.append('g').attr('transform', 'translate(50,50)').selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr('cx', d => xScale(d.AverageCityMPG))
        .attr('cy', d => yScale(d.AverageHighwayMPG))
        .attr('r', d => parseInt(d.EngineCylinders, 10) + 2);
  });

}

const paramsChart1 = [
  {
    id: "Nonzero",
  },
  {
    id: "Zero",
  },
];

// function updateChart2Data() {
//   getAndDrawData();
// }


// charts.chart1 = function() {
//   // initialise layout variables
//   const margin = {top: 50, right: 20, bottom: 50, left: 60};
//   const width = 600;
//   const height = 400;
//
//   const parseDateTime = d3.timeParse("%B %d, %Y");
//
//   // initialise charts
//   const svg = d3.select('#svg1')
//       .attr('width', width + margin.left + margin.right)
//       .attr('height', height + margin.top + margin.bottom)
//       .append('g')
//       .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
//
//   // get data
//   const file = 'data/NetflixOriginals.json';
//   d3.cachedJson(file, 'chart1', function(data) {
//     data.forEach(function(d) {
//       d.date = parseDateTime(d.Premiere);
//     });
//     data = data.filter(d => d.date != null);
//     const dataGroupedByYear = Array.from(d3.group(data, d => d.date.getFullYear()));
//     const finalData = dataGroupedByYear.map(
//         function (item) {
//           return {
//             year: item[0],
//             numOriginals: item[1].length
//           };
//         }
//     ).sort((a, b) => (a.year > b.year) ? 1 : -1);
//
//     draw(finalData);
//   });
//
//   function draw(data) {
//     // X axis
//     const x = d3.scaleBand()
//         .range([0, width])
//         .domain(data.map(function (d) {
//           return d.year;
//         }))
//         .padding(0.2);
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x))
//         .selectAll("text")
//         .attr("transform", "translate(-10,0)rotate(-45)")
//         .style("text-anchor", "end");
//
//     // Add Y axis
//     const y = d3.scaleLinear()
//         .domain([0, 200])
//         .range([height, 0]);
//     svg.append("g")
//         .call(d3.axisLeft(y));
//
//     // Bars
//     svg.selectAll("mybar")
//         .data(data)
//         .enter()
//         .append("rect")
//         .attr("x", function(d) { return x(d.year); })
//         .attr("y", function(d) { return y(d.numOriginals); })
//         .attr("width", x.bandwidth())
//         .attr("height", function(d) { return height - y(d.numOriginals); })
//         .attr("fill", "#69b3a2")
//
//     // Features of the annotation
//     const annotations = [
//       {
//         note: {
//           label: "Starts producing"
//         },
//         connector: {
//           end: "arrow"
//         },
//         type: d3.annotationLabel,
//         x: 125,
//         y: 450,
//         dx: 0,
//         dy: -25
//       },
//       {
//         note: {
//           label: "Peak so far"
//         },
//         connector: {
//           end: "arrow"
//         },
//         type: d3.annotationLabel,
//         x: 545,
//         y: 85,
//         dx: 0,
//         dy: -25
//       }
//     ]
//
//     // Add annotation to the chart
//     const makeAnnotations = d3.annotation()
//         .annotations(annotations)
//     d3.select("#svg1")
//         .append("g")
//         .call(makeAnnotations)
//   }
// }

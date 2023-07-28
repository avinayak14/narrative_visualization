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
        label: "Starts producing"
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
        label: "Peak so far"
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

    // adding checkboxes:
    paramsChart3.forEach(function(param) {
      console.log(param.id);
      if (!d3.select('#' + param.id).property('checked')) {
        console.log("testing reach");
        console.log(data);
        data = data.filter(d => d.EngineCylinders != 0);
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
    // if (params.some(param => !d3.select('#' + param.id).property('checked'))) {
    //     // remove annotations
    //     d3.select('#svg-2-annotations').selectAll('*').remove();
    //     d3.select('#svg-2-annotations').remove();
    //   } else {
    //     // Add annotation to the chart
    //     const makeAnnotations = d3.annotation()
    //         .annotations(annotations);
    //     d3.select("#svg2")
    //         .append("g")
    //         .attr('id', 'svg-2-annotations')
    //         .call(makeAnnotations);
    //   }
  });

}

const paramsChart3 = [
  {
    id: "Nonzero",
  },
  // {
  //   id: "Zero",
  // },
];

function updateChart3Data() {
  getAndDrawDataChart3();
}




// var finalDataChart3 = [];
// // initialise layout variables
// const marginChart3 = {top: 50, right: 20, bottom: 50, left: 60};
// const widthChart3 = 600;
// const heightChart3 = 400;
//
// // initialise charts
// const svgChart3 = d3.select('#svg3')
//     .attr('width', widthChart3 + marginChart3.left + marginChart3.right)
//     .attr('height', heightChart3 + marginChart3.top + marginChart3.bottom)
//     .append('g')
//     .attr('transform', 'translate(' + marginChart3.left + ',' + marginChart3.top + ')')
//     .attr('id', 'svg-3-parent-g');
//
// charts.chart3 = function() {
//     getDataAndDraw();
// }
//
// function getDataAndDraw() {
//     const parseDateTime = d3.timeParse("%B %d, %Y");
//
//     // get data
//     const file = 'data/NetflixOriginals.json';
//     d3.cachedJson(file, 'chart1', function(data) {
//         data.forEach(function(d) {
//             d.date = parseDateTime(d.Premiere);
//         });
//         data = data.filter(d => d.date != null);
//         data.forEach(function(d) {
//             d.year = d.date.getFullYear();
//         });
//
//         paramsChart3.forEach(function(param) {
//             if (!d3.select(param.id).property('checked')) {
//                 data = data.filter(d => d.year != param.year);
//             }
//         });
//
//         const dataGroupedByGenre = Array.from(d3.group(data, d => d["Genre"]));
//         finalDataChart3 = dataGroupedByGenre.map(
//             function (item) {
//                 var sumScores = 0;
//                 item[1].forEach(d => sumScores += d["IMDB Score"]);
//                 return {
//                     genre: item[0],
//                     averageScore: sumScores / item[1].length
//                 };
//             }
//         ).sort((a, b) => (a.genre > b.genre) ? 1 : -1);
//
//         drawChart3(finalDataChart3);
//     });
// }
//
// function drawChart3(data) {
//     d3.select('#svg-3-parent-g').selectAll('*').remove();
//     svgChart3.selectAll('rect').remove();
//
//     // X axis
//     const x = d3.scaleBand()
//         .range([0, widthChart3])
//         .domain(data.map(function (d) {
//             return d.genre;
//         }))
//         .padding(0.2);
//     svgChart3.append("g")
//         .attr("transform", "translate(0," + heightChart3 + ")")
//         .call(d3.axisBottom(x))
//         .selectAll("text")
//         .attr("transform", "translate(-10,0)rotate(-45)")
//         .style("text-anchor", "end");
//
//     // Add Y axis
//     const y = d3.scaleLinear()
//         .domain([0, 7])
//         .range([heightChart3, 0]);
//     svgChart3.append("g")
//         .call(d3.axisLeft(y));
//
//     // Bars
//     svgChart3.selectAll("mybar")
//         .data(data)
//         .enter()
//         .append("rect")
//         .attr("x", function(d) { return x(d.genre); })
//         .attr("y", function(d) { return y(d.averageScore); })
//         .attr("width", x.bandwidth())
//         .attr("height", function(d) { return heightChart3 - y(d.averageScore); })
//         .attr("fill", "#69b3a2");
// }
//
// const paramsChart3 = [
//     {
//         id: "#checkbox-2014",
//         year: 2014
//     },
//     {
//         id: "#checkbox-2015",
//         year: 2015
//     },
//     {
//         id: "#checkbox-2016",
//         year: 2016
//     },
//     {
//         id: "#checkbox-2017",
//         year: 2017
//     },
//     {
//         id: "#checkbox-2018",
//         year: 2018
//     },
//     {
//         id: "#checkbox-2019",
//         year: 2019
//     },
//     {
//         id: "#checkbox-2020",
//         year: 2020
//     },
//     {
//         id: "#checkbox-2021",
//         year: 2021
//     },
// ];
// function updateChart3Data() {
//     getDataAndDraw();
// }

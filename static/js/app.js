function init() {

    //init trace bar chart
    var trace1 = {
        y: ["OTU 10", "OTU 9","OTU 8","OTU 7","OTU 6","OTU 5","OTU 4","OTU 3","OTU 2","OTU 1"],
        x: [10, 25, 50, 75, 90, 100, 115, 125, 135, 150],
        type: "bar",
        orientation: "h"
      };

    //data for bar chart
    var chartData = [trace1];

    //layout for bar chart
    var barLayout = {
        width: 500,
        height: 500,
        title: {
            text: "Top 10 OTUs",
            font: {size: 24}
        }};
       
    //render bar chart
    Plotly.newPlot("bar", chartData, barLayout);

    //init trace bubble chart
    var desired_max_marker_size = 70;
    var size = [10, 25, 50, 75, 90, 100, 115, 125, 135, 150];

    var trace2 = {
        x: ["OTU 10", "OTU 9","OTU 8","OTU 7","OTU 6","OTU 5","OTU 4","OTU 3","OTU 2","OTU 1"],
        y: [10, 25, 50, 75, 90, 100, 115, 125, 135, 150],
        mode: 'markers',
        marker: {
            size: size,
            sizeref: 2.0 * Math.max(...size) / (desired_max_marker_size**2),
            sizemode: 'area',
            color: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
            colorscale: 'Portland'
        }
    };

    //layout for bubble chart
    var bubbleLayout = {
        xaxis: { title: "OTU ID"}
    };

    //data for bubble chart
    var plotData = [trace2];

    //render bubble chart
    Plotly.newPlot("bubble", plotData, bubbleLayout);

//gauge chart
    //data for gauge chart
    var gaugeData = [
        {
            domain: { x: [0,1], y: [0,1]},
            value: 2,
            title: { text: "Scrubs per Week"},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 9], ticks: ""},
                bar: { color: "black" },
                steps: [
                    { range: [0, 1], color: "#ff9b9d" },
                    { range: [1, 2], color: "#ff9b9d" },
                    { range: [2, 3], color: "#ff9b9d" },
                    { range: [3, 4], color: "lightgray" },
                    { range: [4, 5], color: "lightgray" },
                    { range: [5, 6], color: "lightgray" },
                    { range: [6, 7], color: "#8ae28a" },
                    { range: [7, 8], color: "#8ae28a" },
                    { range: [8, 9], color: "#8ae28a" }
                ]
            }
        }
    ];

    //layout for gauge chart
    var gaugeLayout = {
        width: 500,
        height: 400,
        title: {
            text: "Belly Button Washing Frequency",
            font: {size: 24}
        }
    }

    //render gauge chart
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

}

//insert all sample ids into drop down menu
function insertMenu() {

    d3.json("data/samples.json").then((importedData) => {
        console.log(importedData);
        var data = importedData;
      
        var nameArray = data.names;
        //console.log(nameArray);
    
        var elmnts = nameArray;
        var select = document.getElementById("selDataset");


        for (var i = 0; i < elmnts.length; i++) {
            var optn = elmnts[i];
            var el = document.createElement("option");
            el.textContent = optn;
            el.value = optn;
            select.appendChild(el);
        }
    })
};    


//create plots and metadata based on selected sample id
function getValue(option) {
    console.log(option.value);
    var sampValue = option.value;
    console.log(sampValue);
    
  //use D3 library to read in data
  d3.json("data/samples.json").then((importedData) => {
    console.log(importedData);
    var data = importedData;
  
    var nameArray = data.names;
    //console.log(nameArray);
 
    var index = nameArray.indexOf(sampValue);
    //console.log(index);
    
    //extract metadata
    x = data.metadata[index];
    //console.log(x);

    //metadata variables
    var id = x.id;
    var ethnicity = x.ethnicity;
    var gender = x.gender;
    var age = x.age;
    var location = x.location;
    var bbtype = x.bbtype;
    var wfreq = x.wfreq;
    

    //add metadata to dashboard
    //remove current paragraph elements
    var elem1 = document.querySelector('#p1');
    elem1.parentNode.removeChild(elem1);
    var elem2 = document.querySelector('#p2');
    elem2.parentNode.removeChild(elem2);
    var elem3 = document.querySelector('#p3');
    elem3.parentNode.removeChild(elem3);
    var elem4 = document.querySelector('#p4');
    elem4.parentNode.removeChild(elem4);
    var elem5 = document.querySelector('#p5');
    elem5.parentNode.removeChild(elem5);
    var elem6 = document.querySelector('#p6');
    elem6.parentNode.removeChild(elem6);
    var elem7 = document.querySelector('#p7');
    elem7.parentNode.removeChild(elem7);

    //create and append new paragraph elements with metadata
    var para1 = document.createElement("p");
    para1.setAttribute("id", "p1");
    var node1 = document.createTextNode(`id: ${id}`);
    var para2 = document.createElement("p");
    para2.setAttribute("id", "p2");
    var node2 = document.createTextNode(`ethnicity: ${ethnicity}`);
    var para3 = document.createElement("p");
    para3.setAttribute("id", "p3");
    var node3 = document.createTextNode(`gender: ${gender}`);
    var para4 = document.createElement("p");
    para4.setAttribute("id", "p4");
    var node4 = document.createTextNode(`age: ${age}`);
    var para5 = document.createElement("p");
    para5.setAttribute("id", "p5");
    var node5 = document.createTextNode(`location: ${location}`);
    var para6 = document.createElement("p");
    para6.setAttribute("id", "p6");
    var node6 = document.createTextNode(`bbtype: ${bbtype}`);
    var para7 = document.createElement("p");
    para7.setAttribute("id", "p7");
    var node7 = document.createTextNode(`wfreq: ${wfreq}`);
    
    para1.appendChild(node1);
    para2.appendChild(node2);
    para3.appendChild(node3);
    para4.appendChild(node4);
    para5.appendChild(node5);
    para6.appendChild(node6);
    para7.appendChild(node7);

    var element = document.getElementById("sample-metadata");
    element.appendChild(para1);
    element.appendChild(para2);
    element.appendChild(para3);
    element.appendChild(para4);
    element.appendChild(para5);
    element.appendChild(para6);
    element.appendChild(para7);


    //extract sample data by id
    sampleValues = data.samples[index].sample_values;
    otuIds = data.samples[index].otu_ids;
    otuLabels = data.samples[index].otu_labels;

    //merge three arrays together for sorting and slicing
    var sampleData = sampleValues.map( (v, i) => ({
        sampleValue: sampleValues[i],
        otuId: otuIds[i],
        otuLabel: otuLabels[i]
    })) 
    //console.log(sampleData);

    //horizontal bar chart
    //sort by sample values for given id
    sampleData.sort(function(a, b) {
      return (b.sampleValue) - (a.sampleValue);
    });

    //slice the top 10 objects to plot
    slicedData = sampleData.slice(0, 10);

    //reverse the array
    slicedData = slicedData.reverse();
    console.log(slicedData);

    //create yvalues for bar chart
    var yValues = slicedData.map(row => row.otuId);
    yValues.forEach(function(element, index) {
        yValues[index] = 'OTU ' + element;
    });
    console.log(yValues);

    //trace for bar chart
    var trace1 = {
      y: yValues,
      x: slicedData.map(row => row.sampleValue),
      text: slicedData.map(row => row.otuLabel),
      type: "bar",
      orientation: "h"
    };

    //data for bar chart
    var chartData = [trace1];

    //layout for bar chart
    var barLayout = {
        width: 500,
        height: 500,
        title: {
            text: "Top 10 OTUs",
            font: {size: 24}
        }
    };

    //render bar chart
    Plotly.newPlot("bar", chartData, barLayout);


    //bubble chart
    //sort by otu_Id ascending
    sampleData.sort(function(a, b) {
        return (a.otuId) - (b.otuId);
      });
    console.log(sampleData);

    //trace for bubble chart
    var desired_max_marker_size = 70;
    var size = sampleData.map(row =>row.sampleValue);

    var xValues = sampleData.map(row => row.otuId);
    var strxValues = xValues.map(function(e){return e.toString()});
    console.log(strxValues);

    var trace2 = {
        x: strxValues,
        y: sampleData.map(row => row.sampleValue),
        mode: 'markers',
        marker: {
            size: size,
            sizeref: 2.0 * Math.max(...size) / (desired_max_marker_size**2),
            sizemode: 'area',
            color: sampleData.map(row => row.otuId),
            colorscale: 'Portland'
        },
        text: sampleData.map(row => row.otuLabel)
    };

    //layout for bubble chart
    var bubbleLayout = {
        xaxis: { title: "OTU ID"}
    };

    //data for bubble chart
    var plotData = [trace2];

    //render bubble chart
    Plotly.newPlot("bubble", plotData, bubbleLayout);


    //gauge chart
    //data for gauge chart
    var gaugeData = [
        {
            domain: { x: [0,1], y: [0,1]},
            value: wfreq,
            title: { text: "Scrubs per Week"},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 9], ticks: ""},
                bar: { color: "black" },
                steps: [
                    { range: [0, 1], color: "#ff9b9d" },
                    { range: [1, 2], color: "#ff9b9d" },
                    { range: [2, 3], color: "#ff9b9d" },
                    { range: [3, 4], color: "lightgray" },
                    { range: [4, 5], color: "lightgray" },
                    { range: [5, 6], color: "lightgray" },
                    { range: [6, 7], color: "#8ae28a" },
                    { range: [7, 8], color: "#8ae28a" },
                    { range: [8, 9], color: "#8ae28a" }
                ]
            }
        }
    ];

    //layout for gauge chart
    var gaugeLayout = {
        width: 500,
        height: 400,
        title: {
            text: "Belly Button Washing Frequency",
            font: {size: 24}
        }
    }

    //render gauge chart
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

  })
}    

init();

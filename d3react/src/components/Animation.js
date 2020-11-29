import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./Animation.css";

export default function Animation() {
  let canvasRef = useRef(null);
  let button2005 = useRef(null);
  let button2006 = useRef(null);

  useEffect(() => {
    const data = [
      { name: "Medellín", index2005: 3, index2006: 33 },
      { name: "Cali", index2005: 39, index2006: 45 },
      { name: "Bogotá", index2005: 7, index2006: 31 },
      { name: "Pereira", index2005: 35, index2006: 36 },
      { name: "Bucaramanga", index2005: 16, index2006: 23 },
      { name: "Cúcuta", index2005: 45, index2006: 45 },
      { name: "Armenia", index2005: 6, index2006: 16 },
    ];
    const canvas = d3.select(canvasRef.current);

    const width = 600;
    const height = 500;
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    let max2005 = 0;
    let max2006 = 0;
    for (let i in data) {
      max2005 = Math.max(max2005, data[i].index2005);
      max2006 = Math.max(max2006, data[i].index2006);
    }

    let y = d3.scaleLinear().range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, iwidth])
      .padding(0.1);

    let xAxis = g
      .append("g")
      .classed("x--axis", true)
      .attr("transform", `translate(0, ${iheight})`);

    let yAxis = g.append("g").classed("y--axis", true);

    const button1 = d3.select(button2005.current);

    button1.on("click", function () {
      y.domain([0, max2005]);
      const bars = g.selectAll("rect").data(data);

      bars
        .enter()
        .append("rect")
        .merge(bars)
        .transition()
        .duration(800)
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.index2005))
        .attr("height", (d) => iheight - y(d.index2005))
        .attr("width", x.bandwidth());

      xAxis.call(d3.axisBottom(x));
      yAxis.transition().call(d3.axisLeft(y));
    });

    const button2 = d3.select(button2006.current);

    button2.on("click", function () {
      y.domain([0, max2006]).range([iheight, 0]);

      const bars = g.selectAll("rect").data(data);

      bars
        .enter()
        .append("rect")
        .merge(bars)
        .transition()
        .duration(800)
        .attr("class", "bar")
        .style("fill", "green")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.index2006))
        .attr("height", (d) => iheight - y(d.index2006))
        .attr("width", x.bandwidth());

      xAxis.call(d3.axisBottom(x));
      yAxis.transition().call(d3.axisLeft(y));
    });
  }, []);

  return (
    <main>
      <div>
        <h1>Reto</h1>
        <button ref={button2005}>2005</button>
        <button ref={button2006}>2006</button>
        <div ref={canvasRef}></div>
      </div>
    </main>
  );
}

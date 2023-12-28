import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useState } from "react";

const useApi = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then((data) => {
                delete data["Ready"];
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
};

const BarChart = () => {
    const { data, loading, error } = useApi("/api/questions/stats");
    const ref = useRef();
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    useEffect(() => {
        if (data && !loading) {
            const svg = d3.select(ref.current);
            const margin = { top: 20, right: 20, bottom: 30, left: 40 };
            const width = 960 - margin.left - margin.right;
            const height = 500 - margin.top - margin.bottom;

            const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
            const y = d3.scaleLinear().rangeRound([height, 0]);

            x.domain(Object.keys(data));
            y.domain([0, d3.max(Object.values(data))]);

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            svg.append("g").call(d3.axisLeft(y));

            svg.selectAll(".bar")
                .data(Object.entries(data))
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", ([key]) => x(key))
                .attr("y", ([, value]) => y(value))
                .attr("width", x.bandwidth())
                .attr("height", ([, value]) => height - y(value))
                .style("fill", (d, i) => colorScale(i));

            svg.selectAll(".text")
                .data(Object.entries(data))
                .enter()
                .append("text")
                .text(([key, value]) => value)
                .attr("x", ([key]) => x(key) + x.bandwidth() / 2)
                .attr("y", ([, value]) => 400)
                .attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                .attr("fill", "#333");
        }
    }, [data, loading]);

    return <svg ref={ref} width="960" height="500"></svg>;
};

export default BarChart;

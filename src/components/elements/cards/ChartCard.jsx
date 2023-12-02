import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  Filler
} from 'chart.js';
import { CardContainer } from '../../lib/styled';
import 'font-awesome/css/font-awesome.min.css';

const defaultModules = { BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend }; //Bar
const lineModules = { LineController, LineElement, PointElement };
const doughnutModules = { DoughnutController, ArcElement };
const interactionModules = { Filler };

const registerChartModules = (...moduleSets) => {
  const allModules = Object.values(moduleSets).flat().reduce((acc, moduleSet) => [...acc, ...Object.values(moduleSet)], []);
  Chart.register(...allModules);
};

registerChartModules(defaultModules, lineModules, doughnutModules, interactionModules);

const transformDataToDatasets = (dataArray, backgroundColor) => {
  return dataArray.map(dataset => {
    const label = dataset?.Timestamp || ''
    const sanitizedData = { ...dataset };
    delete sanitizedData?.Timestamp
    console.log(sanitizedData);
    return {
      label,
      data: Object.values(sanitizedData),
      backgroundColor,
    };
  });
};

const transformDataToLabels = (dataArray) => {
  const labels = [];
  Object.keys(dataArray || [])?.forEach(label => {
    if (label !== 'Timestamp') {
      labels.push(label);
    }
  });
  return labels;
};

const renderTooltip = (tooltipModel) => {
  let tooltipEl = document.getElementById('chartjs-tooltip');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<table></table>';
    document.body.appendChild(tooltipEl);
  }

  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }

  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || [];
    const bodyLines = tooltipModel.body.map(item => item.lines);

    let innerHtml = '<thead>';

    titleLines.forEach((title) => {
      innerHtml += '<tr><th>' + title + '</th></tr>';
    });
    innerHtml += '</thead><tbody>';

    bodyLines.forEach((body, i) => {
      const colors = tooltipModel.labelColors[i];
      let style = 'background:' + colors.backgroundColor;
      style += '; border-color:' + colors.borderColor;
      style += '; border-width: 2px';
      const span = '<span style="' + style + '"></span>';
      innerHtml += '<tr><td>' + span + body + '</td></tr>';
    });
    innerHtml += '</tbody>';

    const tableRoot = tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
  }

  const position = this._chart.canvas.getBoundingClientRect();

  tooltipEl.style.opacity = 1;
  tooltipEl.style.position = 'absolute';
  tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
  tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
  tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
  tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
  tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
  tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
};

const ChartCardComponent = ({
  label = 'Chart Card',
  type = 'doughnut',
  data,
  options = {},
  backgroundColor = ['#2E8BC0', '#B1D4E0', '#496F5E', '#1F2E2E', '#16262E']
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 0 });
  const [datasets, setDatasets] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    console.log({ data, datasets, labels })
  }, [datasets, labels])


  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [containerRef]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setDatasets(transformDataToDatasets(data, backgroundColor))
      const labels = transformDataToLabels(data[0]);
      console.log(labels);
      setLabels(labels);


    } else if (typeof data === 'object' && !Array.isArray(data)) {
      setDatasets([
        {
          label,
          data: Object.values(data),
          backgroundColor,
        },
      ])
      setLabels(Object.keys(data));
    }
  }, [data])

  useEffect(() => {
    if (!data) {
      console.error('Data is missing or invalid.');
      return;
    }

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    const devicePixelRatio = window.devicePixelRatio;

    canvasRef.current.width = dimensions.width * devicePixelRatio;
    canvasRef.current.height = dimensions.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    chartRef.current = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
          ...options.scales,
        },
        plugins: {
          tooltip: {
            enabled: true,
            custom: renderTooltip
          },
          legend: {
            display: true,
            position: 'top',
          },
        },
        ...options,
      }
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [data, label, type, options, backgroundColor, dimensions]);

  return (
    <SCardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Header>
        <i className="fa fa-bar-chart" aria-hidden="true"></i>
        {label}
      </Header>
      <CanvasWrapper>
        <Canvas ref={canvasRef}></Canvas>
      </CanvasWrapper>
    </SCardContainer>
  );
};

const SCardContainer = styled(CardContainer)`
justify-content: flex-start;
align-items: center;
min-height: 400px;
height: auto;
padding: 5px;
width: 60vw;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  font-weight: 600;
  padding: 12px;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ddd;

  color: #333;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  i {
    margin-right: 10px;
    color: #007bff;
  }
`;

const CanvasWrapper = styled(motion.div)`
  flex-grow: 1;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Canvas = styled.canvas`
  width: 90%;
  height: 90%;
  max-width: 100%;
`;

export default React.memo(ChartCardComponent);

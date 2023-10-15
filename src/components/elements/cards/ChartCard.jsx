import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineController, LineElement, PointElement, DoughnutController, ArcElement } from 'chart.js';
import { TIME } from '../../../functions/helpers';
import { CardContainer } from '../../lib/global-styled-components'

// Define the default modules as objects
const defaultModules = { BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend }; //Bar
const lineModules = { LineController, LineElement, PointElement };
const doughnutModules = { DoughnutController, ArcElement };
// Utility function to register modules
const registerChartModules = (...moduleSets) => {
  const allModules = Object.values(moduleSets).flat().reduce((acc, moduleSet) => {
    return [...acc, ...Object.values(moduleSet)];
  }, []);

  Chart.register(...allModules);
};

// Register modules
registerChartModules(defaultModules, lineModules, doughnutModules);

// Function to transform data array into Chart.js datasets
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
  Object.keys(dataArray).forEach(label => {
    if (label !== 'Timestamp') {
      labels.push(label);
    }
  });
  return labels;
};

const ChartCardComponent = ({
  label = 'Chart Card',
  type = 'doughnut',
  data,
  options = {},
  backgroundColor = ['red', 'green', 'blue', 'yellow', 'purple']
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
      

      // setLabels((data.map(object => Object.keys(object)))[0]);
      // console.log((data.map(object => Object.keys(object)))[0]);

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
        ...options,
      }
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [data, label, type, options, backgroundColor, dimensions]);

  return (
    // <motion.div ref={containerRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    //   <SCardContainer>
    //     <Canvas ref={canvasRef} role="img" aria-label="Chart Information" />
    //   </SCardContainer>
    // </motion.div>

    <SCardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Header>{label}</Header>
      <CanvasWrapper>
        <Canvas ref={canvasRef}></Canvas>
      </CanvasWrapper>
    </SCardContainer>
  );
};

const SCardContainer = styled(CardContainer)`
justify-content: flex-start;
align-items: center;
padding: 0;
min-height: 400px;
height: auto;
padding: 5px;
`;

const Header = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding: 12px;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ddd;
`;

const CanvasWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Canvas = styled.canvas`
  width: 90%;
  height: 90%;
`;

export default React.memo(ChartCardComponent);

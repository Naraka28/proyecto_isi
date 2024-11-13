import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Configuración necesaria para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Paso 1: Hacer una solicitud al backend para obtener los datos
    fetch("https://api.example.com/data") // Reemplaza con tu endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then(data => {
        // Paso 2: Procesar los datos y formatearlos para el gráfico
        const labels = data.map(item => item.label);
        const values = data.map(item => item.value);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Datos",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  // Paso 3: Renderizar el gráfico solo si hay datos
  return (
    <div>
     <h2>Grafica para .....   : </h2>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Gráfico de barras basado en datos del backend",
              },
            },
          }}
        />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default ChartComponent;

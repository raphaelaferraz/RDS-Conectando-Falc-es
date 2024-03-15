import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Estilização
const ContainerBarChart = styled.div`
  width: 100%;
  max-width: 100%; 
  height: 400px; 
  background-color: #F0F0F0;
  margin: 0 auto;
  margin-bottom: 30px;
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px; // Adiciona algum padding para estética
`;

// Este componente é responsável por renderizar um gráfico de barras
export default function BarChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Quantidade de alunos por oficina',
        data: [],
        backgroundColor: [

          'rgba(255, 99, 132, 0.2)',

          'rgba(54, 162, 235, 0.2)',

          'rgba(255, 206, 86, 0.2)',

          'rgba(75, 192, 192, 0.2)',

          'rgba(153, 102, 255, 0.2)',

          'rgba(255, 159, 64, 0.2)'

        ],

        borderColor: [

          'rgba(255, 99, 132, 1)',

          'rgba(54, 162, 235, 1)',

          'rgba(255, 206, 86, 1)',

          'rgba(75, 192, 192, 1)',

          'rgba(153, 102, 255, 1)',

          'rgba(255, 159, 64, 1)'

        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    async function fetchWorkshops() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/workshops/student`);
        const data = await response.json();
        const workshopNames = data.map((item: any) => item.workshopname);
        const totalStudents = data.map((item: any) => item.total_students);

        setChartData({
          labels: workshopNames,
          datasets: [
            {
              label: 'Quantidade de alunos por oficina',
              data: totalStudents,
              backgroundColor: [

                'rgba(255, 99, 132, 0.2)',
  
                'rgba(54, 162, 235, 0.2)',
  
                'rgba(255, 206, 86, 0.2)',
  
                'rgba(75, 192, 192, 0.2)',
  
                'rgba(153, 102, 255, 0.2)',
  
                'rgba(255, 159, 64, 0.2)'
  
              ],
  
              borderColor: [
  
                'rgba(255, 99, 132, 1)',
  
                'rgba(54, 162, 235, 1)',
  
                'rgba(255, 206, 86, 1)',
  
                'rgba(75, 192, 192, 1)',
  
                'rgba(153, 102, 255, 1)',
  
                'rgba(255, 159, 64, 1)'
  
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar dados dos workshops:', error);
      }
    }
    fetchWorkshops();
  }, []);

  return (
    <ContainerBarChart>
      <Bar data={chartData} options={{
        maintainAspectRatio: false, // Desativa a manutenção da proporção automática
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }} />
    </ContainerBarChart>
  );
}
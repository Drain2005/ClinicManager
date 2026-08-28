import { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import api from '../services/api';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Bilan() {
  const [stats, setStats] = useState({ total: 0, minimal: 0, maximal: 0 });
  const [chartType, setChart] = useState('bar');

  useEffect(() => {
    api.get('/medecins/bilan').then(r => {
      setStats({
        total: Number(r.data.total) || 0,
        minimal: Number(r.data.minimal) || 0,
        maximal: Number(r.data.maximal) || 0
      });
    });
  }, []);

  // Données pour le graphique 
  const chartData = {
    labels: ['Total', 'Minimal', 'Maximal'],
    datasets: [
      {
        label: 'Prestation (AR)',
        data: [stats.total, stats.minimal, stats.maximal],
        backgroundColor: ['#1a73e8', '#4caf50', '#ff9800'],
        borderColor: ['#1557b0', '#388e3c', '#e68900'],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  // Options pour un meilleur affichage
  const barOptions = {
    responsive: true,
    animation : false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Bilan des prestations',
        font: { size: 16 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString('fr-FR') + ' AR'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    animation: false,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
        text: 'Répartition du bilan',
        font: { size: 16 }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            return ` ${context.label} : ${value.toLocaleString('fr-FR')} AR`;
          }
        }
      }
    }
  };

  return (
    <div className='page'>
      <h2>Bilan et Statistiques</h2>

      {/* Cartes des statistiques */}
      <div className='stats-grid'>
        <div className='stat-card'>
          <span> Total</span>
          <strong>{stats.total.toLocaleString('fr-FR')} AR</strong>
        </div>
        <div className='stat-card'>
          <span> Minimal</span>
          <strong>{stats.minimal.toLocaleString('fr-FR')} AR</strong>
        </div>
        <div className='stat-card'>
          <span> Maximal</span>
          <strong>{stats.maximal.toLocaleString('fr-FR')} AR</strong>
        </div>
      </div>

      {/* Boutons pour changer de graphique */}
      <div className='chart-btns'>
        <button onClick={() => setChart('bar')}> Histogramme</button>
        <button onClick={() => setChart('doughnut')}> Camembert</button>
      </div>

      {/* Graphique */}
      <div className='chart-wrap'>
        {chartType === 'bar' ? (
          <Bar data={chartData} options={barOptions} />
        ) : (
          <Doughnut data={chartData} options={doughnutOptions} />
        )}
      </div>
    </div>
  );
}
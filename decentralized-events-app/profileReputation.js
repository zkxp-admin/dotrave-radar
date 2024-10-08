 // Sample data
 const reputationData = {
    labels: ['Artists', 'Venues', 'Organizers'],
    datasets: [{
      label: 'Average Reputation Score',
      data: [4.2, 4.5, 4.1],
      backgroundColor: ['rgba(98, 0, 234, 0.6)', 'rgba(3, 218, 198, 0.6)', 'rgba(207, 102, 121, 0.6)']
    }]
  };

  const performanceData = {
    labels: ['Punctuality', 'Professionalism', 'Quality', 'Audience Engagement', 'Collaboration'],
    datasets: [{
      label: 'Average Performance Metrics',
      data: [4.5, 4.3, 4.7, 4.2, 4.4],
      backgroundColor: 'rgba(3, 218, 198, 0.2)',
      borderColor: 'rgba(3, 218, 198, 1)',
      pointBackgroundColor: 'rgba(3, 218, 198, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(3, 218, 198, 1)'
    }]
  };

  const reputationChangesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Artists',
      data: [4.0, 4.1, 4.3, 4.2, 4.4, 4.2],
      borderColor: 'rgba(98, 0, 234, 1)',
      fill: false
    }, {
      label: 'Venues',
      data: [4.2, 4.3, 4.4, 4.5, 4.5, 4.5],
      borderColor: 'rgba(3, 218, 198, 1)',
      fill: false
    }, {
      label: 'Organizers',
      data: [3.9, 4.0, 4.1, 4.1, 4.2, 4.1],
      borderColor: 'rgba(207, 102, 121, 1)',
      fill: false
    }]
  };

  const feedbackData = {
    labels: ['Excellent', 'Good', 'Average', 'Poor', 'Terrible'],
    datasets: [{
      label: 'Feedback Distribution',
      data: [45, 30, 15, 7, 3],
      backgroundColor: [
        'rgba(3, 218, 198, 0.6)',
        'rgba(98, 0, 234, 0.6)',
        'rgba(255, 193, 7, 0.6)',
        'rgba(255, 87, 34, 0.6)',
        'rgba(207, 102, 121, 0.6)'
      ]
    }]
  };

  // Create charts
  const ctx1 = document.getElementById('reputationChart').getContext('2d');
  const ctx2 = document.getElementById('performanceChart').getContext('2d');
  const ctx3 = document.getElementById('reputationChangesChart').getContext('2d');
  const ctx4 = document.getElementById('feedbackChart').getContext('2d');

  new Chart(ctx1, {
    type: 'bar',
    data: reputationData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 5
        }
      }
    }
  });

  new Chart(ctx2, {
    type: 'radar',
    data: performanceData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            display: false
          },
          suggestedMin: 0,
          suggestedMax: 5
        }
      }
    }
  });

  new Chart(ctx3, {
    type: 'line',
    data: reputationChangesData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          min: 3.5,
          max: 5
        }
      }
    }
  });

  new Chart(ctx4, {
    type: 'doughnut',
    data: feedbackData,
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  // Populate top rated table
  function populateTopRatedTable() {
    const tableBody = document.querySelector('#topRatedTable tbody');
    const sampleData = [
      { name: 'DJ Stellar', type: 'Artist', score: 4.9, events: 15 },
      { name: 'Neon Warehouse', type: 'Venue', score: 4.8, events: 22 },
      { name: 'Rave Masters', type: 'Organizer', score: 4.7, events: 18 },
      { name: 'Techno Titans', type: 'Artist', score: 4.6, events: 12 },
      { name: 'Sunset Beach Club', type: 'Venue', score: 4.5, events: 20 }
    ];

    tableBody.innerHTML = '';
    sampleData.forEach(item => {
      const row = `
        <tr>
          <td>${item.name}</td>
          <td>${item.type}</td>
          <td>${item.score}</td>
          <td>${item.events}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }

  populateTopRatedTable();
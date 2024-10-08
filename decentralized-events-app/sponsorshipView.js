// Sample data for charts
const fundingGoalData = {
  labels: ['Goal 1', 'Goal 2', 'Goal 3'],
  datasets: [{
    label: 'Funding Goals (SOL)',
    data: [100, 200, 150],
    backgroundColor: ['rgba(98, 0, 234, 0.6)', 'rgba(3, 218, 198, 0.6)', 'rgba(255, 193, 7, 0.6)']
  }]
};

const allocationData = {
  labels: ['Marketing', 'Production', 'Logistics'],
  datasets: [{
    label: 'Funding Allocation (SOL)',
    data: [50, 100, 80],
    backgroundColor: ['rgba(255, 87, 34, 0.6)', 'rgba(207, 102, 121, 0.6)', 'rgba(3, 218, 198, 0.6)']
  }]
};

// Function to create charts
function createCharts() {
  const ctxFundingGoal = document.getElementById('fundingGoalChart').getContext('2d');
  const ctxAllocation = document.getElementById('allocationChart').getContext('2d');

  new Chart(ctxFundingGoal, {
    type: 'bar',
    data: fundingGoalData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  new Chart(ctxAllocation, {
    type: 'pie',
    data: allocationData,
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// Call createCharts when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', createCharts);
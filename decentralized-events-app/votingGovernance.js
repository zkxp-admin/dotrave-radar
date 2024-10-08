let forVotes = 0;
let againstVotes = 0;

document.addEventListener('DOMContentLoaded', function() {
    const eventVotingForm = document.getElementById('eventVotingForm');
    const contributorVotingForm = document.getElementById('contributorVotingForm');
    const proposalVotingForm = document.getElementById('proposalVotingForm');

    eventVotingForm.addEventListener('submit', handleFormSubmit);
    contributorVotingForm.addEventListener('submit', handleFormSubmit);
    proposalVotingForm.addEventListener('submit', handleProposalVote);

    // Add click event listeners to all voting option buttons
    document.querySelectorAll('.voting-option').forEach(button => {
        button.addEventListener('click', handleVotingOptionClick);
    });

    initializeChart();
});

function handleVotingOptionClick(e) {
    const button = e.target;
    const form = button.closest('form');
    const hiddenInput = form.querySelector('input[type="hidden"]');
    
    // Remove 'selected' class from all buttons in this form
    form.querySelectorAll('.voting-option').forEach(btn => btn.classList.remove('selected'));
    
    // Add 'selected' class to clicked button
    button.classList.add('selected');
    
    // Set the value of the hidden input
    hiddenInput.value = button.dataset.value;
}

function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formId = e.target.id;
    let voteType, voteValue;

    if (formId === 'eventVotingForm') {
        voteType = 'Event';
        voteValue = formData.get('eventRating');
    } else if (formId === 'contributorVotingForm') {
        voteType = 'Contributor';
        voteValue = formData.get('contributorRating');
    }

    if (voteValue) {
        showNotification(`Your ${voteType} vote "${voteValue}" has been submitted`);
        e.target.reset();
        e.target.querySelectorAll('.voting-option').forEach(btn => btn.classList.remove('selected'));
    } else {
        showNotification('Please select an option before submitting');
    }
}

function handleProposalVote(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const vote = formData.get('proposalVote');

    if (vote) {
        if (vote === 'for') {
            forVotes++;
        } else {
            againstVotes++;
        }
        updateProposalVotes();
        showNotification(`You voted "${vote}" on the proposal`);
        e.target.reset();
        e.target.querySelectorAll('.voting-option').forEach(btn => btn.classList.remove('selected'));
    } else {
        showNotification('Please select a vote option');
    }
}

function updateProposalVotes() {
    const totalVotes = forVotes + againstVotes;
    const forPercentage = totalVotes > 0 ? (forVotes / totalVotes) * 100 : 0;
    document.getElementById('proposalProgress').style.width = `${forPercentage}%`;
    document.getElementById('forVotes').textContent = forVotes;
    document.getElementById('againstVotes').textContent = againstVotes;
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function updateVotingPower() {
    const organizerPower = document.getElementById('organizerPower').value;
    const contributorPower = document.getElementById('contributorPower').value;

    if (parseInt(organizerPower) + parseInt(contributorPower) !== 100) {
        showNotification('Total voting power must equal 100%');
    } else {
        showNotification('Voting power updated successfully');
    }
}

function initializeChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Attendance', 'Engagement', 'Revenue', 'Artist Performance', 'Venue Rating'],
            datasets: [{
                label: 'Summer Solstice Rave',
                data: [85, 90, 78, 95, 88],
                backgroundColor: 'rgba(3, 218, 198, 0.2)',
                borderColor: 'rgba(3, 218, 198, 1)',
                pointBackgroundColor: 'rgba(3, 218, 198, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(3, 218, 198, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        color: 'rgba(0, 0, 0, 0.7)'
                    },
                    ticks: {
                        color: 'rgba(0, 0, 0, 0.7)',
                        backdropColor: 'transparent'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(0, 0, 0, 0.7)'
                    }
                }
            }
        }
    });
}
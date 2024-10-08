document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eventForm');
    const progress = document.getElementById('progress');
    const modal = document.getElementById('previewModal');
    const closeBtn = document.getElementsByClassName('close')[0];

    form.addEventListener('input', updateProgress);
    form.addEventListener('submit', handleSubmit);
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function updateProgress() {
        const inputs = form.querySelectorAll('input:not([type="button"]), select, textarea');
        const filledInputs = Array.from(inputs).filter(input => input.value !== '');
        const progressPercentage = (filledInputs.length / inputs.length) * 100;
        progress.style.width = `${progressPercentage}%`;
    }

    function addTicketType() {
        const ticketTypes = document.getElementById('ticketTypesList');
        const newItem = document.createElement('div');
        newItem.className = 'dynamic-form-item';
        newItem.innerHTML = `
            <input type="text" name="ticket-type[]" placeholder="Ticket Type" required>
            <input type="number" name="ticket-price[]" placeholder="Price (SOL)" step="0.01" required>
            <button type="button" class="remove-item" onclick="removeItem(this)">Remove</button>
        `;
        ticketTypes.appendChild(newItem);
        updateProgress();
    }

    function addSolLocking() {
        const solLocking = document.getElementById('solLockingList');
        const newItem = document.createElement('div');
        newItem.className = 'dynamic-form-item';
        newItem.innerHTML = `
            <input type="text" name="contributor-role[]" placeholder="Contributor Role" required>
            <input type="number" name="sol-lock-amount[]" placeholder="SOL Amount" step="0.01" required>
            <button type="button" class="remove-item" onclick="removeItem(this)">Remove</button>
        `;
        solLocking.appendChild(newItem);
        updateProgress();
    }

    function addSponsorshipTier() {
        const sponsorshipTiers = document.getElementById('sponsorshipTiersList');
        const newItem = document.createElement('div');
        newItem.className = 'dynamic-form-item';
        newItem.innerHTML = `
            <input type="text" name="sponsorship-tier[]" placeholder="Tier Name" required>
            <input type="number" name="sponsorship-amount[]" placeholder="Amount (SOL)" step="0.01" required>
            <button type="button" class="remove-item" onclick="removeItem(this)">Remove</button>
        `;
        sponsorshipTiers.appendChild(newItem);
        updateProgress();
    }

    function removeItem(button) {
        button.parentElement.remove();
        updateProgress();
    }

    function previewEvent() {
        const formData = new FormData(form);
        let previewHTML = '<ul class="list-disc list-inside">';
        
        for (let [key, value] of formData.entries()) {
            if (Array.isArray(formData.getAll(key))) {
                const values = formData.getAll(key);
                previewHTML += `<li><strong>${key}:</strong> ${values.join(', ')}</li>`;
            } else {
                previewHTML += `<li><strong>${key}:</strong> ${value}</li>`;
            }
        }
        previewHTML += '</ul>';
        document.getElementById('previewContent').innerHTML = previewHTML;
        modal.style.display = "block";
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const eventData = Object.fromEntries(formData);
        
        // Here you would typically send the eventData to a server
        console.log('Event data:', eventData);
        alert('Event created successfully!');
    }

    // Expose functions to global scope
    window.addTicketType = addTicketType;
    window.addSolLocking = addSolLocking;
    window.addSponsorshipTier = addSponsorshipTier;
    window.removeItem = removeItem;
    window.previewEvent = previewEvent;
});

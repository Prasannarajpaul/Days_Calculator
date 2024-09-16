// Function to calculate the difference between two dates in days
function calculateDaysDifference(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
}

document.getElementById('startDate').addEventListener('change', updateDaysDifference);
document.getElementById('endDate').addEventListener('change', updateDaysDifference);

function updateDaysDifference() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (startDate && endDate) {
        const diffDays = calculateDaysDifference(startDate, endDate);
        document.getElementById('dateDifference').textContent = `Days Difference: ${diffDays} days`;
    } else {
        document.getElementById('dateDifference').textContent = '';
    }
}

document.getElementById('addEventBtn').addEventListener('click', function() {
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    
    if (eventName && eventDate) {
        const today = new Date();
        const daysPassed = calculateDaysDifference(eventDate, today);
        
        const eventList = document.getElementById('eventsList');
        const newEventItem = document.createElement('li');
        newEventItem.textContent = `${eventName}: ${eventDate}   (${daysPassed} days ago)`;
        
        eventList.appendChild(newEventItem);

        if (eventList.children.length === 1) {
            document.getElementById('saveWordBtn').style.display = '';
        }
        
        document.getElementById('eventName').value = '';
        document.getElementById('eventDate').value = new Date();
    } else {
        alert('Please enter both event name and date.');
    }
});

document.getElementById('startDate').valueAsDate = new Date();
document.getElementById('endDate').valueAsDate = new Date();
document.getElementById('eventDate').valueAsDate = new Date();

//saving the events
document.getElementById('saveWordBtn').addEventListener('click', function() {
    let eventsList = document.getElementById('eventsList').children;
    let content = "Events:\n\n";
    
    for (let i = 0; i < eventsList.length; i++) {
        content += eventsList[i].textContent + '\n';
    }
    
    const blob = new Blob([content], { type: 'application/msword' });
    saveAs(blob, 'events.doc');
});

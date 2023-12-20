
// Function to handle button clicks for API message
function handleButtonClick(apiEndpoint, outputElements) {
    fetch(apiEndpoint, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            // Refresh both tables to keep them synchronized
            outputElements.forEach(element => {
                displayData(apiEndpoint, element);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to automatically fetch and display data.data
function displayData(apiEndpoint, outputElementData) {
    fetch(apiEndpoint, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            // Check if data.data is undefined, null, or empty
            if (data.data && Array.isArray(data.data) && data.data.length > 0) {
                // Map each object to a string representation
                const formattedData = data.data.map(row => {
                    // Extract values from each object and join them
                    return Object.values(row).join(', '); // Joins all values in the object with a comma
                }).join('<br>'); // Joins all rows with a line break
                // Update the HTML content of the specified element
                document.getElementById(outputElementData).innerHTML = formattedData;
            } else {
                // If data.data is undefined, null, or empty, make the element blank
                document.getElementById(outputElementData).innerHTML = '';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById(outputElementData).innerText = 'Error loading data';
        });
}

// Event listeners for button clicks
document.getElementById('button-r').addEventListener('click', () => {
    handleButtonClick('http://localhost:8000/api-r', ['output-table-r', 'output-table-py']);
});

document.getElementById('clear-button-r').addEventListener('click', () => {
    handleButtonClick('http://localhost:8000/delete-r', ['output-table-r', 'output-table-py']);
})

document.getElementById('button-py').addEventListener('click', () => {
    handleButtonClick('http://127.0.0.1:5000/api-py', ['output-table-r', 'output-table-py']);
});

// Display database table data from each API in real-time
displayData('http://localhost:8000/api-r', 'output-table-r');
displayData('http://127.0.0.1:5000/api-py', 'output-table-py');
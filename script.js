
// Function to handle button clicks for API message
function handleButtonClick(apiEndpoint, outputElements, method = 'POST') {
    fetch(apiEndpoint, { method: method })
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
        .then(response => {
            if (!response.ok) {
                throw new Error('No data available');
            }
            return response.json();
        })
        .then(data => {
            if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
                document.getElementById(outputElementData).innerHTML = '';
            } else {
                const formattedData = data.data.map(row => {
                    return Object.values(row).join(', ');
                }).join('<br>');
                document.getElementById(outputElementData).innerHTML = formattedData;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Change this line to make the output blank instead of showing 'Error loading data'
            document.getElementById(outputElementData).innerHTML = '';
        });
}

// Event listeners for button clicks
document.getElementById('button-insert-records-r').addEventListener('click', () => {
    handleButtonClick('http://localhost:8000/api-r', ['output-r', 'output-py']);
});

document.getElementById('button-delete-records-r').addEventListener('click', () => {
    handleButtonClick('http://localhost:8000/delete-r', ['output-r', 'output-py']);
})

document.getElementById('button-insert-records-py').addEventListener('click', () => {
    handleButtonClick('http://127.0.0.1:5000/api-py', ['output-r', 'output-py']);
});

document.getElementById('button-delete-records-py').addEventListener('click', () => {
    handleButtonClick('http://127.0.0.1:5000/delete-api-py', ['output-r', 'output-py'], 'DELETE');
});

// Display database table data from each API in real-time
displayData('http://localhost:8000/api-r', 'output-r');
displayData('http://127.0.0.1:5000/api-py', 'output-py');
// Sample API URL to fetch data from
const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // I decided to use the API endpoint provided by JSONPlaceholder, which is a fake online REST API used for testing and development 

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to render the items in the grid
function renderItems(data) {
  const container = document.querySelector('.container');

  data.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.textContent = item.title; // sampe API data

    itemDiv.addEventListener('click', () => {
      openModal(item); // Show the modal with detailed item information on click
    });

    container.appendChild(itemDiv);
  });
}

// Function to open the modal with detailed item information
function openModal(item) {
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalContent = document.querySelector('.modal');

  modalContent.innerHTML = `
    <h2>${item.title}</h2>
    <p>${item.body}</p>
    <span class="close-btn">&times;</span>
  `;

  modalOverlay.style.display = 'block';

  // Close modal when the close button is clicked
  const closeBtn = document.querySelector('.close-btn');
  closeBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside the modal content
  modalOverlay.addEventListener('click', event => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
}

// Function to close the modal
function closeModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  modalOverlay.style.display = 'none';
}

// Entry point: Fetch data and render items on page load
window.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchData();
  renderItems(data);
});

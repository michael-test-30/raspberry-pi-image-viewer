// Function to fetch the manifest.json
async function fetchManifest() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/yourusername/raspberry-pi-images/main/manifest.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const manifest = await response.json();
        return manifest;
    } catch (error) {
        console.error('Error fetching manifest:', error);
        return [];
    }
}

// Function to populate the date picker
function populateDatePicker(dates) {
    const datePicker = document.getElementById('datePicker');
    dates.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        datePicker.appendChild(option);
    });
}

// Function to display images for a selected date
function displayImages(images) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // Clear previous images

    images.forEach(image => {
        const div = document.createElement('div');
        div.classList.add('image-item');

        const img = document.createElement('img');
        img.src = image.url;
        img.alt = `Image at ${image.time}`;
        img.title = image.time;
        img.onclick = () => openModal(image.url, image.time);

        div.appendChild(img);
        imageContainer.appendChild(div);
    });
}

// Modal functionality
function openModal(src, caption) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');

    modal.style.display = 'block';
    modalImg.src = src;
    captionText.innerHTML = `Time: ${caption}`;

    // Close the modal when the user clicks on <span> (x)
    const span = document.getElementsByClassName('close')[0];
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Close the modal when the user clicks anywhere outside the image
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Main function to initialize the website
async function init() {
    const manifest = await fetchManifest();

    // Extract unique dates
    const uniqueDates = [...new Set(manifest.map(item => item.date))].sort((a, b) => new Date(b) - new Date(a));

    populateDatePicker(uniqueDates);

    // Add event listener to date picker
    document.getElementById('datePicker').addEventListener('change', function() {
        const selectedDate = this.value;
        if (selectedDate) {
            const imagesForDate = manifest.filter(item => item.date === selectedDate).sort((a, b) => new Date(`1970-01-01T${a.time}Z`) - new Date(`1970-01-01T${b.time}Z`));
            displayImages(imagesForDate);
        } else {
            document.getElementById('imageContainer').innerHTML = '';
        }
    });
}

// Initialize on page load
window.onload = init;

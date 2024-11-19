// Global Functions

// Filter the cars on the grid view by brand and model.
function filterCars(attribute, value) {
    const carGrid = document.getElementById('carGrid');
    const carItems = carGrid.getElementsByClassName('grid-item');
    for (let i = 0; i < carItems.length; i++) {
        const item = carItems[i];
        if (item.getAttribute('data-' + attribute) === value) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
}

// Search the cars in the grid view by brand, type, model and fuel.
function searchCars(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    if (searchInput.length === 0) {
        return;
    }
    const carGrid = document.getElementById('carGrid');
    const carItems = carGrid.getElementsByClassName('grid-item');
    for (let i = 0; i < carItems.length; i++) {
        const item = carItems[i];
        const brand = item.getAttribute('data-brand').toLowerCase();
        const type = item.getAttribute('data-type').toLowerCase();
        const model = item.getAttribute('data-model').toLowerCase();
        const fuel = item.getAttribute('data-fuel').toLowerCase();
        if (brand.includes(searchInput) || type.includes(searchInput) || model.includes(searchInput) || fuel.includes(searchInput)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
    saveRecentSearch(searchInput);
}

// Show suggestions when the search bar is partially filled.
function showSuggestions() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = ''; // Clear previous suggestions

    if (searchInput.length === 0) {
        showRecentSearches();
        return;
    }

    const carGrid = document.getElementById('carGrid');
    const carItems = carGrid.getElementsByClassName('grid-item');
    let suggestionList = [];

    for (let i = 0; i < carItems.length; i++) {
        const item = carItems[i];
        const brand = item.getAttribute('data-brand').toLowerCase();
        const type = item.getAttribute('data-type').toLowerCase();
        const model = item.getAttribute('data-model').toLowerCase();
        const fuel = item.getAttribute('data-fuel').toLowerCase();

        if (brand.includes(searchInput) && !suggestionList.includes(brand)) {
            suggestionList.push(brand);
        }
        if (type.includes(searchInput) && !suggestionList.includes(type)) {
            suggestionList.push(type);
        }
        if (model.includes(searchInput) && !suggestionList.includes(model)) {
            suggestionList.push(model);
        }
        if (fuel.includes(searchInput) && !suggestionList.includes(fuel)) {
            suggestionList.push(fuel);
        }
    }

    for (let suggestion of suggestionList) {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = suggestion;
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.onclick = function() {
            document.getElementById('searchInput').value = suggestion;
            suggestions.innerHTML = '';
        };
        suggestions.appendChild(suggestionItem);
    }
}

// Save any recent searches.
function saveRecentSearch(search) {
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    if (!recentSearches.includes(search)) {
        recentSearches.unshift(search);
        if (recentSearches.length > MAX_RECENT_SEARCHES) {
            recentSearches.pop();
        }
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
}

// Show recent searches when the search bar is selected and empty.
function showRecentSearches() {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = ''; // Clear previous suggestions

    if (recentSearches.length === 0) {
        return;
    }

    for (let search of recentSearches) {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = search;
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.onclick = function() {
            document.getElementById('searchInput').value = search;
            suggestions.innerHTML = '';
            searchCars(new Event('submit')); // Trigger search
        };
        suggestions.appendChild(suggestionItem);
    }
}

// Rent button for the car in grid view
function rentCar(car) {
    if (car.availability) {
        localStorage.setItem('selectedCar', JSON.stringify(car));
        window.location.href = 'reservation.php';
    } else {
        alert('This car is not available for rent.');
    }
}

// Calculate total cost
function calculateTotalCost(car) {
    const quantity = parseInt(document.getElementById('quantity').value);
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const timeDiff = endDate - startDate;
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff >= 0) {
        const totalCost = car.price * quantity * (daysDiff + 1); // +1 to include the end date
        document.getElementById('totalCost').textContent = totalCost.toFixed(2);
    } else {
        document.getElementById('totalCost').textContent = '0.00';
    }
}

// Validate email format
function isValidEmail(email) {
    return email.includes('@');
}

// Check if all fields are filled
function areAllFieldsFilled() {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'license', 'startDate', 'endDate'];
    return fields.every(field => document.getElementById(field).value.trim() !== '');
}

// Enable or disable the submit button
function toggleSubmitButton() {
    const email = document.getElementById('email').value;
    const isFormValid = areAllFieldsFilled() && isValidEmail(email) && parseInt(document.getElementById('quantity').value) > 0 && document.getElementById('totalCost').textContent !== '0.00';
    document.getElementById('submitReservation').disabled = !isFormValid;
}

// Clear the reservation and rented car from reservation.php
function clearReservationData() {
    localStorage.removeItem('reservationData');
    localStorage.removeItem('selectedCar');
}

// Display the confirmation details
function displayConfirmationDetails() {
    const reservationData = JSON.parse(localStorage.getItem('reservationData'));
    if (reservationData) {
        document.getElementById('confirmationDetails').innerHTML = `
            <h2>Reservation Confirmation</h2>
            <p>Car: ${reservationData.car.brand} ${reservationData.car.model}</p>
            <p>Quantity: ${reservationData.quantity}</p>
            <p>Start Date: ${reservationData.startDate}</p>
            <p>End Date: ${reservationData.endDate}</p>
            <p>Total Cost: $${reservationData.totalCost.toFixed(2)}</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const inputFields = ['firstName', 'lastName', 'email', 'phone', 'license', 'startDate', 'endDate'];
    inputFields.forEach(field => {
        document.getElementById(field)?.addEventListener('input', toggleSubmitButton);
    });

    // Increase button on the reservation.php for the quantity
    document.getElementById('increaseQuantity')?.addEventListener('click', (e) => {
        e.preventDefault();
        let quantity = parseInt(document.getElementById('quantity').value);
        document.getElementById('quantity').value = quantity + 1;
        calculateTotalCost(JSON.parse(localStorage.getItem('selectedCar')));
        toggleSubmitButton();
    });

    // Decrease button on the reservation.php for the quantity
    document.getElementById('decreaseQuantity')?.addEventListener('click', (e) => {
        e.preventDefault();
        let quantity = parseInt(document.getElementById('quantity').value);
        if (quantity > 1) {
            document.getElementById('quantity').value = quantity - 1;
            calculateTotalCost(JSON.parse(localStorage.getItem('selectedCar')));
            toggleSubmitButton();
        }
    });

    // Cancel button on the reservation.php for the clearing the reservation
    document.getElementById('cancelReservation')?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('selectedCar');
        window.location.href = 'index.php';
    });

    // Checking the Email
    document.getElementById('email')?.addEventListener('input', () => {
        const email = document.getElementById('email').value;
        if (!isValidEmail(email)) {
            document.getElementById('email').setCustomValidity('Invalid email format');
        } else {
            document.getElementById('email').setCustomValidity('');
        }
        toggleSubmitButton();
    });

    // Reservation.php display
    if (window.location.pathname.includes('reservation.php')) {
        const car = JSON.parse(localStorage.getItem('selectedCar'));
        if (car) {
            const reservationDetails = document.getElementById('reservationDetails');
            reservationDetails.innerHTML = `
                <img src="Images/${car.image}" alt="${car.brand}">
                <h3>${car.brand} ${car.model}</h3>
                <p>Type: ${car.type}</p>
                <p>Price: $${car.price}/day</p>
                <p>Mileage: ${car.mileage}km</p>
                <p>Fuel: ${car.fuel}</p>
                <p>Seats: ${car.seats}</p>
            `;
            document.getElementById('quantity').addEventListener('change', () => calculateTotalCost(car));
            document.getElementById('startDate').addEventListener('change', () => calculateTotalCost(car));
            document.getElementById('endDate').addEventListener('change', () => calculateTotalCost(car));

            document.getElementById('reservationForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const reservationData = {
                    car: car,
                    quantity: parseInt(document.getElementById('quantity').value),
                    startDate: document.getElementById('startDate').value,
                    endDate: document.getElementById('endDate').value,
                    totalCost: parseFloat(document.getElementById('totalCost').textContent),
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    license: document.getElementById('license').value
                };
                localStorage.setItem('reservationData', JSON.stringify(reservationData));
                window.location.href = 'confirmation.php';
            });

            calculateTotalCost(car); // Initialize total cost
        }
    }

    // Confirmation.php display
    if (window.location.pathname.includes('confirmation.php')) {
        displayConfirmationDetails();

        document.getElementById('backToHomeButton')?.addEventListener('click', function() {
            clearReservationData();
            window.location.href = 'index.php';
        });
    }

    const searchInputElement = document.getElementById('searchInput');
    const searchFormElement = document.getElementById('searchForm');
    const suggestionsElement = document.getElementById('suggestions');

    if (searchInputElement && searchFormElement && suggestionsElement) {
        searchInputElement.addEventListener('focus', showRecentSearches);
        searchInputElement.addEventListener('input', showSuggestions);
        searchFormElement.addEventListener('submit', searchCars);
    }
});

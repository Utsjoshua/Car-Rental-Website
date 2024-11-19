<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vroom Renters</title>
    <link href="style.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="main.js" defer></script>
</head>
<body>
    <header>
        <div class="logo">
            <img src="Images/Logo.png" alt="Logo">
        </div>

        <div class="separator"></div>

        <nav>
            <ul>
                <li><a class="title" href="index.php"> Vroom Renters </a></li>

                <li class="dropdown">
                    <a class="subtitle" href="#">Car Brands</a>
                    <ul class="dropdown-menu" id="brandDropdown">
                        <li><a href="#" onclick="filterCars('brand', 'BMW')">BMW</a></li>
                        <li><a href="#" onclick="filterCars('brand', 'Ford')">Ford</a></li>
                        <li><a href="#" onclick="filterCars('brand', 'Honda')">Honda</a></li>
                        <li><a href="#" onclick="filterCars('brand', 'Mazda')">Mazda</a></li>
                        <li><a href="#" onclick="filterCars('brand', 'Toyota')">Toyota</a></li>
                    </ul>
                </li>

                <li class="dropdown">
                    <a class="subtitle" href="#">Car Types</a>
                    <ul class="dropdown-menu" id="typeDropdown">
                        <li><a href="#" onclick="filterCars('type', 'Hatchback')">Hatchback</a></li>
                        <li><a href="#" onclick="filterCars('type', 'Sedan')">Sedan</a></li>
                        <li><a href="#" onclick="filterCars('type', 'SUV')">SUV</a></li>
                        <li><a href="#" onclick="filterCars('type', 'Wagon')">Wagon</a></li>
                    </ul>
                </li>

                <li><a class="subtitle" href="reservation.php"> Reservation </a></li>
            </ul>
        </nav>

        <div class="search-bar">
            <form id="searchForm" method="GET" onsubmit="searchCars(event)">
                <input type="text" name="search" id="searchInput" placeholder="Search for a car..." oninput="showSuggestions()">
                <button type="submit"><i class="fa fa-search"></i></button>
                <div id="suggestions" class="suggestions"></div>
            </form>
        </div>
    </header> 

    <h1> Car rentals </h1>
    
    <div class="grid-container" id="carGrid">
        <?php
            // Read JSON file
            $json_data = file_get_contents('rentals.json');

            // Decode JSON data into PHP associative array
            $cars = json_decode($json_data, true);

            // Output the decoded data
            foreach ($cars['cars'] as $car) {

                echo "<div class='grid-item' 
                data-brand='{$car['brand']}' 
                data-type='{$car['type']}' 
                data-image='{$car['image']}'
                data-price='{$car['price']}' 
                data-mileage='{$car['mileage']}' 
                data-fuel='{$car['fuel']}' 
                data-model='{$car['model']}' 
                data-seats='{$car['seats']}'
                >";

                echo "<img src='Images/{$car['image']}' alt='{$car['brand']}'>";
                echo "<h3>{$car['brand']} {$car['model']}</h3>";
                echo "<p>Type: {$car['type']}</p>";
                echo "<p>Price: \${$car['price']}/day</p>";
                echo "<p>Milage: {$car['mileage']}km</p>";
                echo "<p>Fuel type: {$car['fuel']}</p>";
                echo "<p>Seats: {$car['seats']}</p>";
                echo "<p>Quantity: {$car['quantity']}</p>";
                echo "<p>Description: {$car['description']}</p>";
                echo '<p>Availability: ' . ($car['availability'] ? 'Yes' : 'No') . '</p>';
                
                echo '<button class="rentbtn" onclick="rentCar(' . htmlspecialchars(json_encode($car)) . ')" ' . ($car['availability'] ? '' : 'disabled') . '>Rent</button>';
                echo "</div>";
            }
        ?>
    </div>

</body>
</html>

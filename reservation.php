<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Vroom Renters </title>
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
          <li><a class="subtitle" href="index.php"><span class="fa fa-chevron-left"></span> Return to Car rentals </a></li>
          <li><a class="subtitle" href="reservation.php"> Reservation </a></li>
        </ul>
      </nav>
    </header>

    <h1>Car Reservation</h1>

    <div class= "reservation-container">
      <div id="reservationDetails" class="reservation-details">
        <!-- Car details will be displayed here -->
      </div>

      <div class="reservation-controls">
        <form id="reservationForm">
          <label for="quantity">Quantity:</label>

          <div class="quantity">
            <button id="decreaseQuantity">-</button>
            <input type="number" id="quantity" value="1" min="1" readonly>
            <button id="increaseQuantity">+</button>
          </div>

          <label for="startDate">Start Date:</label>
          <input type="date" id="startDate">

          <label for="endDate">End Date:</label>
          <input type="date" id="endDate">

          <p>Total Cost: $<span id="totalCost">0.00</span></p>

          <label for="firstName">First Name:</label>
          <input type="text" id="firstName">

          <br>

          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName">

          <br>

          <label for="email">Email:</label>
          <input type="email" id="email">

          <br>

          <label for="phone">Phone Number:</label>
          <input type="tel" id="phone">

          <br>

          <label for="license">Driver's License Number:</label>
          <input type="text" id="license">

          <br>

          <button type="button" id="cancelReservation">Cancel</button>
          <button id="submitReservation" disabled>Submit</button>
        </form>
      </div>
    </div>
    
  </body>
</html>
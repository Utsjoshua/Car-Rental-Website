<!DOCTYPE html>
<html>
  <head>
    <title> Vrrom Renters </title>
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
          <li><a class="title" href="index.php">Vroom Renters</a></li>
          <li><a class="subtitle" href="index.php"><span class="fa fa-chevron-left"></span> Return to Car renatals</a></li>
          <li><a class="subtitle" href="reservation.php"><span class="fa fa-chevron-left"></span> Return to Reservation</a></li>
        </ul>
      </nav>
    </header>

    <h1>Order Confirmation</h1>

    <div class="container">
        <h2>Thank you</h2>
        <p>Thank you for submitting your details. To finsih your reservation, please press the button below: </p>

        <div id="confirmationDetails">
          <!-- Reservation details will be inserted here by JavaScript -->
        </div>

        <button class="finish" id="backToHomeButton">Finish</button>

    </div>
    
  </body>

</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raspberry Pi Image Viewer</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Raspberry Pi Image Viewer</h1>
    <div class="controls">
        <label for="datePicker">Select Date:</label>
        <select id="datePicker">
            <option value="">--Select Date--</option>
        </select>
    </div>
    <div id="imageContainer"></div>

    <!-- Modal for displaying full-size images -->
    <div id="modal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="modalImage">
        <div id="caption"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>

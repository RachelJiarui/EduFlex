function UserInput() {

    document.getElementById("inputForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
      
        // Get user input
        var userInput = document.getElementById("inputField").value;
      
        // Process user input (Example: Uppercase the input)
        var processedInput = userInput.toUpperCase();
      
        // Display output
        var outputDiv = document.getElementById("outputDiv");
        outputDiv.innerHTML = "<p>User Input: " + userInput + "</p>";
        outputDiv.innerHTML += "<p>Processed Input: " + processedInput + "</p>";
      });
      

}

export default UserInput;
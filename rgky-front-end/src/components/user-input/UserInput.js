function UserInput() {

    document.getElementById("inputForm").addEventListener("submit", function(event) {
        event.preventDefault();
      
        var userInput = document.getElementById("inputField").value;
      
        var processedInput = userInput.toUpperCase();

        var outputDiv = document.getElementById("outputDiv");
        outputDiv.innerHTML = "<p>User Input: " + userInput + "</p>";
        outputDiv.innerHTML += "<p>Processed Input: " + processedInput + "</p>";
      });
      

}

export default UserInput;
document.addEventListener("DOMContentLoaded", function () {
    const destinationContainer = document.getElementById("destinationContainer");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const userDetailsForm = document.getElementById("userDetailsForm");
  
    // Fetch data from db.json
    fetch('db.json')
      .then((response) => response.json())
      .then((data) => {
        const destinations = data.destinations;
  
        searchButton.addEventListener("click", function () {
          const searchText = searchInput.value.toLowerCase();
          const matchingDestinations = destinations.filter(destination => destination.name.toLowerCase().includes(searchText));
  
          displayDestinations(matchingDestinations);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  
    // Handle user details form submission
    userDetailsForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const userName = document.getElementById("userName").value;
      const userEmail = document.getElementById("userEmail").value;
      const userComments = document.getElementById("userComments").value;
  
      // Display or process the user's details, e.g., console.log or send to a server
      console.log(`User Name: ${userName}`);
      console.log(`User Email: ${userEmail}`);
      console.log(`User Comments: ${userComments}`);
    });
  
    function displayDestinations(destinations) {
      destinationContainer.innerHTML = '';
  
      if (destinations.length === 0) {
        destinationContainer.textContent = "No matching destinations found.";
      } else {
        destinations.forEach(destination => {
          const destinationDiv = document.createElement("div");
          destinationDiv.className = "destination";

          const destinationName = document.createElement("h2");
          destinationName.textContent = destination.name;

          const destinationDescription = document.createElement("p");
          destinationDescription.textContent = destination.description;

          const destinationImage = document.createElement("img");
          destinationImage.src = destination.image;
          destinationImage.alt = destination.name;

          const likeButton = document.createElement("button");
        likeButton.className = "likeButton";
        likeButton.textContent = "Like";
        const likeCount = document.createElement("span");
        likeCount.className = "likeCount";
        likeCount.textContent = "0 Likes";

        likeButton.addEventListener("click", function () {
          // Get the current like count
          let count = parseInt(likeCount.textContent);

          // Increment the like count
          count++;

          // Update the like count text
          likeCount.textContent = count === 1 ? `${count} Like` : `${count} Likes`;
        });

        destinationDiv.appendChild(destinationName);
        destinationDiv.appendChild(destinationDescription);
        destinationDiv.appendChild(destinationImage);
        destinationDiv.appendChild(likeButton);
        destinationDiv.appendChild(likeCount);

        destinationContainer.appendChild(destinationDiv);
      });
    }
  }
});
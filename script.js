document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM is fully loaded!");
const searchButton = document.getElementById("search-button");
const usernameInput = document.getElementById("user-input");
const statsContainer = document.querySelector(".stats-container");
const easyProgressCircle = document.querySelector(".easy-progress");
const mediumProgressCircle = document.querySelector(".medium-progress");
const hardProgressCircle = document.querySelector(".hard-progress");
const easyLabel = document.getElementById("easy-label");
const mediumLabel = document.getElementById("medium-label");
const hardLabel = document.getElementById("hard-label");
const cardStatsContainer = document.querySelector(".stats-cards") ;

function validateusername(username){
    if(username.trim() === "") {
        alert("Username should not be empty");
        return false;

    }
    const regex = /^[a-zA-Z0-9_]{1,15}$/;
    const isMatching = regex.test(username);
    if(!isMatching){
        alert("Invalid username");
    }
}

async function fetchUserDetails(username){
    const url = `https://leetcode-stats-api.herokuapp.com/
    ${username}`
    try {
        searchButton.textContent = "Searching...";
        searchButton.disabled = true;

        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Unable to fetch the user details");
        }
        const data = await response.json();
        console.log("Logging data: ",data);
    }
    catch(error){
        statsContainer.innerHTML = `<p>No data found</p>`;
    }
    finally{
        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
}
searchButton.addEventListener('click',function(){
    let username = usernameInput.value;
    console.log(username);
    if(validateusername(username)){
        
    }
    
}) 

});

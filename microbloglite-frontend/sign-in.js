/* Landing Page JavaScript */

"use strict";

signupForm.onsubmit = function (event) {
  event.preventDefault();

  const signupData = {
    username: signupForm.username.value,
    fullName: signupForm.fullName.value,
    password: signupForm.password.value,
  };

  signUp(signupData);
};

function signUp(signupData) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  };
  return fetch(apiBaseURL + "/api/users", options)
    .then((response) => response.json())
    .then((loginData) => {
      if (loginData.message === "Invalid username or password") {
        console.error(loginData);
        return null;
      }

      window.localStorage.setItem("signup-data", JSON.stringify(loginData));
      window.location.assign("index.html");
      return loginData;
    });
}

document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const fullName = document.getElementById("fullName").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const userData = {
      fullName: fullName,
      username: username,
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch(apiBaseURL + "/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }
  
      // Successful registration
      alert("Registration successful! Redirecting to login page...");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
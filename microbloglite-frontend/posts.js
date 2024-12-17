/* Posts Page JavaScript */

"use strict";
async function getPosts() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  try {
    let promise = fetch(apiBaseURL + "/api/posts", options);
    let response = await promise;
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    
  }
}
getPosts();


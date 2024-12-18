/* Posts Page JavaScript */

"use strict";
//const apiBaseURL = "http://localhost:5005";
const tweetForm = document.getElementById("tweetForm");
const tweetTextInput = document.getElementById("tweetText");
const postList = document.getElementById("postList");

const authToken = getLoginData().token;

tweetForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const tweetText = tweetTextInput.value.trim();

  if (!tweetText) {
    alert("Please enter some text to post.");
    return;
  }

  const newPost = {
    text: tweetText,
  };

  try {
    const response = await createPost(newPost);
    if (response.ok) {
      const post = await response.json();
      console.log("Post created successfully", post);
      window.location.reload();
      tweetTextInput.value = "";
    } else {
      console.error("Failed to create post", await response.json());
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
});

async function createPost(postData) {
  const response = await fetch(`${apiBaseURL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(postData),
  });

  return response;
}

async function getPosts() {
  const loginData = getLoginData();
  const options = { method: "GET", headers: { Authorization: `Bearer ${authToken}` } };
  try {
    let response = await fetch("http://localhost:5005/api/posts?limit=100&offset=0", options);
    let posts = await response.json();
    console.log("posts", posts);
    return posts;
  } catch (error) {
    console.log("error:", error.message);
  }
}

function populatePostCards(posts) {
  postList.innerHTML = "";
  for (const post of posts) {
    let postCard = createPostCard(post);
    postList.appendChild(postCard);
  }
}

function createPostCard(post) {
  // Create the outer post div
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  // Create the avatar section
  const avatarDiv = document.createElement("div");
  avatarDiv.classList.add("post_avatar");
  // Create the post body
  const postBodyDiv = document.createElement("div");
  postBodyDiv.classList.add("post_body");

  // Create the post header section
  const postHeaderDiv = document.createElement("div");
  postHeaderDiv.classList.add("post_header");

  // Header Text (username and special)
  const postHeaderTextDiv = document.createElement("div");
  postHeaderTextDiv.classList.add("post_headerText");
  const headerH3 = document.createElement("h3");
  headerH3.textContent = post.username;
  const postHeaderSpecialSpan = document.createElement("span");
  postHeaderSpecialSpan.classList.add("postHeaderSpecial");
  headerH3.appendChild(postHeaderSpecialSpan);
  postHeaderTextDiv.appendChild(headerH3);

  // Header Description (post text)
  const postHeaderDescriptionDiv = document.createElement("div");
  postHeaderDescriptionDiv.classList.add("post_headerDescription");
  const descriptionP = document.createElement("p");
  descriptionP.textContent = post.text;
  postHeaderDescriptionDiv.appendChild(descriptionP);

  postHeaderDiv.appendChild(postHeaderTextDiv);
  postHeaderDiv.appendChild(postHeaderDescriptionDiv);

  // Create the footer (icons)
  const postFooterDiv = document.createElement("div");
  postFooterDiv.classList.add("post_footer");

  const commentIcon = document.createElement("i");
  commentIcon.classList.add("uil", "uil-comment");
  const repeatIcon = document.createElement("i");
  repeatIcon.classList.add("uil", "uil-repeat");
  const heartIcon = document.createElement("i");
  heartIcon.classList.add("uil", "uil-heart");
  const shareIcon = document.createElement("i");
  shareIcon.classList.add("uil", "uil-share-alt");

  postFooterDiv.appendChild(commentIcon);
  postFooterDiv.appendChild(repeatIcon);
  postFooterDiv.appendChild(heartIcon);
  postFooterDiv.appendChild(shareIcon);

  // Append everything together
  postBodyDiv.appendChild(postHeaderDiv);

  postBodyDiv.appendChild(postFooterDiv);

  postDiv.appendChild(avatarDiv);
  postDiv.appendChild(postBodyDiv);

  return postDiv;
}

async function initializePage() {
  let posts = await getPosts();
  populatePostCards(posts);
}

initializePage();

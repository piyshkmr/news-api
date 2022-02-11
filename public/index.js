const supportedImageExtensions = ["png", "jpg", "jpeg"];

/**
 * to select the dom element
 * @param {*} selector
 * @returns dom element
 */
const select = (selector) => {
  return document.querySelector(selector);
};

/**
 * show alert message for 3 seconds
 * @param {*} text message to show
 * @param {*} type type of message
 */
const showMessage = (text, type) => {
  let message;
  if (type === "error") {
    message = select("#error-message");
    message.innerText = text;
  } else {
    message = select("#success-message");
    message.innerText = text;
  }

  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 3000);
};

/**
 * validate the form and return true or false
 * @returns true if all field in form are correct and false if not
 */
const validateForm = () => {
  const title = select("#title").value.trim();
  const content = select("#content").value.trim();
  const thumbnail = select("#thumbnail").value;

  if (!title || !content || !thumbnail) {
    return showMessage("All Fields are Required", "error");
  }

  const thumbnailExtention = thumbnail.split(".").pop();

  if (!supportedImageExtensions.includes(thumbnailExtention)) {
    return showMessage("Unsupported image file", "error");
  }

  return true;
};

const form = select("#form");

// adding eventlistener on form on submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const isValid = validateForm();
  if (isValid) {
    const formData = new FormData(form);

    select("#loading-screen").style.display = "flex";

    // post request to server to create new post
    const response = await fetch("/api/create", {
      method: "POST",
      body: formData,
    });

    select("#loading-screen").style.display = "none";

    if (response.status === 201) {
      showMessage("Post Created Successfully!", "success");
      select("#title").value = null;
      select("#content").value = null;
      select("#thumbnail").value = null;
    } else if (response.status === 500) {
      showMessage("Something went wrong try again", "error");
    }
  }
});

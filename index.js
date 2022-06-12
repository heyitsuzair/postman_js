console.log("This is index.js");

//  Utility functions
// 1. Utility function to get the dom element from string
function getDomElement(String) {
  let div = document.createElement("div");
  div.innerHTML = String;
  return div.firstElementChild;
}

// Initialize params count
let paramsCount = 0;

// Hide params box initially
let paramsBox = document.getElementById("paramsbox");
paramsBox.style.display = "none";

// if the user clicks on params button, hide json box
let paramsRadio = document.getElementById("params-radio");
paramsRadio.addEventListener("click", function () {
  let jsonBox = document.getElementById("jsonbox");
  jsonBox.style.display = "none";
  paramsBox.style.display = "block";
});

// if the user clicks on json button, hide parmas box
let paramsJson = document.getElementById("json-radio");
paramsJson.addEventListener("click", function () {
  let paramBox = document.getElementById("paramsbox");
  paramBox.style.display = "none";
  let jsonBox1 = document.getElementById("jsonbox");
  jsonBox1.style.display = "block";
});

// if the user click on plus button, add more params
let plusButton = document.getElementById("plus-button");
plusButton.addEventListener("click", function () {
  let params = document.getElementById("params");
  let str = `<div class="row mt-2">
  <div class="col">
  <input
    type="text"
    id="paramkey${paramsCount + 2}"
    class="form-control"
    placeholder="${paramsCount + 2} Key"
    aria-label="First Parameter"
  />
</div>
<div class="col">
  <input
    id="paramvalue${paramsCount + 2}"
    type="text"
    class="form-control"
    placeholder="${paramsCount + 2} Key Value"
    aria-label="Second Parameter"
  />
</div>
    <div class="col"><button class="del-param btn btn-primary">-</button></div>
  </div>`;
  let paramelem = getDomElement(str);
  //   console.log(paramelem);
  params.appendChild(paramelem);
  // add event listener to the delete button
  let delButton = document.getElementsByClassName("del-param");

  for (const item of delButton) {
    item.addEventListener("click", function () {
      // add a confirmation dialog to delete the param
      item.parentElement.parentElement.remove();
    });
  }
  paramsCount++;
});
// if the users click on submit button, send the request
let fetchButton = document.getElementById("fetch_btn");
fetchButton.addEventListener("click", function () {
  // Show please wait in the response box to indicate that the request is being processed
  document.getElementById("response-prism").innerHTML =
    "Please wait... Fetching Data.";
  Prism.highlightAll();

  // get the url
  let url = document.getElementById("urlbox").value;
  // get the method
  let method = document.querySelector('input[name="radios"]:checked').value;
  // get the content type
  let contentType = document.querySelector('input[name="radio"]:checked').value;

  // if the user use params, get the params
  if (contentType == "Params") {
    data = {};
    for (let i = 0; i < paramsCount + 1; i++) {
      if (document.getElementById("paramkey" + (i + 1)) != undefined) {
        let key = document.getElementById(`paramkey${i + 1}`).value;
        let value = document.getElementById(`paramvalue${i + 1}`).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("json-box").value;
  }
  // log values in console for debugging
  console.log("contentType", contentType);
  console.log("url", url);
  console.log("method", method);
  console.log("data", data);

  // if my request is a post request, send the data
  if (method == "POST") {
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.getElementById("response-prism").innerHTML =
          JSON.stringify(data);
        Prism.highlightAll();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // if my request is a get request, get the data
  if (method == "GET") {
    fetch(url, {
      method: method,
    })
      .then((response) => response.text())
      .then((text) => {
        console.log(data);
        document.getElementById("response-prism").innerHTML = text;
        Prism.highlightAll();
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

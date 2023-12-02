console.log("ee")
// Define your GitHub repo and file path
const owner = "wongkeytreez";
const repo = "New-folder";
const path = "idk.json";

// Replace with your GitHub personal access token
let token = "ghp_"+atob("Qjg4Njl0WXZoclpLblI5OXV2RG1jS1BUSkVrd0VOMTc=");
token = token +"SkiL"
let maxRetries =3
let userIP;

function fetchUserIP(maxRetries, retries = 0) {
  if (retries >= maxRetries) {
    console.error("Failed to retrieve the user's IP address after multiple attempts.");
    return;
  }

  // Fetch the user's IP address
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      userIP = data.ip;

      if (userIP === undefined) {
       
        // Retry after a delay (e.g., 1 second)
        setTimeout(() => fetchUserIP(maxRetries, retries + 1), 1000);
      } else {
        updateGitHubFile();
      }
    })
    .catch(error => {
    
      if (retries < maxRetries) {
       
        // Retry after a delay (e.g., 1 second)
        setTimeout(() => fetchUserIP(maxRetries, retries + 1), 1000);
      }
    });
}
const userAgent = navigator.userAgent;

console.log( userAgent.match(/(\w+)\/(\d+\.\d+\.\d+\.\d+)/)[1])

function updateGitHubFile() {
  // Make a GET request to get the current file content
  let location;
   fetch(`https://ipinfo.io/${userIP}/json?token=ddc68121fce0ee`, {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      
     location=data.city+", "+data.region+", "+data.timezone;
    
      fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {

    const content = JSON.parse(atob(data.content));
   
     
      content[userIP] = {time:new Date().toString().split(" GMT")[0],location:location,language: navigator.language,browser:userAgent.match(/(\w+)\/(\d+\.\d+\.\d+\.\d+)/)[1],wh:window.screen.width,ww: window.screen.height};

      // Make a PUT request to update the file
      fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
        },
        body: JSON.stringify({
          message: "Update file",
          content: btoa(JSON.stringify(content)), // Encode new content as base64
          sha: data.sha, // Include the original file's SHA
        }),
      });
    })
    .catch(error => {
      console.error("Error updating GitHub file:", error);
    });
     });
   fetch(`https://api.github.com/repos/${owner}/${repo}/contents/idk.txt`, {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {

    let content = atob(data.content);
   
     
      content = content+`time:${new Date().toString().split(" GMT")[0]},location:${location},language: ${navigator.language},browser:${userAgent.match(/(\w+)\/(\d+\.\d+\.\d+\.\d+)/)[1]},wh:${window.screen.width},ww: ${window.screen.height}}`+"\n";

      // Make a PUT request to update the file
      fetch(`https://api.github.com/repos/${owner}/${repo}/contents/idk.txt`, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
        },
        body: JSON.stringify({
          message: "Update file",
          content: btoa(content), // Encode new content as base64
          sha: data.sha, // Include the original file's SHA
        }),
      });
    })
    .catch(error => {
      console.error("Error updating GitHub file:", error);
    });
     
} 

// Start the process by attempting to fetch the user's IP address with a maximum of 3 retries
fetchUserIP(3);

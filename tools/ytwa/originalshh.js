document.write(`
    <title>YT WA</title>
    <style>
    :root {
        --text: #ffffff;
        --text-dull: #a0a0a0;
    }
    body {background: #000000; margin: 0; font-family: Arial, sans-serif;}
    nav {background: #ffffff11; height: 60px; display: flex; align-items: center; justify-content: center;}
    input {background: none; width: 100%; color: var(--text); border: none; border-bottom: 1px solid #707070; padding: 5px 8px; transition: border 0.2s ease;}
    input:focus {outline: none;}
    input ~ .focus-border {position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background-color: #e0e0e0; transition: 0.4s;}
    input:focus ~ .focus-border {width: 100%; transition: 0.3s;}
    .input-wrap {position: relative;}
    button {background: transparent; border: none; border-radius: 50%; height: 32px; width: 32px; color: var(--text); font-size: 20px; display: flex; align-items: center; justify-content: center; flex-direction: column; margin-left: 10px; transition: background-color 0.2s ease;}
    button:hover {cursor: pointer; background: #ffffff22;}
    .wrapper {background: #ffffff22; aspect-ratio: 17/9; max-height: calc(100vh - 100px); overflow: hidden; width: 100%; display: flex; align-items: center; justify-content: center; position: relative;}
    #yt-embed {background: #ffffff22; height: 100%; aspect-ratio: 16/9;}
    #fullscreen-btn {position: absolute; bottom: 5; right: 5; font-size: 24px;}
    
    .container {max-width: 800px; margin: 0 auto; padding: 20px; background: #ffffff22; margin: 10px auto;}
    .container h3 {margin: 0; margin-bottom: 10px; color: var(--text);}
    .search-bar {display: flex; justify-content: space-between; margin-bottom: 20px;}
    .search-bar .input-wrap {width: 100%; height: 27px}
    .results {list-style-type: none; padding: 0;}
    .result-item {display: flex; margin-bottom: 20px; align-items: flex-start; overflow: hidden;}
    .thumbnail {margin-right: 10px; flex-shrink: 0; width: 168px;}
    .details {display: flex; flex-direction: column; flex: 1; max-width: 100%;}
    .details a {color: var(--text); text-decoration: underline;}
    .details a:hover {cursor: pointer;}
    .title {font-size: 18px; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: calc(100% - 178px);}
    .description {color: var(--text-dull); font-size: 14px; height: 18px; margin: 0; padding: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: calc(100% - 180px); margin-top: 5px;}
    .user-info {display: flex; align-items: center; margin-top: 5px;}
    .user-info img {border-radius: 50%; width: 40px; height: 40px; margin-right: 10px;}
    .channel-title {color: var(--text); font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;}
    .date {color: var(--text-dull); font-size: 12px; margin-top: -2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;}

    #pagination {display: flex; width: 100%; align-items: center; justify-content: center; margin-top: 20px;}
    #pagination button {margin: 0 10px;}
    #pagination button[disabled] {color: var(--text-dull);}
    #pagenumber {margin: 0; color: var(--text-dull);}
    </style>
        <nav>
            <div class="input-wrap">
              <input type="text" placeholder="YouTube Video ID or URL" id="yt-id">
              <span class="focus-border"></span>
            </div>
            <button onclick="getVid()" id="yt-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 4h10v14a2 2 0 0 1-2 2H9m3-5l3-3m0 0l-3-3m3 3H5"/>
              </svg>
            </button>
          </nav>
        
          <div class="wrapper">
            <embed src="" id="yt-embed" allow="fullscreen">
            <button onclick="attemptToggleFullscreen()" id="fullscreen-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 14H5v5h5v-2H7zm-2-4h2V7h3V5H5zm12 7h-3v2h5v-5h-2zM14 5v2h3v3h2V5z"/></svg>
            </button>
          </div>
        
          <div class="container">
            <h3>Or search for videos (WIP)</h3>
            <div class="search-bar">
                <div class="input-wrap">
                    <input type="text" id="searchQuery" placeholder="Search YouTube">
                    <span class="focus-border"></span>
                </div>
                <button onclick="searchVideos()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/>
                    </svg>
                </button>
            </div>
            <ul id="results" class="results"></ul>
            <div id="pagination">
              <button id="prevPageBtn" onclick="prevPage()" disabled><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M168.49 199.51a12 12 0 0 1-17 17l-80-80a12 12 0 0 1 0-17l80-80a12 12 0 0 1 17 17L97 128Z"/></svg></button>
              <span id="pageNumber">1</span>  <!-- Display the current page number -->
              <button id="nextPageBtn" onclick="nextPage()" disabled><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m184.49 136.49l-80 80a12 12 0 0 1-17-17L159 128L87.51 56.49a12 12 0 1 1 17-17l80 80a12 12 0 0 1-.02 17"/></svg></button>
            </div>
          </div>
    `);

function getVid() {
  let ytInput = document.getElementById('yt-id').value;
  let videoId = ytInput.includes('youtube.com') || ytInput.includes('youtu.be') ?
    ytInput.split('v=')[1]?.split('&')[0] || ytInput.split('be/')[1] :
    ytInput;

  // Update the URL parameter
  let newUrl = new URL(window.location.href);
  newUrl.searchParams.set('v', videoId);
  window.history.replaceState({}, '', newUrl);

  // Set the video
  let embed = document.getElementById('yt-embed');
  embed.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
}

function setVideoFromUrl() {
  let urlParams = new URLSearchParams(window.location.search);
  let videoId = urlParams.get('v');

  if (videoId) {
    document.getElementById('yt-id').value = videoId;
    let embed = document.getElementById('yt-embed');
    embed.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
  }
}

function attemptToggleFullscreen() {
  const ytEmbed = document.getElementById('yt-embed');

  if (!document.fullscreenElement) {
    ytEmbed.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener('keydown', function(event) {
  if (event.target.id !== 'searchQuery' && event.target.id !== 'yt-id') {
    const key = event.key.toLowerCase();
    if (key === 'f') {
      attemptToggleFullscreen();
    } else if (key === 'escape') {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  }
});

// Set video on page load if ?v parameter exists
window.onload = setVideoFromUrl;
document.getElementById('yt-id').addEventListener("keypress", function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    document.getElementById('yt-id').blur();
    getVid();
  }
});

let nextPageToken = '';
let prevPageToken = '';
let currentPage = 1; // Track the current page number
const resultsPerPage = 30; // Number of results per page

async function searchVideos(pageToken = '') {
  const query = document.getElementById('searchQuery').value;
  const aK = atob('QUl6YVN5QUliOFJjLUtvOGZWeDJnLTFvZGxmeklkVl8weHVINjZj');
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultsPerPage}&q=${encodeURIComponent(query)}&type=video&key=${aK}&pageToken=${pageToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    nextPageToken = data.nextPageToken || '';
    prevPageToken = data.prevPageToken || '';
    displayResults(data.items);
    updatePaginationButtons();
    updatePageNumber(); // Update the page number display
  } catch (error) {
    alert('Caught error fetching YouTube data: ', error);
  }
}

function updatePaginationButtons() {
  document.getElementById('nextPageBtn').disabled = !nextPageToken;
  document.getElementById('prevPageBtn').disabled = !prevPageToken;
}

function updatePageNumber() {
  document.getElementById('pageNumber').innerText = `${currentPage}`;
}

async function getChannelDetails(channelId) {
  const aK = atob('QUl6YVN5QUliOFJjLUtvOGZWeDJnLTFvZGxmeklkVl8weHVINjZj');
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${aK}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items[0].snippet.thumbnails.default.url;
}

async function getVideoDetails(videoId) {
  const aK = atob('QUl6YVN5QUliOFJjLUtvOGZWeDJnLTFvZGxmeklkVl8weHVINjZj');
  const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${aK}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items[0].contentDetails.duration;
}

function parseDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match[1] || '0H').slice(0, -1);
  const minutes = (match[2] || '0M').slice(0, -1);
  const seconds = (match[3] || '0S').slice(0, -1);
  let result = '';
  if (hours !== '0') {
    result += `${hours}:`;
  }
  result += `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  return result;
}

async function displayResults(items) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results

  for (const item of items) {
    const videoId = item.id.videoId;
    const title = item.snippet.title;
    const description = item.snippet.description;
    const thumbnailUrl = item.snippet.thumbnails.medium.url;
    const channelTitle = item.snippet.channelTitle;
    const publishedAt = new Date(item.snippet.publishedAt).toLocaleDateString();
    const channelId = item.snippet.channelId;

    const profilePictureUrl = await getChannelDetails(channelId);
    const duration = await getVideoDetails(videoId);
    const videoLength = parseDuration(duration);

    const li = document.createElement('li');
    li.classList.add('result-item');

    li.innerHTML = `
      <img class="thumbnail" src="${thumbnailUrl}" alt="${title}" width="120">
      <div class="details">
        <a onclick="document.getElementById('yt-id').value='${videoId}'; getVid(); window.scrollTo({ top: 0, behavior: 'smooth' });" target="_blank" class="title" title="${title}">${title}</a>
        <span class="description">${description}</span>
        <div class="user-info">
          <img src="${profilePictureUrl}" alt="${channelTitle}'s profile picture">
          <div>
            <a href="/channel/?u=${channelId}" class="channel-title">${channelTitle}</a><br>
            <span class="date">Published on: ${publishedAt} | <b>${videoLength}</b></span>
          </div>
        </div>
      </div>
    `;
    resultsContainer.appendChild(li);
  }
}

function nextPage() {
  if (nextPageToken) {
    searchVideos(nextPageToken);
    currentPage++; // Increment the current page number
  }
}

function prevPage() {
  if (prevPageToken) {
    searchVideos(prevPageToken);
    currentPage--; // Decrement the current page number
  }
}

document.getElementById("searchQuery").addEventListener("keypress", function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    document.getElementById("searchQuery").blur();
    searchVideos();
  }
});

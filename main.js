const API_KEY = "AIzaSyCRIBLv287ZWf90Wq4HM3GUAHZQmEHOUqI";
const BASE_URL = " https://www.googleapis.com/youtube/v3/videos?";
const NUM_1_TITLE = document.getElementById("video-title");
const DESCRIPTION = document.getElementById("movie-description");
const POSTERS = document.getElementById("thumbnail-rows");
const PLAY = document.getElementById("play");
const views = document.getElementById("views");
const bannerBG = document.getElementById("banner-bg");

const params = new URLSearchParams({
  key: API_KEY,
  part: "snippet",
  chart: "mostPopular",
  maxResults: 20,
  regionCode: "KE",
});

const getViewsParams = new URLSearchParams({
  key: API_KEY,
  part: "statistics",
  chart: "mostPopular",
  maxResults: 20,
  regionCode: "KE",
});

fetch(BASE_URL + params)
  .then((response) => response.json())
  .then((data) => {
    NUM_1_TITLE.innerText = data.items[0].snippet.title;
    bannerBG.src = data.items[0].snippet.thumbnails.maxres.url;

    PLAY.addEventListener("click", () => {
      console.log(data.items[0].id);
      location.replace(`https://www.youtube.com/watch?v=${data.items[0].id}`);
    });

    let html = "";
    const sliced = data.items.slice(1, 20);

    sliced.forEach((item) => {
      POSTERS.src = item.snippet.thumbnails.medium.url;
      
      const YTBASE_URL = "https://www.youtube.com/watch?v=";
              
              html += `
      <div class="video">
            <img src="${item.snippet.thumbnails.high.url}" alt="" />
            <div class="details">
              <h2>${item.snippet.title}</h2>
              <p>${item.snippet.description.slice(0, 300)}....</p>
              <button class="play"><a href=${YTBASE_URL + item.id
                } target="_blank">Play</a></button>
            </div>
          </div>
                `;
        });
      POSTERS.innerHTML = html;
  });

fetch(BASE_URL + getViewsParams)
  .then((response) => response.json())
  .then((data) => {
    let good_num = data.items[0].statistics.viewCount
    let gooood_num = parseInt(good_num) //because the value received is a string
    let perfect_num = gooood_num.toLocaleString() //adds commas
    views.innerText = `Views:  ${perfect_num}`;
  });

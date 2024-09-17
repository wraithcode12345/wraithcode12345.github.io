document.write(`
        <title>YT WA</title>
        <style>
            body {background: #000000; margin: 0;}
            nav {background: #ffffff11; height: 60px; display: flex; align-items: center; justify-content: center;}
            #yt-id {background: none; color: #ffffff; border: none; border-bottom: 1px solid #707070; padding: 5px 8px; transition: border 0.2s ease;}
            #yt-id:focus {outline: none;}
            #yt-id ~ .focus-border {position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background-color: #e0e0e0; transition: 0.4s;}
            #yt-id:focus ~ .focus-border {width: 100%; transition: 0.4s;}
            .yt-id-wrap {position: relative;}
            button {background: transparent; border: none; border-radius: 50%; height: 32px; width: 32px; color: #ffffff; font-size: 20px; display: flex; align-items: center; justify-content: center; flex-direction: column; margin-left: 10px; transition: background 0.2s ease;}
            button:hover {cursor: pointer; background: #ffffff22}
            .wrapper {background: #ffffff22; aspect-ratio: 17/9; max-height: calc(100% - 100px); overflow: hidden; width: 100%; display: flex; align-items: center; justify-content: center;}
            #yt-embed {background: #ffffff22; height: 100%; aspect-ratio: 16/9;}
        </style>
        <nav>
            <div class="yt-id-wrap">
                <input type="text" placeholder="YouTube Video ID or URL" id="yt-id">
                <span class="focus-border"></span>
            </div>
            <button onclick="getVid()" id="yt-btn"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 4h10v14a2 2 0 0 1-2 2H9m3-5l3-3m0 0l-3-3m3 3H5"/></svg></button>
        </nav>
        <div class="wrapper">
            <embed src="" id="yt-embed">
        </div>
    `);
    const ytBtn = document.getElementById("yt-btn");
    const ytIdInput = document.getElementById("yt-id");
    const ytEmbed = document.getElementById("yt-embed");
    function getVid() {
        const ytUrl = ytIdInput.value;
        const extractVideoId = (url) => {
            const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
            return match ? match[1] : null;
        };
        const videoId = extractVideoId(ytUrl);
        if (videoId) {
            ytEmbed.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
        } else {
            ytEmbed.src = `https://www.youtube-nocookie.com/embed/${ytUrl}`;
        }
    }
    ytIdInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            ytIdInput.blur();
            ytBtn.click();
        }
    });

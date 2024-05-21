function updateNavAndFooter() {
  document.getElementById("navbar").innerHTML = `
    <div class="left">
      <img src="/logo_large.png">
      <a href="/">Home</a>
      <a href="/about">About</a>
    </div>
    <div class="right">
      <a href="/nexturl">Next URL</a>
      <a href="/chat">Chat</a>
      <a href="/eaglauncher">Eaglercraft</a>
      <a href="/more">More</a>
    </div>
  `;
  
  document.getElementById("footer").innerHTML = `
    <h4 style="margin-bottom: 5px;">Contact</h4>
      <a><i class="fa-brands fa-github"></i> &nbsp;&nbsp; <a href="https://github.com/wraithcode20haha">Github</a></a><br>
      <a><i class="fa-brands fa-stack-overflow"></i> &nbsp;&nbsp; <a href="https://stackoverflow.com/users/22487123/wraithcode">Stack Overflow</a></a><br>
      <a><i class="fa-brands fa-youtube"></i> &nbsp;&nbsp; <a href="https://www.youtube.com/channel/UC1M1KgAJWRcQ_GUwea8_irw">Youtube</a></a><br>
      <a><i class="fa fa-wheat-awn"></i> &nbsp;&nbsp; <a href="https://wraithcode.straw.page">Straw Page</a></a>
      <h2>&lt;More footer content here&gt;</h2>
      <p id="ip-display">fetching ip...</p>
      <script src="/text-assets/js/getip.js"></script>
      <script>
        const ipListElement = document.getElementById('ip-display'); function displayIPs() { const public1 = { value: null }; const public2 = { value: null }; const private1 = { value: null }; getIP('private1', private1); ipListElement.innerHTML = "Your IP: " + (private1.value || 'Could not fetch IP');} setTimeout(displayIPs, 1000);
      </script>
  `;
}

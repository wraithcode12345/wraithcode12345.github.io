function updateNavAndFooter() {
            document.getElementById("navbar").innerHTML += `
                <div class="left">
                    <img src="/logo_large.png">
                    <a href="/"><i class="fa-solid fa-house"></i>&nbsp; Home</a>
                    <a href="/about"><i class="fa-solid fa-info-circle"></i>&nbsp; About</a>
                    <a href="/chat"><i class="fa-solid fa-comment-dots"></i>&nbsp; Chat</a>
                </div>
                <div class="right">
                    <a href="/nexturl"><i class="fa-solid fa-globe"></i>&nbsp; Next URL</a>
                    <a href="/axislauncher"><i class="fa-solid fa-cube"></i>&nbsp; Axis</a>
                    <a href="/more"><i class="fa-solid fa-circle-plus"></i>&nbsp; More</a>
                    <a href="/settings"><i class="fa-solid fa-gear"></i>&nbsp; Settings</a>
                </div>
            `;
            
            const footer = document.getElementById("footer");
            footer.innerHTML = `
                <h4 style="margin-bottom: 5px;">Contact</h4>
                <a><i class="fa-brands fa-github"></i> &nbsp;&nbsp; <a href="https://github.com/wraithcode20haha">Github</a></a><br>
                <a><i class="fa-brands fa-stack-overflow"></i> &nbsp;&nbsp; <a href="https://stackoverflow.com/users/22487123/wraithcode">Stack Overflow</a></a><br>
                <a><i class="fa-brands fa-youtube"></i> &nbsp;&nbsp; <a href="https://www.youtube.com/channel/UC1M1KgAJWRcQ_GUwea8_irw">Youtube</a></a><br>
                <a><i class="fa fa-wheat-awn"></i> &nbsp;&nbsp; <a href="https://wraithcode.straw.page">Straw Page</a></a>
                <h2>&lt;More footer content here&gt;</h2>
                <p id="ip-display">fetching ip...</p>
            `;

            // Dynamically load external script
            const script1 = document.createElement("script");
            script1.src = "/text-assets/js/getip.js";

            // Inline script for displaying IP after the external script is loaded
            const script2 = document.createElement("script");
            script2.textContent = `
                const ipListElement = document.getElementById('ip-display');
                function displayIPs() {
                    const public1 = { value: null };
                    const public2 = { value: null };
                    const private1 = { value: null };
                    getIP('private1', private1);
                    ipListElement.innerHTML = "Your IP: " + (private1.value || 'Could not fetch IP');
                }
                setTimeout(displayIPs, 1000);
            `;

            // Append the scripts to the footer
            footer.appendChild(script1);
            footer.appendChild(script2);
        }

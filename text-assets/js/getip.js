function getUserIPs(onNewIP) {
    const myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    const pc = new myPeerConnection({
        iceServers: []
    });
    const noop = () => {};
    const localIPs = {};
    const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/g;
    const localIPRanges = [
        /^10\./,
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
        /^192\.168\./
    ];

    function isLocalIP(ip) {
        return localIPRanges.some(regex => regex.test(ip));
    }

    function iterateIP(ip) {
        if (!localIPs[ip]) {
            const label = isLocalIP(ip) ? "private" : "public";
            onNewIP(ip, label);
        }
        localIPs[ip] = true;
    }

    pc.createDataChannel("");
    pc.createOffer().then(sdp => {
        sdp.sdp.split('\n').forEach(line => {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }).catch(reason => {
        console.error(reason);
    });

    pc.onicecandidate = (ice) => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

const ipAddresses = {
    public: [],
    private: []
};

function storeIP(ip, label) {
    if (label === "public") {
        ipAddresses.public.push(ip);
    } else {
        ipAddresses.private.push(ip);
    }
}

getUserIPs(storeIP);

function getIP(type, variable) {
    if (type === "public1") {
        variable.value = ipAddresses.public[0] || null;
    } else if (type === "public2") {
        variable.value = ipAddresses.public[1] || null;
    } else if (type === "private1") {
        variable.value = ipAddresses.private[0] || null;
    } else {
        variable.value = null;
    }
}

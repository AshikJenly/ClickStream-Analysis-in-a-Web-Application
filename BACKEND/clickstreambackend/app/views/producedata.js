const data = {
    userId: "a",
    sessionId: 'lkajdi84893jdalkaoooqp',
    pageUrl: "",
    deviceType: "",
    browser: "",
    geoLocation: "",
    eventType: "",
    adClicked: false,
    adId: "",
    durationSeconds: 10
};
let adData = []; // Initialize adData as an empty array


async function fetchData() {
    try {
        const response = await fetch('/ads/getallads', {
            method: 'GET'
        });
        const fetchedData = await response.json();
        adData = fetchedData;
        console.log(adData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function initialize() {
    await fetchData();
    postData();
}

function postData() {
    updateData();
    console.log(data);
    fetch('http://localhost:9096/produce/useractivity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            // Handle the response as needed
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateData() {
    data.browser = detectBrowser();
    data.deviceType = detectDeviceType();
    data.geoLocation = Intl.DateTimeFormat().resolvedOptions().timeZone;
    data.pageUrl = window.location.href;
    data.eventType = "page_view";
    data.adId = adData[0].id ;
}

function detectBrowser() {
    let userAgent = navigator.userAgent;
    let browserName;

    if (userAgent.match(/firefox|fxios/i)) {
        browserName = "Firefox";
    } else if (userAgent.match(/opr/i)) {
        browserName = "Opera";
    } else if (userAgent.match(/edg/i)) {
        browserName = "Edge";
    } else if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "Chrome";
    } else if (userAgent.match(/safari/i)) {
        browserName = "Safari";
    } else {
        browserName = "Unknown Browser";
    }

    document.querySelector("h1").innerText = "You are using " + browserName + " browser";
    return browserName;
}

function detectDeviceType() {
    let userAgent = navigator.userAgent;
    let deviceType;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        deviceType = "Mobile";
    } else if (/Mac|Windows|Linux/i.test(userAgent)) {
        deviceType = "Laptop/Desktop";
    } else if (/Tablet/i.test(userAgent)) {
        deviceType = "Tablet";
    } else {
        deviceType = "Unknown";
    }

    document.querySelector("h3").innerText = "Device Type: " + deviceType;
    return deviceType;
}

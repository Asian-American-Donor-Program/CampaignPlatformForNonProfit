export function getTags(input: { Confidence: number, TagName: string }[]) {
    let out = '';
    input.forEach(item => {
        if (item.Confidence >= 90) {
            out += ` ${item.TagName}`
        }
    })
    return out;
}

export function getKeywords(input: string[]) {
    let out = '';
    input.forEach(item => {
        out += ` ${item}`
    })
    return out;
}

export function getLinks(input: string) {
    const inputArray = input.split(',')
    const out = ` Register: ${inputArray[0]} Give: ${inputArray[1]} Learn More: ${inputArray[2]}`;
    return out;
}

export function getNewGUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export function postData(url = ``, data = {}) {
    // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => response.json()) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
}

export function getData(url = ``) {
    // Default options are marked with *
    return fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    })
        .then(response => response.json()) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
}
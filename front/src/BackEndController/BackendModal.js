
const BEVI_HOST = process.env.REACT_APP_BEVY_API

const requestInit = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

function CallReadAPI(api, cb) {
    const url = BEVI_HOST + api;
    fetch(url, requestInit)
        .then((response) => {
            if (response.ok) {
                const json = response.json();
                cb(json);
            } else {

            }
            console.log(`response for ${url} is ${response.status}`);
        });
}

export { CallReadAPI };




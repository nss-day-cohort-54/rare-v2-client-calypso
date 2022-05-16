// FetchIt is a universal fetch function
// takes the target url, a method, and a body
export const fetchIt = (url, method = "GET", body = null) => {
    // declare default options object
    let options = {
        "method": method,
        "headers": {}
    }
    // switch case based on method type
    switch (method) {
        // these need content-type header key
        case "POST":
        case "PUT":
            options.headers = {
                "Content-Type": "application/json"
            }
            break;
        default:
            break;
    }
    // adds body to request
    if (body !== null) {
        options.body = body
    }

    // send request with options, convert response to json
    return fetch(url, options)
            .then(r => {
                if(method != "DELETE" && method != "PUT"){
                    return r.json()  
                }
            })
}
class Api {
    getUsers() {
        return fetch("http://localhost:5002/users").then(e => e.json());
    }
    checkUserThing(thing, otherThing) {
        return fetch(`http://localhost:5002/users/?${thing}=${otherThing}`).then(e => e.json())
    }
    checkEmail(email) {
        return fetch(`http://localhost:5002/users/?email=${email}`).then(e => e.json())
    }

    registerUser (name, email, password, region) {
        return fetch("http://localhost:5002/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: name,
                email: email,
                password: password,
                region: region
            })
        }).then(e => e.json());
    }
    ////////////////////////////////////////////////////////////////////// POSTS /////////////////////////////////////////////
    postItem(userId, title, price, location, category, description, region){
        return fetch("http://localhost:5002/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                title: title,
                price: price,
                location: location,
                categorieId: category,
                description: description,
                regionId: region,
                photo: ""
            })
        }).then(e => e.json());
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getUserPosts(userId){
        return fetch(`http://localhost:5002/posts?userId=${userId}`).then(e => e.json())
    }
}

const ApiManager = new Api()
export default ApiManager
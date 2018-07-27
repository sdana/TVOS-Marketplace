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
    //////////////////////////////////////////////////////////////////////          GENERAL POSTS              /////////////////////////////////////////////
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

    getRegionalPosts(regionId){
        return fetch(`http://localhost:5002/posts?regionId=${regionId}&_expand=categorie`).then(e => e.json())
    }
    ///////////////////////////////////////////////////////////////////          USERS POSTS                //////////////////////////////////////////////////
    getUserPosts(userId){
        return fetch(`http://localhost:5002/posts?userId=${userId}&_expand=categorie&_sort=id&_order=desc`).then(e => e.json())
    }

    deleteUserPost(postId){
        return fetch(`http://localhost:5002/posts/${postId}`,
            {
            method: "DELETE"
        })
    }

    editPost(postId, title, price, location, category, description) {
        return fetch(`http://localhost:5002/posts/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                price: price,
                location: location,
                categorieId: category,
                description: description,
                photo: ""
            })
        }).then(e => e.json());
    }
}

const ApiManager = new Api()
export default ApiManager
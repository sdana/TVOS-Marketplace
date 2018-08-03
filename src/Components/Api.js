class Api {
    getUsers() {
        return fetch("https://tvos-marketplace-db.herokuapp.com/users").then(e => e.json());
    }
    checkUserThing(thing, otherThing) {
        return fetch(`https://tvos-marketplace-db.herokuapp.com/users/?${thing}=${otherThing}`).then(e => e.json())
    }
    checkEmail(email) {
        return fetch(`https://tvos-marketplace-db.herokuapp.com/users/?email=${email}`).then(e => e.json())
    }

    registerUser (name, email, password, region) {
        return fetch("https://tvos-marketplace-db.herokuapp.com/users", {
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
    postItem(userId, title, price, location, category, description, region, photoURL, email, phone){
        return fetch("https://tvos-marketplace-db.herokuapp.com/posts", {
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
                photo: photoURL,
                email: email,
                phone: phone
            })
        }).then(e => e.json());
    }
    getAllPosts(order){
        return fetch(`https://tvos-marketplace-db.herokuapp.com/posts?_expand=categorie&_sort=id&_order=${order}`).then(e => e.json())
    }

    getPost(postId) {
        return fetch(`https://tvos-marketplace-db.herokuapp.com/posts/${postId}`).then(e => e.json())
    }

    getRegionalPosts(regionId, order){
        return fetch(`https://tvos-marketplace-db.herokuapp.com/posts?regionId=${regionId}&_expand=categorie&_sort=id&_order=${order}`).then(e => e.json())
    }
    ///////////////////////////////////////////////////////////////////          USERS POSTS                //////////////////////////////////////////////////
    getUserPosts(userId){
        return fetch(`https://tvos-marketplace-db.herokuapp.com/posts?userId=${userId}&_expand=categorie&_sort=id&_order=desc`).then(e => e.json())
    }

    deleteUserPost(postId){
        return fetch(`https://tvos-marketplace-db.herokuapp.com/posts/${postId}`,
            {
            method: "DELETE"
        })
    }

    editPost(postId, title, price, location, category, description) {
        return fetch(`https://tvos-marketplace-db.herokuapp.com/posts/${postId}`, {
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
            })
        }).then(e => e.json());
    }
}

const ApiManager = new Api()
export default ApiManager
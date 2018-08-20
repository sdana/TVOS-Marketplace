class Api {
    getUsers() {
        return fetch("https://tvosmarketplace.tk/users").then(e => e.json());
    }
    checkUserThing(thing, otherThing) {
        return fetch(`https://tvosmarketplace.tk/users/?${thing}=${otherThing}`).then(e => e.json())
    }
    checkEmail(email) {
        return fetch(`https://tvosmarketplace.tk/users/?email=${email}`).then(e => e.json())
    }

    registerUser (name, email, password, region, displayName) {
        return fetch("https://tvosmarketplace.tk/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: name,
                email: email,
                password: password,
                region: region,
                displayName: name
            })
        }).then(e => e.json());
    }

    editUserInfo (userId, thingToChange, changeValue) {
        return fetch(`https://tvosmarketplace.tk/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                [thingToChange]: changeValue
            })
        }).then(e => e.json());
    }
    //////////////////////////////////////////////////////////////////////          GENERAL POSTS              /////////////////////////////////////////////
    postItem(userId, title, price, location, category, description, region, photoURL, email, phone){
        return fetch("https://tvosmarketplace.tk/posts", {
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
        return fetch(`https://tvosmarketplace.tk/posts?_expand=categorie&_sort=id&_order=${order}`).then(e => e.json())
    }

    getPost(postId) {
        return fetch(`https://tvosmarketplace.tk/posts/${postId}`).then(e => e.json())
    }

    getRegionalPosts(regionId, order){
        return fetch(`https://tvosmarketplace.tk/posts?regionId=${regionId}&_expand=categorie&_sort=id&_order=${order}`).then(e => e.json())
    }
    ///////////////////////////////////////////////////////////////////          USERS POSTS                //////////////////////////////////////////////////
    getUserPosts(userId){
        return fetch(`https://tvosmarketplace.tk/posts?userId=${userId}&_expand=categorie&_sort=id&_order=desc`).then(e => e.json())
    }

    deleteUserPost(postId){
        return fetch(`https://tvosmarketplace.tk/posts/${postId}`,
            {
            method: "DELETE"
        })
    }
///////////////////////////DEPRECATED/////////////////////////////////////
    editPost(postId, title, price, location, category, description) {
        return fetch(`https://tvosmarketplace.tk/posts/${postId}`, {
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
/////////////////////////////////////////////////////////////////////////
    editItem(postId, editedObject) {
        return fetch(`https://tvosmarketplace.tk/posts/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedObject)
        }).then(e => e.json());
    }

}

const ApiManager = new Api()
export default ApiManager
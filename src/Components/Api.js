class Api {
    getUsers() {
        return fetch("http://ec2-18-213-253-178.compute-1.amazonaws.com/users").then(e => e.json());
    }
    checkUserThing(thing, otherThing) {
        return fetch(`http://ec2-18-213-253-178.compute-1.amazonaws.com/users/?${thing}=${otherThing}`).then(e => e.json())
    }
    checkEmail(email) {
        return fetch(`http://ec2-18-213-253-178.compute-1.amazonaws.com/users/?email=${email}`).then(e => e.json())
    }

    registerUser (name, email, password, region, displayName) {
        return fetch("http://ec2-18-213-253-178.compute-1.amazonaws.com/users", {
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
        console.log(userId, thingToChange, changeValue)
        return fetch(`http://ec2-18-213-253-178.compute-1.amazonaws.com/users/${userId}`, {
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
        return fetch("http://ec2-18-213-253-178.compute-1.amazonaws.com/posts", {
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
        return fetch(`http://ec2-18-213-253-178.compute-1.amazonaws.com/posts?_expand=categorie&_sort=id&_order=${order}`).then(e => e.json())
    }

    getPost(postId) {
        return fetch(`http://ec2-18-213-253-178.compute-1.amazonaws.com/posts/${postId}`).then(e => e.json())
    }

    getRegionalPosts(regionId, order){
        return fetch(`http://ec2-18-213-253-178.compute-1.amazonaws.com/posts?regionId=${regionId}&_expand=categorie&_sort=id&_order=${order}`).then(e => e.json())
    }
    ///////////////////////////////////////////////////////////////////          USERS POSTS                //////////////////////////////////////////////////
    getUserPosts(userId){
        return fetch(`http://ec2-18-213-253-178.compute-1.amazonaws.com/posts?userId=${userId}&_expand=categorie&_sort=id&_order=desc`).then(e => e.json())
    }

    deleteUserPost(postId){
        return fetch(`http://ec2-18-213-253-178.compute-1.amazonaws.com/posts/${postId}`,
            {
            method: "DELETE"
        })
    }
///////////////////////////DEPRECATED/////////////////////////////////////
    editPost(postId, title, price, location, category, description) {
        return fetch(`http://ec2-18-213-253-178.compute-1.amazonaws.com/posts/${postId}`, {
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
        return fetch(`http://ec2-18-213-253-178.compute-1.amazonaws.com/posts/${postId}`, {
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

import React from 'react'
function MakePostCard (post) {
    console.log("Im working")
    console.log("post", post)
    return (
            <li className="post-post">
                <h3>{post.post.title}</h3>
                <h4>{post.post.price}</h4>
                <h4>{post.post.location}</h4>
                <h5>{post.post.categorie.cat}</h5>
                <h5>{post.post.description}</h5>
            </li>
    )
}

export default MakePostCard

// "userId": 1,
//       "title": "thing",
//       "price": "ten",
//       "location": "nash",
//       "categorieId": "1",
//       "description": "get this ten thing",
//       "regionId": "middle",
//       "photo": "",
//       "id": 1
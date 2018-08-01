import React from 'react'

const PhotoPreview = (props) => {
    return (
        <img src={props.url} alt="post photos" style={{ height: 300, width: "auto" }}/>
    )
}

export default PhotoPreview
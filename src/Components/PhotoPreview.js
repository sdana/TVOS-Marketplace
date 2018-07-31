import React from 'react'

const PhotoPreview = (props) => {
    return (
        <img src={props.url} style={{ height: 300, width: "auto" }}/>
    )
}

export default PhotoPreview
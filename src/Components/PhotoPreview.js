import React from 'react'

const PhotoPreview = (props) => {
    return (
        <img id={props.id} onClick={e =>{
            e.target.remove()
            }}
            src={props.url} alt="post photos" style={{ maxHeight: 300, width: "auto" }}/>
    )
}

export default PhotoPreview
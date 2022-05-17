import { deleteTag, getAllTags } from "./TagManager"
import React, { useEffect, useState } from "react";
import { NewTagForm } from "./CreateTagForm";
import { useHistory } from "react-router-dom";

export const AllTags = () => {
    const [tags, setTags] = useState([])

    const getTags = () => {
        getAllTags()
                .then((tags => {
                    setTags(tags)
                }))
    }

    useEffect(() => {
        getTags()
    },
        [])

    const history = useHistory()

    const DeleteTag = (id) => {
        deleteTag(id).then(getTags)
    }

return (
    <>
        <div className="CreateNewTagFormContainer">
            <NewTagForm getTags={getTags} />
        </div>
        {tags.map((tag) => { 
            return <div key={`tag--${tag.id}`}>{tag.label} 
            {localStorage.getItem("staff") === "true" ? <>
            <button onClick={() => history.push(`./tags/${tag.id}`)}>edit</button> 
            <button onClick={() => {DeleteTag(tag.id)}}>delete</button>
            </> : null }
            </div>
        })}
</>
)}
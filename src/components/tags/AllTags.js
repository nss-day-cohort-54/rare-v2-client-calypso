import { getAllTags } from "./TagManager"
import React, { useEffect, useState } from "react";
import { NewTagForm } from "./CreateTagForm";
export const AllTags = () => {

    const [tags, setTags] = useState([])

    const getTags = () => {
        return getAllTags()
                .then((tags => {
                    setTags(tags)
                }))
    }

    useEffect(() => {
        getTags()
    },
        [])
    return <>
        <div>AllTags Page</div>
        <div className="CreateNewTagFormContainer">
            <NewTagForm getTags={getTags} />
        </div>
        {tags.map((tag) => {
            return <div key={`tag--${tag.id}`}>{tag.label} 
            <button>edit</button> <button>delete</button>
            </div>
        })}


    </>
}
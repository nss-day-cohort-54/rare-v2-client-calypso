import { deleteTag, getAllTags } from "./TagManager"
import React, { useEffect, useState } from "react";
import { NewTagForm } from "./CreateTagForm";
import { useHistory } from "react-router-dom";

export const AllTags = () => {
    const [tags, setTags] = useState([])
    const [showAlert, setShowAlert] = useState(0)

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

    const notifyOnClickDelete = () => {
        return(
            <>
                <div className="modal">
                    <div className="modal-content">
                        <div className="alert-text">
                            {
                                showAlert != -1 ? <p>Are you sure you wish to delete this post?</p>
                                :
                                <p>Post Successfully Deleted.</p>
                            }
                        </div>
                        <div className="alert-buttons">
                            {
                                showAlert != -1 ? <><button onClick={()=>{
                                    deleteTag(showAlert).then(()=>{setShowAlert(-1)
                                    getTags()})}}>Yes</button>
                                <button onClick={()=>setShowAlert(0)}>No</button></>
                                :
                                <button onClick={()=>setShowAlert(0)}>Close</button>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }

return (
    <>
    {
        showAlert != 0 ? notifyOnClickDelete() : ""
    }
        <div className="CreateNewTagFormContainer">
            <NewTagForm getTags={getTags} />
        </div>
        {tags.map((tag) => { 
            return <div key={`tag--${tag.id}`}>{tag.label} 
            {localStorage.getItem("staff") === "true" ? <>
            <button onClick={() => history.push(`./tags/${tag.id}`)}>edit</button> 
            <button onClick={() => {setShowAlert(tag.id)}}>delete</button>
            </> : null }
            </div>
        })}
</>
)}
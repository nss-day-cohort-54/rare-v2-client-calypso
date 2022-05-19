import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Post } from "./Post"
import { getLoggedInUserPosts, deletePost } from "./PostManager"

export const MyPosts = () => {
    const history = useHistory()
    const currentUser = localStorage.getItem("token")
    const [posts, setPosts] = useState([])
    const [showAlert, setShowAlert] = useState(0)

    const getMyPosts = () => {
        getLoggedInUserPosts(currentUser).then(setPosts)
    }
    useEffect(
        () => {
            getMyPosts()
        },
        []
    )

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
                                    deletePost(showAlert).then(()=>{
                                        setShowAlert(-1)
                                        getMyPosts()
                                        })
                                    }}>Yes</button>
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

    return <>
        {
            showAlert != 0 ? notifyOnClickDelete() : ""
        }
        {
            posts.map(post => {
                return <div key={`post-${post.id}`}>
                    <Post listView={true} cardView={true} post={post} />
                    <button className="post-delete-button" onClick={()=>{
                            setShowAlert(post.id)
                            }}>Delete</button>
                    <button onClick={()=>history.push(`/editPost/${post.id}`)}>Edit Post</button>
                </div> 
            })
        }
    </>
}
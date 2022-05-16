import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Post } from "./Post"
import { getSinglePost } from "./PostManager"


export const SinglePost = () => {
    const [post, setPost] = useState({})
    const { postId } = useParams()

    useEffect(
        () => {
            if(postId) {
                getSinglePost(postId)
                    .then(setPost)
            }
        },
        [postId]
    )

    return <>
    {
        post.title
        ? <Post listView={false} cardView={false} post={post} />
        : "loading"
    }
    </>
}
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Post } from "./Post"
import { getSinglePost } from "./PostManager"


export const SinglePost = () => {
    const [post, setPost] = useState({})
    const { postId } = useParams()

    useEffect(
        () => {
            postId ?
        getSinglePost(postId)
        .then(
            (response) => { 
                response.tagIds = response.tags.map((tag) =>
                tag.id)
                setPost(response)
            }
        )
        :""
        },[postId]
    )

    return <>
    {
        post.title
        ? <Post listView={false} cardView={false} post={post} setPost={setPost} />
        : "loading"
    }
    </>
}
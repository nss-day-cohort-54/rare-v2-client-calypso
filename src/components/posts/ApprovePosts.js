import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Post } from "./Post";
import { getAllUsers } from "../users/UserManager"
import { getAllTags } from "../tags/TagManager";
import { getAllCategories } from "../categories/CategoryManager";
import { editPost, getAllPosts, getSinglePost } from "./PostManager";


export const ApprovePosts = () => {

    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [tags, setTags] = useState([])
    const [categories, setCategories] = useState([])
    const [selectPost, setSelectPost] = useState({})
    const {postId} = useParams()

    useEffect(
        () => {
            getAllUsers()
                .then(setUsers)
        },
        []
    )

    useEffect(
        () => {
            getAllPosts()
                .then(setPosts)
        },
        []
    )

    useEffect(
        () => {
            getAllTags()
                .then(setTags)
        },
        []
    )

    useEffect(
        () => {
            getAllCategories()
                .then(setCategories)
        },
        []
    )

    useEffect(
        () => {
            getSinglePost(postId)
            .then(
                (data) => {
                    setSelectPost(data)
                }
            )
        },[postId]
    )

    //function to approve post is essentially an edit post 
    //get the post by id
    //change approved from false to true
    //editPost
    const ApprovePostClick = (evt) => {
        evt.preventDefault()

        const editingPostForApproval = {
            id: selectPost.id,
            category: selectPost.category,
            title: selectPost.title,
            image_url: selectPost.image_url,
            content: selectPost.content,
            approved: 1
        }
        editPost(editingPostForApproval).then(()=>history.push(`/posts/approve`))
    }

    return(
        <>
        <div className="singlePost">
            <div>Title</div>
            <div>Author</div>
            <div>Publication Date</div>
            <div>Category</div>
            <div>Tags</div>
        </div>
        {
            posts.length > 0
                ? posts.map((post) => {
                    {if(post.approved === false){
                        
                    return <div key={post.id} className="posts">
                        <Post listView={true} cardView={false} post={post} />
                        <button className="post-approve-button" onClick={ApprovePostClick}>Approve</button>
                    </div>
                    }}
                    // needs author name and category, publication date, content 
                })
                : "No posts"
        }
        </>

    )
}
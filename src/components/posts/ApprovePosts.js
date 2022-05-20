import React, { useEffect, useState } from "react";
import { Post } from "./Post";
import { getAllUsers } from "../users/UserManager"
import { getAllTags } from "../tags/TagManager";
import { getAllCategories } from "../categories/CategoryManager";
import { getAllPosts, getSinglePost } from "./PostManager";


export const ApprovePosts = () => {

    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [tags, setTags] = useState([])
    const [categories, setCategories] = useState([])
    const [selectPost, setSelectPost] = useState({})

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
            getSinglePost(id)
            .then(
                (response) => {
                    setSelectPost(response)
                }
            )
        },[]
    )

    //function to approve post
    //get the post by id
    //change approved from false to true
    const ApprovePostClick = (postId) => {

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
                        <button className="post-approve-button" >Approve</button>
                    </div>
                    }}
                    // needs author name and category, publication date, content 
                })
                : "No posts"
        }
        </>

    )
}
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Post } from "./Post";
import { getAllUsers } from "../users/UserManager"
import { getAllTags } from "../tags/TagManager";
import { getAllCategories } from "../categories/CategoryManager";
import { editPost, getAllPosts, getSinglePost } from "./PostManager";


export const ApprovePostsList = () => {

    const [posts, setPosts] = useState([])

    useEffect(
        () => {
            getAllPosts()
                .then(setPosts)
        },
        []
    )


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
                        
                    </div>
                    }}
                    // needs author name and category, publication date, content 
                })
                : "No posts"
        }
        </>

    )
}
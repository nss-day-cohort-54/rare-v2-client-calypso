// imports React, useEffect, useSate, useHistory, sendPost, fetchTags
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllTags } from "../tags/TagManager";
import { createPost, editPost, getSinglePost } from "./PostManager";
import { getAllCategories } from "../categories/CategoryManager";
import { useParams } from "react-router-dom";



export const CreatePosts = ({ getPosts, editing }) => {
    const [form, updateForm] = useState({ label: "" })
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const { postId } = useParams()
    const history = useHistory()

    const getResources = () => {
        getAllCategories().then((categories)=>{setCategories(categories)})
        getAllTags().then((tags) =>{setTags(tags)})
    }
    
    useEffect(() => {
        getResources()
    },[]
    )

    useEffect(
        () => {
            if (editing) {
                getSinglePost(postId)
                    .then((data)=>{
                        data.category = data.category.id
                        updateForm(data)
                    })
            }
        }, []
    )

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            // Update a component state variable to the value of base64ImageString
            let copy = {...form}
            copy.image = base64ImageString
            updateForm(copy)
        });
    }

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newPost = Object.assign({}, form)
        if (event.target.name === "tags") {
            if (!(event.target.name in newPost)) {
                newPost[event.target.name] = []
            }
            let val = parseInt(event.target.id)
            if (event.target.checked) {
                newPost[event.target.name].push(tags.find(tag => tag.id === val))
            } else {
                newPost[event.target.name] = newPost[event.target.name].filter(tag => tag.id !== val)
            }
        } else {
            newPost[event.target.name] = event.target.value
        }
        updateForm(newPost)
    }

    //To determine if post is approved upon submission...
    //check if person logged in is staff
        //yes? approved = true 
        //no? approved = false
        const approvedOrNo = () => {
            if(localStorage.getItem('staff') === "true"){
                return true}
            else {return false}
        }

        const submitPost = (e) => {
        e.preventDefault()
        
        let approvedYN = approvedOrNo()
        const newPost = {
            category: form.category,
            title: form.title,
            image: form.image,
            content: form.content,
            approved: approvedYN,
        }
        
        if(newPost.title && newPost.image && newPost.category) {
            if (editing) {
                newPost.id = parseInt(postId)
                editPost(newPost)
                    .then(() => history.push(`/posts/single/${postId}`))
            } else {
                createPost(newPost)
                    .then((sentPost) => history.push(`/posts/single/${sentPost.id}`))
            }
        } else {
            window.alert("Please finish filling out post form.")
        }
    }
    
    return (
        <>
            <fieldset>
                <div className="form-group">

                    <input
                        required
                        type="text" id="post"
                        className="form-control"
                        placeholder="Title"
                        value={form.title}
                        onChange={
                            (e) => {
                                const copy = { ...form }
                                copy.title = e.target.value
                                updateForm(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input type="file" id="game_image" onChange={createGameImageString} />
                    <input type="hidden" name="game_id" value={postId} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">

                    <input
                        required
                        type="text" id="post"
                        className="form-control"
                        placeholder="Article Content"
                        value={form.content}
                        onChange={
                            (e) => {
                                const copy = { ...form }
                                copy.content = e.target.value
                                updateForm(copy)
                            }
                        }
                    />
                </div>
            </fieldset>



            <fieldset>
                <div className="form-group">

                    <select name="category"
                        onChange={(e) => {
                            const copy = { ...form }
                            copy.category = parseInt(e.target.value)
                            updateForm(copy)
                        }}
                        defaultValue="0" value={form.categoryId}>
                        <option value="0" hidden>Category Select</option>
                        {
                            categories.map(
                                (c) => {
                                    return (
                                        <option key={`categoryId--${c.id}`} value={`${c.id}`}>
                                            {`${c.label}`}
                                        </option>
                                    )
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <div className="submitButtonCreateNewPostForm">
                <button onClick={(e) => {

                    submitPost(e)
                    updateForm({ title: "", imageUrl: "", content: "", categoryId: "0"})
                }} className="submit-button">
                    Submit
                </button>
            </div>
        </>
    )
}

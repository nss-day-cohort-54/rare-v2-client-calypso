import React, { useState, useEffect } from "react"
import {useHistory, useParams} from "react-router-dom"
import { getSinglePost, editPost } from "./PostManager"
import { getSingleUser } from "../users/UserManager"

export const UpdatePost = () => {
  const history = useHistory()
  const {postId} = useParams()
  const [post, updatePost] = useState({})
  const [user, updateUser] = useState({})
  
  useEffect(()=>{
    getSinglePost(postId).then(data =>updatePost(data))
  },[postId])

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

              <input
                  required
                  type="text" id="post"
                  className="form-control"
                  placeholder="Image URL"
                  value={form.imageUrl}
                  onChange={
                      (e) => {
                          const copy = { ...form }
                          copy.imageUrl = e.target.value
                          updateForm(copy)
                      }
                  }
              />
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
                      copy.categoryId = parseInt(e.target.value)
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
      {tags.map(tag => {
          // logic to determine whether box should be pre-checked
          let checked_status = false
          if ("tags" in form) {
              if (form.tags.length > 0) {
                  let found_tag = form.tags.find(t => t.id === tag.id)
                  if (found_tag) {
                      checked_status = true
                  } else {
                      checked_status = false
                  }
              } else {
                  checked_status = false
              }
          }
          return <div key={`formTags-${tag.id}`} className="checkbox">
              <input name="tags"
                  type="checkbox"
                  htmlFor="tag"
                  id={tag.id}
                  onChange={handleControlledInputChange}
                  checked={checked_status}
              />
              <label htmlFor={tag.id}>{tag.label}</label>
          </div>
      })
      }
      <div className="submitButtonCreateNewPostForm">
          <button onClick={(e) => {
              submitPost(e)
              updateForm({ title: "", imageUrl: "", content: "", categoryId: "0" })
          }} className="submit-button">
              Submit
          </button>
      </div>
    </>
  )
}


  // function to edit item
    // prevent default on event

    // newPost var = {keys with "post." and "parseInt"}

    // invoke sendPost and pass it the newPost
      // .then history.push("/<appropriate name>")


  // return

  // EXAMPLE RETURN FORM:

// };
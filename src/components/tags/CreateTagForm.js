import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"
import { getAllTags } from "./TagManager";
// define a function that returns the create new tag form
export const NewTagForm = ({ getTags }) => {

    const [form, updateForm] = useState({label: ""})
    const history = useHistory()

    // define a new function, submitNewTag its purpose will be submitting the new tag to the server 
    // accepts one parameter, "e"
    // e.preventDefault()
    // defines a new  variable which will be an object for the new tag, "newTag"
    // the object will have one key value pair:
    // label: form.tag 
    // define a new variable, fetchOption, method will be POST, headers will be "Content-Type": "application/json"
    // convert what we're sending to the server into json body: JSON.stringify(newTag)
    // invoke addtags from tagManager

    // post the newTag to the tags tablbe in db
    // return fetch("http://localhost:8088/tags", fetchOption) 

    // example:

    const submitTag = (e) => {
        e.preventDefault()
        const newTag = {
            label: form.label,
        }
        return fetchIt(`${Settings.API}/tags`, "POST", JSON.stringify(newTag))
                .then(getTags)
                
                // .then(getAllTags())
                // .then(tagsData => setTags(tagsData))
        // const fetchOption = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(newTag)
        // }

        // return fetch("http://localhost:8088/tags", fetchOption)
        // // .then(window.location.reload())
    }




    // wrap in div className "form-group"
    // <label htmlFor="tag" "create a new tag" as text for label
    // input tag
    // required autoFocus
    // type="text" id="tag"
    // className="form-control"
    // placeholder="add text"
    // add an onChange function to update what we will send to the server as the user types
    // accepts a parameter "e" 
    //  => function body:
    // defines a new variable, copy, which is equal to { ...form}
    // set copy.label equal to e.target.value
    // change the value of form by using updateForm and passing in copy as an argument

    // example:
    return (
        <>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tag">Create a new tag</label>
                    <input
                        required autoFocus
                        type="text" id="tag"
                        className="form-control"
                        placeholder="add text"
                        value={form.label}
                        onChange={
                            (e) => {
                                const copy = { ...form }
                                copy.label = e.target.value
                                updateForm(copy)
                            }
                        }
                    />
                    <div className="submitButtonCreateNewTagForm">

                        <button onClick={(e) => {
                            submitTag(e)
                            updateForm({label: ""})
                        }} className="submit-button">
                            Submit
                        </button>
                    </div>
                </div>
            </fieldset>
        </>
    )

    // add a button, which when clicked will will invoke the submit new tag function from the top of this module
}
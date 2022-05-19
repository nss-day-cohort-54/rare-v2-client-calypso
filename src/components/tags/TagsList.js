{/* Create a TagList component and pass post as props. 
                                IN the TagList, Check to see if the current user is the author, if not null, 
                                if so return a list of checkboxes for each tag in the db and a save button that 
                                creates the new rows in the post-tags table and refreshes the DOM */}

import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getAllTags, updatePostTags } from "./TagManager"


// export a function that accept post as props and returns a list of list of checkboxes with check values set to the post's tags
export const TagsList = ({ post }) => {
    const [tags, setTags] = useState()
    const history = useHistory()
    const [tagChecks, setTagChecks] = useState({})

    useEffect(() => {
        getAllTags()
            .then((tags => {
                setTags(tags)
            }))
    },
        [])// Fetch the tags from teh db


    useEffect(() => {
        const copy = { ...tagChecks }
        tags?.map((tag) => {
            if (post.tagIds.includes(tag.id)) {
                copy[`${tag.id}`] = true
            }
            else {
                copy[`${tag.id}`] = false
            }
        })
        console.log(copy)
        setTagChecks(copy)
    }, [tags])

    // post.tags.forEach((t) => {
    //     if (tag.id === t.id) {
    //         copy[`${tag.id}`] = true
    //     }
    //     else {
    //         copy[`${tag.id}`] = false
    //     }
    // })

    // When the submit button is clicked, create a new array of tag id numbers by comparing TagChecks to post.tagIds
    // Make a new check state
    // Iterate over old check state
    // When the value of the current check is true, add it to the new array

    // Construct a new post object
    // Save the new check state as the new tag property

    // Send the new object to db with a custom put action

    const handleChange = (domEvent) => {
        const copy = { ...tagChecks }

        copy[domEvent.target.value] = !copy[domEvent.target.value]
        setTagChecks(copy)
    }

    const handleSubmit = (event) => {

        event.preventDefault()

        const newTags = []
        for (const tc in tagChecks)
            if (tagChecks[tc] === true) {
                newTags.push(tc)
            }

        const updatedPost = {
            category: post.category,
            title: post.title,
            publication_date: post.publication_date,
            image_url: post.image_url,
            content: post.content,
            approved: post.approved,
            tags: newTags,
            id: post.id
        }

        return (updatePostTags(updatedPost)
        )
    }

    // copy post.tagIds to state, update state with handleChange, send 


    const tagBoxes = () => {
        return (
            <>
                <form>
                    <fieldset className="form-group">
                        {tags?.map((t) => {
                            return (
                                <div className="tagCheckBox" key={`tagCheckBox--${t.id}`}>
                                    <div autoComplete="off" noValidate className="div">
                                        <label>{t.label}</label>
                                        <input
                                            type="checkbox"
                                            checked={tagChecks[`${t.id}`]}
                                            onChange={handleChange}
                                            name="tag"
                                            value={t.id}
                                        />
                                    </div>
                                </div>
                            )
                        })}</fieldset><button onClick={evt => {
                            evt.preventDefault()

                            const newTags = []
                            for (const tc in tagChecks)
                                if (tagChecks[tc] === true) {
                                    newTags.push(tc)
                                }

                            const updatedPost = {
                                category: post.category.id,
                                title: post.title,
                                publication_date: post.publication_date,
                                image_url: post.image_url,
                                content: post.content,
                                approved: post.approved,
                                tags: newTags,
                                id: post.id
                            }

                            updatePostTags(updatedPost)
                            .then()

                        }} className="submit-button">
                        Save
                    </button>
                </form>
            </>)
    }


    return (
        // Return a checkbox for each tag in the db
        <article className="tags">
            {tagBoxes()}


        </article>


    )



}


// set the default value of the checkboxes according to the incoming tags on the post
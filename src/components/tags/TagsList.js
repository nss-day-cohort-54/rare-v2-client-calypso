import { useState, useEffect } from "react"
import { updatePostTags } from "../posts/PostManager"
import { getAllTags } from "./TagManager"


// export a function that accept post as props and returns a list of list of checkboxes with check values set to the post's tags
export const TagsList = ({ post, postRefresh, setPostRefresh }) => {
    const [tags, setTags] = useState()
    const [tagChecks, setTagChecks] = useState({})


    useEffect(() => {
        getAllTags()
            .then((tags => {
                setTags(tags)
            }))
    },
        [])// Fetch the tags from the db


    useEffect(() => {
        const copy = { ...tagChecks }
        tags?.map((tag) => {
            if (post?.tagIds?.includes(tag.id)) {
                copy[`${tag.id}`] = true
            }
            else {
                copy[`${tag.id}`] = false
            }
        })
        console.log(copy)
        setTagChecks(copy)
    }, [tags])

    const handleChange = (domEvent) => {
        const copy = { ...tagChecks }

        copy[domEvent.target.value] = !copy[domEvent.target.value]
        setTagChecks(copy)
    }

    const handleSubmit = () => {

        const newTags = []
        for (const tc in tagChecks)
            if (tagChecks[tc] === true) {
                newTags.push(tc)
            }

        const updatedPost = {
            category: post.category.id,
            title: post.title,
            publication_date: post.publication_date,
            image: post.image,
            content: post.content,
            approved: post.approved,
            tags: newTags,
            id: post.id
        }

        updatePostTags(updatedPost)
            .then(() =>
                setPostRefresh(!postRefresh)
            )
    }

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

                            handleSubmit()

                        }} className="submit-button">
                        Save
                    </button>
                </form>
            </>)
    }


    return (
        // Returns the results of the tagBoxes function
        <article className="tags">
            {tagBoxes()}
        </article>
    )
}
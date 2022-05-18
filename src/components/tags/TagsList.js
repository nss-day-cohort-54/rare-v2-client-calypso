{/* Create a TagList component and pass post as props. 
                                IN the TagList, Check to see if the current user is the author, if not null, 
                                if so return a list of checkboxes for each tag in the db and a save button that 
                                creates the new rows in the post-tags table and refreshes the DOM */}

import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getAllTags } from "./TagManager"

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
        copy = {...tagChecks}
        tags.map((tag) => {
            if(tag.id in post.tags) {
                copy.tagId = true
            }
            else{
                copy.tagId = false
            }
        })
        copy.id = false
        setTagChecks(copy)
    },[tags])
        


        // Create an empty object
            // Save the id of the checkbox and the value of the checkbox

        // create an array in state of booleans set to true or false
            // Iterate over the tags
                // Iterate over the post.tags and compare to the current tag in the tags array
                    // If they match, flip the corresponding boolean in state refrencing the index position that matches their id number(?)

        // Create a function that handles the change of a checkbox
            // When there is a change, flip the corresponding boolean in state

        const handleChange = (domEvent) => {
            const copy = { ...tagChecks }

            copy[domEvent.target.value] = !copy[domEvent.target.value]
            setTagChecks(copy)
        }

       
        const tagBoxes = () => {

                {for(const tag in tagChecks) {
                    return (
                        <div className="tagCheckBox" key={`tagCheckBox--${tag}`}>
                            <form autoComplete="off" noValidate className="form" onSubmit={handSubmit}>

                                <input
                                type="checkbox"
                                checked={tagChecks[tag]}
                                onChange={handleChange}
                                name="tag"
                                value={tag}
                                />
                                <button type="submit">Save</button>
                            </form>
                        </div>
                    )
                        
                

        }}

    return (
            // Return a checkbox for each tag in the db
            <article className="tags">
                {tagBoxes()}
                

            </article>

        
    )


}
}


// set the default value of the checkboxes according to the incoming tags on the post
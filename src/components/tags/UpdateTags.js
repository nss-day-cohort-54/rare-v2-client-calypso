import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getTag, updateTags } from "./TagManager";

export const UpdateTagForm = () => {

    const [tag, setTag] = useState()
    const { tagId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getTag(tagId).then((d) => setTag(d))
    }, [tagId])

    const ChangeTagState = (domEvent) => {
        const copy = {...tag }
        copy[domEvent.target.name] = parseInt(domEvent.target.value)
        setTag(copy)
    }
    
    const updateTag = (e) => {
        e.preventDefault()
        const newTag = {
            label: tag.label,
            id: parseInt(tag.id)
        }
        return updateTags(newTag)
                .then(history.push("/tags"))
    }

    return (
        <>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tag">Update this tag</label>
                    <input
                        required autoFocus
                        type="text" id="tag"
                        className="form-control"
                        name="label"
                        value={tag?.label}
                        onChange={ChangeTagState}
                        />
                    <div className="submitButtonCreateNewTagForm">
                        <button onClick={(e) => {
                            updateTag(e)
                        }} className="submit-button">
                            Submit
                        </button>
                    </div>
                </div>
            </fieldset>
        </>
    )
}
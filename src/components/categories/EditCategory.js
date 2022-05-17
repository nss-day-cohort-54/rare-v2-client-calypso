import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editCategory, getCategoryById } from "./CategoryManager";

export const EditCategoryForm = () => {
    const [cat, setCat] = useState({})
    const { catId } = useParams()
    const history = useHistory()

    useEffect(()=>{
        getCategoryById(catId)
        .then(data=>setCat(data))
    }, [catId])

    const editCurrentCategory = (evt) => {
        evt.preventDefault()

        const editCatObj = {
            id: cat.id,
            label: cat.label
        }
        editCategory(editCatObj).then(()=> history.push('/categories'))
    }

    const updateCategoryState = (evt) => {
        const catCopy = {...cat}
        catCopy[evt.target.name] = evt.target.value
        setCat(catCopy)
    }

    return (
        <>
        <fieldset>
            <div className="form-group">
                <label htmlFor="category">Edit Category</label>
                <input
                    required autoFocus
                    type="text" id="category"
                    className="form-control"
                    placeholder="add text"
                    name="label"
                    value={cat.label}
                    onChange={updateCategoryState}
                    
                />
                <div className="submitButtonCreateNewCategoryForm">

                    <button onClick={editCurrentCategory} className="submit-button">
                        Submit
                    </button>
                </div>
            </div>
        </fieldset>
    </>
    )
}
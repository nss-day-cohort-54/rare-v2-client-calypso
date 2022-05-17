// imports
// import getAllCategories from /.CategoryManager 
import { deleteCategory, getAllCategories } from "./CategoryManager";
import React, { useEffect, useState } from "react";
import { NewCategoryForm } from "./CreateCategoryForm";
import { useHistory } from "react-router";
// import React, useEffect, useState 

// declare and export function AllCategories which get all category objects

export const AllCategories = () => {
// use UseState to set the state for the categories array for
// when the state changes.
    const [categories, setCategories] = useState([])
    const history = useHistory()
    // use UseEffect to getAllCategories and set the state of the category array.
    useEffect(() => {
        getCategories()
    },
    [])
    
    const getCategories = () => {
        getAllCategories()
            .then((categories) => {
                setCategories(categories)
            })
        

    }

    const onDeleteCatClick = (catId) => {
        return deleteCategory(catId)
        .then((data)=>{
            getCategories(data)
        })
    }

// return a map through the categories array that will have 
// edit and delete buttons 
//for delete- map through users, if staff is true, they will see delete button 
    return <>
        <div>AllCategories Page</div>
        <div className="CreateNewCategoryFormContainer">
            <NewCategoryForm getCategories={getCategories} />
        </div>
            {categories.map((category) => {
                return <div key={`category--${category.id}`}>{category.label}
                    <button onClick={()=>{
                        history.push(`categories/edit/${category.id}`)
                    }}>edit</button> <button onClick={()=>{onDeleteCatClick(category.id)}}>delete</button>
                    
                </div>
            
        })}


    </>
}

// {
//     if (localStorage.getItem('staff') === true) 
//     return 
   
//  }
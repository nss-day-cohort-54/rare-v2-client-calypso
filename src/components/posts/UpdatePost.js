// import React useEffect and use State
// import useHistory and useParams from "react-router-dom"
// import fetch for getPostById and fetch for users, import PUT from manager

// export function
  // store userHistory() in var
  // [post, updatePost] useState({})
  // [user, updateUser]?
  // const {postId} = useParams()

  //useEffect
    // getPostById()
      // .then(r=>r.json())
        // .then(post => updatePost)

  // function to edit item
    // prevent default on event

    // newPost var = {keys with "post." and "parseInt"}

    // invoke sendPost and pass it the newPost
      // .then history.push("/<appropriate name>")


  // return

  // EXAMPLE RETURN FORM:

    // <form className="inventoryForm">
//       <h2 className="inventoryForm__title">Edit Inventory Item</h2>
//       <fieldset>
//         <div className="form-group">
//           <label htmlFor="name">Type</label>
//           <select
//             value={item.typeId}
//             name="location"
//             type="select"
//             required
//             autoFocus
//             onChange={(e) => {
//               const copy = { ...item };
//               copy.typeId = e.target.value;
//               update(copy);
//             }}
//           >
//             <option value="0">Item type...</option>
//             {itemType.map((itemType) => (
//               <option required key={`type--${itemType.id}`} value={itemType.id}>
//                 {itemType.nameOfType}
//               </option>
//             ))}
//           </select>
//         </div>
//       </fieldset>

//       <fieldset>
//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <input
//             onChange={(e) => {
//               const copy = { ...item };
//               copy.name = e.target.value;
//               update(copy);
//             }}
//             required
//             autoFocus
//             type="text"
//             className="form-control"
//             defaultValue={item.name}
//           />
//         </div>
//       </fieldset>

//       <fieldset>
//         <div className="form-group">
//           <label htmlFor="quantity">quantity:</label>
//           <input
//             onChange={(e) => {
//               const copy = { ...item };
//               copy.quantity = e.target.value;
//               update(copy);
//             }}
//             required
//             autoFocus
//             type="number"
//             min="1"
//             className="form-control"
//             defaultValue={item.quantity}
//           />
//         </div>
//       </fieldset>

//       <fieldset>
//         <div className="form-group">
//           <label htmlFor="picture">Picture Url:</label>
//           <input
//             onChange={(e) => {
//               const copy = { ...item };
//               copy.picture = e.target.value;
//               update(copy);
//             }}
//             required
//             autoFocus
//             type="url"
//             className="form-control"
//             defaultValue={item.picture}
//           />
//         </div>
//       </fieldset>

//       <button className="btn btn-primary" onClick={editItem}>
//         Submit Item
//       </button>
//     </form>
//   );
// };
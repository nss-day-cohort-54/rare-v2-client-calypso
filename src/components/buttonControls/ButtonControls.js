import { Settings } from "../utils/Settings"
import { deleteComment } from "../comments/CommentManager"
import { deletePost } from "../posts/PostManager"
import { useHistory } from "react-router-dom"

export const ButtonControls = ({ isPost, postId, commentId, getComments }) => {
  const history = useHistory()

  return <div>
    <dialog id={`anything-${isPost}`}>
      {
        isPost
        ? <div>Are you sure you want to delete this post?</div>
        : <div>Are you sure you want to delete this comment?</div>
      }
      
      <div>
        <button
          onClick={
            (e) => {
              e.preventDefault()
              if (isPost) {
                deletePost(postId)
                  .then(
                    () => {
                      history.push("/")
                    })
              } else {
                deleteComment(commentId)
                  .then(
                    () => {
                      getComments(postId)
                    }
                  )
                  .then(
                    () => {
                      const buttonTarget = document.querySelector(`#anything-${isPost}`)
                      buttonTarget.close()
                    }
                  )
              }
            }
          }
        >Okay</button>
        <button
          onClick={
            (e) => {
              e.preventDefault()
              const buttonTarget = document.querySelector(`#anything-${isPost}`)
              buttonTarget.close()
            }
          }
        >Cancel
        </button>
      </div>

    </dialog>
    <button onClick={() => {
      if(isPost) {
        history.push(`/editPost/${postId}`)
      } else {
        window.alert("Cannot edit comments")
      }
    }}>
      <img className="editIcon" src={`${Settings.EditIcon}`} width="25px" height="25px" />
    </button>
    <button onClick={() => {
      const buttonTarget = document.querySelector(`#anything-${isPost}`)
      buttonTarget.showModal()
    }}>
      <img className="deleteIcon" src={`${Settings.DeleteIcon}`} width="25px" height="25px" />
    </button>
  </div >
}


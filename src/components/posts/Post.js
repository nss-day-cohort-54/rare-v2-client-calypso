import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { ButtonControls } from "../buttonControls/ButtonControls"
import { CommentList } from "../comments/CommentsList"
import { TagsList } from "../tags/TagsList"
import "./Post.css"
import { getSinglePost } from "./PostManager"
// function that renders a single post
export const Post = ({ listView, cardView, post }) => {

    const [showComments, setShowComments] = useState(false)
    const [showTagBoxes, setShowTagBoxes] = useState(false)
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("token"))
    const [selectPost, setSelectPost] = useState({})
    const [refresh, setRefresh] = useState(false)
    const {userId} = useParams()


    useEffect(
        () => {
            getSinglePost(post?.id)
            .then(
                (response) => {
                    setSelectPost(response)
                }
            )
        },[refresh]
    )

    return <>
        {/* Content needed in all posts list */}
        {/* Title, Author, Date, Category, Tags */}
        {
            listView && cardView
                ? <div key={`post--${post.id}`} className="postCard">
                    <div className="cardTitle">
                        <div>
                            <Link to={`/posts/single/${post.id}`}>
                                {post.title}
                            </Link>
                        </div>
                        <div>{post.publicationDate}</div>
                    </div>
                    <div className="cardImage">
                        <img src={`${post.image_url}`} />
                    </div>
                    <div className="cardBottom">
                        <div>Author:
                            <Link to={`/users/${userId}`}>
                                {post.user.user.first_name} {post.user.user.last_name}
                            </Link>
                        </div>
                        <div className="cardFunctions">
                            <div>Reaction Count: 0</div>
                            {
                                post.user.id === currentUser
                                    ? <div className="cardButtons">
                                        <ButtonControls isPost={true} postId={post.id} />
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
                : listView
                    ? <div key={`post--${post.id}`} className="singlePost">
                        <div>
                            <Link to={`/posts/single/${post.id}`}>
                                {post.title}
                            </Link>
                            {
                                post.user.id === currentUser
                                    ? <ButtonControls isPost={true} postId={post.id} />
                                    : null
                            }
                        </div>
                        <div>
                            <Link to={`/users/${post.user.id}`}>
                                {post.user.user.first_name} {post.user.user.last_name}
                            </Link>
                        </div>
                        <div>{post.publication_date}</div>
                        <div>{post.category.label}</div>
                        <div>{post.tags.map(tag => <div key={`posttag${post.id}${tag.id}`}>{tag.label}</div>)}</div>
                    </div>
                    : <div key={`post--${post.id}`} className="postDetails">
                        <div className="postDetailsMain">
                            <div className="postDetailsTitle">
                                <div className="cardButtons">
                                    {
                                        post.user.id === currentUser
                                            ? <ButtonControls isPost={true} postId={post.id} />
                                            : null
                                    }
                                </div>
                                <div>{post.title}</div>
                                <div>{post.category.label}</div>
                            </div>
                            <div><img src={`${post.image_url}`} /></div>
                            <div className="postDetailsBelowCard">
                                <div className="userNameLink">By <Link to={`/users/${post.user.id}`} >
                                    {post.user.user.username}
                                </Link>
                                </div>
                                <div className="commentButtons">
                                    {
                                        showComments
                                            ? <button onClick={() => { setShowComments(false) }}>Show Post</button>
                                            : <button onClick={() => setShowComments(true)}>View Comments</button>
                                    }
                                </div>

                                {/* Create a TagList component and pass post as props. 
                                IN the TagList, Check to see if the current user is the author, if not return null, 
                                if so return a list of checkboxes for each tag in the db and a save button that 
                                creates the new rows in the post-tags table and refreshes the DOM */}

                                <div>Reactions</div>
                            </div>
                            {
                                // post.user.id === currentUser
                                    <button onClick={() => { setShowTagBoxes(!showTagBoxes) }}>Manage Tags</button>
                                    
                            }
                            {
                                showTagBoxes
                                    ? <TagsList post={post} />
                                    : <div></div>
                            }
                            {
                                showComments
                                    ? <CommentList selectPost={selectPost} setSelectPost = {setSelectPost} refresh = {refresh} setRefresh = {setRefresh} />
                                    : <div>{post.content}</div>
                            }
                        </div>
                        <div className="postDetailsTags">{post.tags.map(tag => <div key={`posttag${post.id}${tag.id}`}>{tag.label}</div>)}</div>
                    </div>
        }
        {/* Content needed in card view */}
        {/* Title, Image, Author Name (not username), Publication date, reaction count */}
        {/* Content needed in post details */}
        {/* Title, category, tags, content, username, image, reactions */}
    </>
}
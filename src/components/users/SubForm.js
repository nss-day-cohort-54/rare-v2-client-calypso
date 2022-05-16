import { useEffect, useState } from "react"
import { addSub, deleteSub, getSubsForFollower } from "./SubManager"


export const SubForm = ({ author }) => {
    const [subbed, setSubbed] = useState(false)
    const [subs, setSubs] = useState([])
    const [currentSub, setCurrentSub] = useState({})
    const [currentUser, setCurrentUser] = useState(0)


    useEffect(
        () => {
            let userId = localStorage.getItem("token")
            setCurrentUser(userId)
        },
        []
    )

    useEffect(
        () => {
            if (currentUser > 0) {
                getSubsForFollower(currentUser)
                    .then(subData => setSubs(subData))
            }
        }, [currentUser]
    )

    useEffect(() => {
        if (subs && subs.length > 0) {
            let isSubbed = false
            for (const sub of subs) {
                if (sub.authorId === author.id) {
                    isSubbed = true
                    setCurrentSub(sub)
                }
            }
            setSubbed(isSubbed)
        }
    }, [subs])

    const handleSub = (e) => {
        if (subbed) {
            deleteSub(currentSub.id)
                .then(setSubbed(false))
        } else {
            let userId = parseInt(currentUser)
            if (userId != author.id) {
                let new_subscription = {
                    followerId: parseInt(currentUser),
                    authorId: author.id,
                    createdOn: (new Date()).toISOString().split('T')[0]
                }
                addSub(new_subscription)
                    .then(returnedSub => {
                        setCurrentSub(returnedSub)
                    })
                    .then(setSubbed(true))
            } else {
                window.alert("You can't subscribe to yourself.")
            }
        }
    }

    return <div>
        {
            parseInt(currentUser) != author.id
                ? <button
                    className="subButton"
                    onClick={(e) => {
                        handleSub(e)
                    }}>
                    {subbed ? "Unsubscribe" : "Subscribe"}
                </button>
                : null
        }

    </div>
}
import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext ()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([])
    const [editFeedback, setFeedbackEdit] = useState({
        item:{},
        edit:false,
    })

    useEffect (()=> {
        fetchFeecback()
    },[])
    const fetchFeecback = async () => {
        const response = await fetch ("http://localhost:3005/feedback")
        const data = await response.json()
        setFeedback(data)
    }



    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            await fetch(`http://localhost:3005/feedback/${id}`, {
                method: "DELETE"})

            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const addFeedback = async (newFeedback) => {
        const response = await fetch('http://localhost:3005/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFeedback),
        })
    
        const data = await response.json()
    
        setFeedback([data, ...feedback])
      }

    const updateFeedback = async (id, updItem) => {
        const response = await fetch (`http://localhost:3005/feedback/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem),
        })
        const data = await response.json()

        setFeedback(feedback.map((item) => (item.id === id ? {...item, ...data} : item)))
        setFeedbackEdit({
            item: {},
            edit: false,
          })
    }





    const feedbackEdit = (item) => {
        setFeedbackEdit({
            item,
            edit:true
        })

    }

    return (
        <FeedbackContext.Provider value={{
            feedback,
            deleteFeedback,
            addFeedback,
            feedbackEdit,
            updateFeedback,
            editFeedback,

        }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext
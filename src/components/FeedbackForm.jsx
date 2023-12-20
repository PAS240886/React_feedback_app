import Card from "./shared/Card";
import { useState, useContext, useEffect } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm () {
    const {addFeedback, editFeedback, updateFeedback} = useContext(FeedbackContext)

    useEffect(()=>{
        if(editFeedback.edit === true){
            setBtnDisabled(false)
            setText(editFeedback.item.text)
            setRating(editFeedback.item.rating)
        }
    },[editFeedback])

    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(10)
    const handleTextChange = (e) => {
        if(text === '') {
            setBtnDisabled (true)
            setMessage (null)
        } else if (text !== '' && text.trim().length <= 10) {
            setMessage('Text must be at least 10 characters')
            setBtnDisabled(true)
        } else {
            setBtnDisabled(false)
            setMessage(null)
        }
        setText(e.target.value)
    }
    const handleSubmit = (e)=> {
        e.preventDefault()
        if (text.trim().length > 10) {
            const newFeedback = {
                text: text,
                rating: rating
            }
            if (editFeedback.edit === true) {
                updateFeedback(editFeedback.item.id, newFeedback)
              } else {
                addFeedback(newFeedback)
              }
            setText('')
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2> How would you rate your service with us?</h2>
                <RatingSelect select={(rating)=>setRating(rating)} />
                <div className="input-group">
                    <input onChange={handleTextChange} type='text' placeholder='Write a review' value={text}></input>
                    <Button type='submit' isDisabled={btnDisabled }>Send</Button>
                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm
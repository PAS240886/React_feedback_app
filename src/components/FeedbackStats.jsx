import PropTypes from 'prop-types'

function FeedbackStats ({feedback}) {
    //calculating rating avg
    let average = feedback.reduce((acc, cur)=>{
        return acc + cur.rating
    },0) / feedback.length
    average = average.toFixed(1)
    return(
        <div className="feedback-stats">
            <h4>{feedback.length} reviews</h4>
            <h4>Average rating: {isNaN(average) ? 0 : average}</h4>

        </div>
    )
}

FeedbackStats.propTypes = {
    feedback: PropTypes.array.isRequired,
}
export default FeedbackStats
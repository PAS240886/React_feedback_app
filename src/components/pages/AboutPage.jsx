import Card from "../shared/Card"
import { Link } from "react-router-dom"

function AboutPage ()  {
    return (
        <Card>
            <div  className="about">
                <h1>Just a simple React Router example</h1>
                <Link to="/React_feedback_app">Homepage</Link>
            </div>

        </Card>
    )
}

export default AboutPage
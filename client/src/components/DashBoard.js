import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: []
        }
    }

    componentDidMount = () => {
        axios.get("http://localhost:8000/activities")
            .then(res => {
                this.setState({activities: res.data.activities}, this.rateThings());
            }).catch(err => {
                console.log(err);
            });
    }

    rateThings = () => {
        let activities = [...this.state.activities];
        for(let i in activities) {
            if(activities[i].reviews.length > 0){
                let sum = 0;
                for(let review of activities[i].reviews) {
                    sum += review.rating;
                }
                activities[i].avgRating = sum / activities[i].reviews.length;
            } else {
                activities[i].avgRating = "No reviews";
            }
        }
        console.log(activities);
        this.setState({activities: activities});
    }

    render() {
        return (
            <fieldset>
                <legend>Activities</legend>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Duration</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.activities.map( activity => 
                                <tr key={activity._id}>
                                    <td>{activity.type}</td>
                                    <td>{activity.avgRating}</td>
                                    <td>{activity.duration} {activity.units}</td>
                                    <td>
                                        <Link 
                                            to={"/activity/" + activity._id + "/edit"}>
                                            <button>Edit</button>
                                        </Link>
                                        <Link 
                                            to={"/activity/" + activity._id + "/review"}>
                                            <button>Review</button>
                                        </Link>
                                    </td>
                                </tr>    
                            )
                        }
                    </tbody>
                </table>
            </fieldset>
        );
    }
}

export default DashBoard;
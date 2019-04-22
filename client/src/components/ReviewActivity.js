import React, { Component } from 'react';
import axios from 'axios';

class ReviewActivity extends Component {
    constructor(props){
        super(props);
        this.state = {
            activity: {
                type: "",
                duration: "",
                units: "Years",
                reviews: []
            },
            review : {
                name: "",
                rating: 3,
                description: ""
            },
            errors: {}
        }
    }

    componentDidMount = () => {
        axios.get(`/activities/${this.props.match.params._id}`)
            .then(res => {
                this.setState({activity: res.data.activity});
            }).catch(err => {
                console.log(err);
            })
    }

    review = (e) => {
        e.preventDefault();
        axios.post(`/activities/${this.props.match.params._id}/review`, this.state.review)
            .then(res => {
                this.componentDidMount();
            }).catch(err => {
                console.log(err);
            });
    }

    changeName = (e) => {
        this.setState({review: {...this.state.review, name: e.target.value}});
    }

    changeRating = (e) => {
        this.setState({review: {...this.state.review, rating: e.target.value}});
    }

    changeDesc = (e) => {
        this.setState({review: {...this.state.review, description: e.target.value}});
    }

    render() {
        return (
            <div>
                <h3>Activity: {this.state.activity.type}</h3>
                <h4>Duration: {this.state.activity.duration} {this.state.activity.units}</h4>
                <h4>Reviews:</h4>
                <hr />

                {
                    this.state.activity.reviews.map( (review, index) => 
                        <div key={index}>
                            <p>
                                <strong>{review.name} says:</strong>&nbsp;
                                {review.description}
                            </p>
                            <p>{review.rating}</p>
                            <hr />
                        </div>
                    )
                }

                <fieldset>
                    <legend>Review Activity</legend>
                    <form onSubmit={this.review}>
                        <p>
                            Name:&nbsp;
                            <input type="text" onChange={this.changeName} />
                        </p>
                        <p>
                            Rating:&nbsp;
                            <input type="number" onChange={this.changeRating} />
                        </p>
                        <p>
                            Description:&nbsp;
                            <input type="text" onChange={this.changeDesc} />
                        </p>
                        <button type="submit">Review Activity</button>
                    </form>
                </fieldset>
            </div>
        )
    }
}

export default ReviewActivity;
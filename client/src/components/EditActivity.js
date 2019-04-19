import React, { Component } from 'react';
import axios from 'axios';

class EditActivity extends Component {
    constructor(props){
        super(props);
        this.state = {
            activity: {
                type: "",
                duration: "",
                units: "Years"
            },
            errors: {}
        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:8000/activities/${this.props.match.params._id}`)
            .then(res => {
                this.setState({activity: res.data.activity});
            }).catch(err => {
                console.log(err);
            })
    }

    changeType = (e) => {
        this.setState({activity: {...this.state.activity, type: e.target.value}});
    }

    changeDuration = (e) => {
        this.setState({activity: {...this.state.activity, duration: e.target.value}});
    }

    changeUnits = (e) => {
        this.setState({activity: {...this.state.activity, units: e.target.value}});
    }

    update = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.put(`http://localhost:8000/activities/${this.props.match.params._id}`, this.state.activity)
            .then(res => {
                if(res.data.errors){
                    this.setState({errors: res.data.errors.errors});
                } else {
                    this.props.history.push('/');
                }
            }).catch(err => {
                console.log(err);
            });
    }

    delete = (e) => {
        axios.delete(`http://localhost:8000/activities/${this.props.match.params._id}`)
            .then(res => {
                this.props.history.push('/');
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <fieldset>
                <legend>Edit Activity</legend>
                <form onSubmit={this.update}>
                    <p>
                        Type:&nbsp;
                        <input 
                            type="text" 
                            onChange={this.changeType} 
                            value={this.state.activity.type} 
                        />
                        {
                            (this.state.errors.type) ? 
                            <span className="error">&nbsp;{this.state.errors.type.message}</span> :
                            <span></span>
                        }
                    </p>
                    <p>
                        Duration:&nbsp;
                        <input 
                            type="number" 
                            onChange={this.changeDuration} 
                            value={this.state.activity.duration}
                        />
                        {
                            (this.state.errors.duration) ? 
                            <span>&nbsp;{this.state.errors.duration.message}</span> :
                            <span></span>
                        }
                    </p>
                    <p>
                        Units:&nbsp;
                        <select id="select" onChange={this.changeUnits} value={this.state.activity.units}>
                            <option value="Years">Years</option>
                            <option value="Months">Months</option>
                            <option value="Days">Days</option>
                            <option value="Hours">Hours</option>
                            <option value="Minutes">Minutes</option>
                            <option value="Seconds">Seconds</option>
                        </select>
                    </p>
                    <button type="submit">Update Activity</button>
                </form>
                <button onClick={this.delete}>Delete Activity</button>
            </fieldset>
        )
    }
}

export default EditActivity;
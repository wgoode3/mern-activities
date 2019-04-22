import React, { Component } from 'react';
import axios from 'axios';

class ActivityForm extends Component {
    constructor(props) {
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

    changeType = (e) => {
        this.setState({activity: {...this.state.activity, type: e.target.value}});
    }

    changeDuration = (e) => {
        this.setState({activity: {...this.state.activity, duration: e.target.value}});
    }

    changeUnits = (e) => {
        this.setState({activity: {...this.state.activity, units: e.target.value}});
    }

    create = (e) => {
        e.preventDefault();
        axios.post("/activities", this.state.activity)
            .then(res => {
                if(res.data.errors){
                    this.setState({errors: res.data.errors.errors});
                    console.log(this.state);
                } else {
                    this.props.history.push("/");
                }
            }).catch(err => {
                console.log(err);
            });
    }
    
    render() {
        return (
            <fieldset>
                <legend>Create Activity</legend>
                <form onSubmit={this.create}>
                    <p>
                        Type:&nbsp;
                        <input type="text" onChange={this.changeType} />
                        {
                            (this.state.errors.type) ? 
                            <span className="error">&nbsp;{this.state.errors.type.message}</span> :
                            <span></span>
                        }
                    </p>
                    <p>
                        Duration:&nbsp;
                        <input type="number" onChange={this.changeDuration} />
                        {
                            (this.state.errors.duration) ? 
                            <span>&nbsp;{this.state.errors.duration.message}</span> :
                            <span></span>
                        }
                    </p>
                    <p>
                        Units:&nbsp;
                        <select onChange={this.changeUnits}>
                            <option>Years</option>
                            <option>Months</option>
                            <option>Days</option>
                            <option>Hours</option>
                            <option>Minutes</option>
                            <option>Seconds</option>
                        </select>
                    </p>
                    <button type="submit">Create Activity</button>
                </form>
            </fieldset>
        );
    }
}

export default ActivityForm;
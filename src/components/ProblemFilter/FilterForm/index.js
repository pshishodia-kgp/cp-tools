import React from 'react'; 
import {Button, Form} from 'react-bootstrap';
import UserSearch from './UserSearch';
import SelectTags from './SelectTags'; 

export default class FilterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filter : {
                tags : [], 
                lowerDiff : '', 
                upperDiff : '',
                baseRound : '',
            },
            users : [],
        } 
    }

    handleInputChange = (event) => {
        let node = event.target; 
        let newFilter = this.state.filter;
        newFilter[node.name] = node.value; 
        this.setState({
            filter : newFilter,
        });
    }

    getTags = (tags) => {
        let newFilter = this.state.filter; 
        newFilter.tags = tags; 
        this.setState({
            filter : newFilter,
        })
    }

    render(){
        let invalidUsers = ''; 
        if(this.props.invalidUsers.length){
            invalidUsers = `Couldn't fetch data for ${this.props.invalidUsers.join(', ')} as they might be invalid usernames`
        }

        return (
            <Form  onSubmit = {(event) => this.props.handleSubmit(event, this.state.filter, this.state.users)}>
                <Form.Group> 
                    <Form.Label> Users </Form.Label>
                    <UserSearch sendUsers = {(users) => this.setState({users : users})}/>   
                    <Form.Text className = "text-danger"> {invalidUsers} </Form.Text>
                </Form.Group>

                <Form.Group> 
                    <Form.Label> Tags </Form.Label>
                    <SelectTags sendTags = {this.getTags} />  
                </Form.Group>

                <Form.Group> 
                    <Form.Label> Base Round </Form.Label>
                    <Form.Control type = "number" name = "baseRound" onChange = {this.handleInputChange} placeholder = "Base Round in numbers" />  
                </Form.Group>
            
                <Form.Group>
                    <Form.Label> Difficulty </Form.Label>  
                    <Form.Control style = {{'width' : '40%', 'margin-right' : '10px'}} type = "number" step = "100" name = "lowerDiff" onChange = {this.handleInputChange}/>
                    <span> &nbsp; - &nbsp; </span>
                    <Form.Control style = {{'width' : '40%', 'margin-left' : '10px'}} type = "number" step = "100" name = "upperDiff" onChange = {this.handleInputChange} /> 
                </Form.Group>
                
                <Button variant = "outline-primary" type = "submit"> Filter Problems !</Button>
            </Form>
        )
    }
}
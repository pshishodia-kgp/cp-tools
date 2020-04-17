import React from 'react'; 
import {Button, Form, Row, Col} from 'react-bootstrap';
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
            <Form className = "well" onSubmit = {(event) => this.props.handleSubmit(event, this.state.filter, this.state.users)}>
                <Form.Group> 
                    {/* <Form.Label column xs = "2" sm = "2"> Users </Form.Label> */}
                    <UserSearch sendUsers = {(users) => this.setState({users : users})}/>   
                    <Form.Text className = "text-danger"> {invalidUsers} </Form.Text>
                </Form.Group>

                <Form.Group>
                    <SelectTags sendTags = {this.getTags} />  
                </Form.Group>

                <Form.Group> 
                    {/* <Form.Label> Base Round </Form.Label> */}
                    <Form.Control type = "number" name = "baseRound" onChange = {this.handleInputChange} placeholder = "Base Round in numbers" />  
                    <Form.Text className = "text-muted">This will generate problems after given round </Form.Text>
                </Form.Group>
            
                <Form.Group as = {Row}>
                    <Form.Label column xs = {3} sm = {3}> Difficulty </Form.Label>  
                    <Col xs = {4} sm = {4}> 
                        <Form.Control type = "number" step = "100" name = "lowerDiff" onChange = {this.handleInputChange}/>
                    </Col> 

                    <Col xs = {4} sm = {4} > 
                        <Form.Control type = "number" step = "100" name = "upperDiff" onChange = {this.handleInputChange} /> 
                    </Col> 
                </Form.Group>
                
                <Button  variant = "outline-primary" type = "submit">Filter Problems !</Button>
            </Form>
        )
    }
}
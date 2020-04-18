import React from 'react'; 
import {Button, Form, Row, Col} from 'react-bootstrap';
import UserSearch from './UserSearch';
import SelectTags from './SelectTags'; 

export default class FilterForm extends React.Component{
    constructor(props){
        super(props);
        this.cached = {
            filter : {
                tags : [], 
                lowerDiff : '', 
                upperDiff : '',
                baseRound : '',
            },
            users : [],
        }
        if(localStorage.getItem('filter')){
            this.cached.filter = JSON.parse(localStorage.getItem('filter')); 
            this.cached.users = JSON.parse(localStorage.getItem('filterUsers')); 
        }
        this.props.handleSubmit(null, this.cached.filter, this.cached.users); 
        this.state = this.cached;
    }

    saveDefaultFilter = (filter, users) => {
        localStorage.setItem('filter', JSON.stringify(filter)); 
        localStorage.setItem('filterUsers', JSON.stringify(users)); 
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
                    <UserSearch cachedUsers = {this.cached.users} sendUsers = {(users) => this.setState({users : users})}/>   
                    <Form.Text className = "text-danger"> {invalidUsers} </Form.Text>
                </Form.Group>

                <Form.Group>
                    <SelectTags cachedTags = {this.cached.filter.tags} sendTags = {this.getTags} />  
                </Form.Group>

                <Form.Group> 
                    {/* <Form.Label> Base Round </Form.Label> */}
                    <Form.Control value = {this.cached.filter.baseRound} type = "number" name = "baseRound" onChange = {this.handleInputChange} placeholder = "Base Round" />  
                    <Form.Text className = "text-muted">This will generate problems after given round </Form.Text>
                </Form.Group>
            
                <Form.Group as = {Row}>
                    <Form.Label column xs = {3} sm = {3}> Difficulty </Form.Label>  
                    <Col xs = {4} sm = {4}>
                        <Form.Control value = {this.cached.filter.lowerDiff} type = "number" step = "100" name = "lowerDiff" onChange = {this.handleInputChange}/>
                    </Col> 

                    <Col xs = {4} sm = {4} > 
                        <Form.Control value = {this.cached.filter.upperDiff} type = "number" step = "100" name = "upperDiff" onChange = {this.handleInputChange} /> 
                    </Col> 
                </Form.Group>
                
                <Button variant = "outline-primary" type = "submit" style = {{'marginRight' : '5px'}}>Filter Problems !</Button>
                <Button variant = "outline-primary" onClick = {() => this.saveDefaultFilter(this.state.filter, this.state.users)}>Save Filter as default</Button> 
            </Form>
        )
    }
}
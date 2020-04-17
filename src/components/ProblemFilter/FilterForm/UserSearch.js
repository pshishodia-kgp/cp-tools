import React from 'react';
import {Form, Col} from 'react-bootstrap'; 
import {fetchSuggestions} from '../../../HelperFunctions/UserSuggestions'; 

export default class UserSearch extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            currentUser : '', 
            suggestions : [],
        };
        this.maxSuggestions = 10; 
        this.userSearch = React.createRef();
    }

    componentDidMount(){
        this.userSearch.current.value = this.props.cachedUsers.join(' '); 
    }

    updateSuggestions = async (query) => {
        let result = await fetchSuggestions(query, this.maxSuggestions); 
        this.setState({
            suggestions : result,
        });
    }

    handleUserChange = async () => {
        let text = this.userSearch.current.value.toString();
        let newUser = '';
        if(!text || !text.length || text[text.length - 1] === ' ')newUser = '';  
        else{
            let arr = text.split(' '); 
            newUser = arr[arr.length - 1]; 
        }
        this.setState({
            currentUser : newUser, 
        }); 

        this.props.sendUsers(text.trim().split(/\s\s*/));

        if(newUser.length < 3)newUser = '';
        this.updateSuggestions(newUser); 
    }

    fillUser = (event) => {
        event.preventDefault(); 
        let node = this.userSearch.current;
        let user = event.target.innerHTML.toString(); 
        let text = node.value.toString(); 
        let newText = text.substring(0, text.length - this.state.currentUser.length).concat(user).concat(' '); 

        node.focus();    
        node.value = newText; this.handleUserChange(); 
    }

    showSuggestions = () => {
        let handleList = this.state.suggestions.map((handle) => <li className = "user-suggestions" onClick = {this.fillUser}>{handle}</li> ); 
        return (
            <ul> {handleList} </ul> 
        )
    }

    render(){
        return(
            <React.Fragment>  
                <Form.Control type = "text" ref = {this.userSearch} placeholder = "Space separated cf usernames" onChange = {this.handleUserChange} />
                {this.showSuggestions()} 
            </React.Fragment> 
        )
    }
}
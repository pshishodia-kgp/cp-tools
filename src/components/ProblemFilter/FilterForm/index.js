import React from 'react'; 
import {Row, Col, Button} from 'react-bootstrap';
import UserSearch from './UserSearch';
import SelectTags from './SelectTags'; 

export default class FilterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filter : {
                tags : ['educational'], 
                lowerDiff : '2000', 
                upperDiff : '2100',
                baseRound : '',
            },
            users : ['Black.n.White', 'TheFool'],
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
        //console.log('users : ', this.state.users, 'tags : ', this.state.filter.tags); 
        return (
            <div> 
            <form  onSubmit = {(event) => this.props.handleSubmit(event, this.state.filter, this.state.users)}>
                <div className = "form-group"> 
                    <label className = "form-label" htmlFor ="search-bar"> Users </label>
                    <UserSearch sendUsers = {(users) => this.setState({users : users})}/>  
                </div>


                <div className = "form-group"> 
                    <label className = "form-label" htmlFor = "tags"> <span>Tags</span> </label>
                    <SelectTags sendTags = {this.getTags} />  
                </div>

                <div className = "form-group"> 
                    <label className = "form-label" for = "baseRound"> <span> Base Round </span> </label>
                    <input className = "form-control" type = "number" name = "baseRound" onChange = {this.handleInputChange} placeholder = "Base Round in numbers" />  
                    </div> 
            
                <div className = "form-group"> 
                    <label className = "form-label" for = "Difficulty"> <span> Difficulty </span> </label>  

                    <input className = "form-control" style = {{'width' : '40%'}} type = "number" name = "lowerDiff" onChange = {this.handleInputChange}/>
                    <span> &nbsp; - &nbsp; </span>
                    <input className = "form-control" style = {{'width' : '40%'}} type = "number" name = "upperDiff" onChange = {this.handleInputChange} /> 
                </div>
                
                <div className = "form-group" >
                    <Button variant = "outline-primary" type = "submit"> Filter Problems !</Button>
                </div> 
            </form> 
            </div> 
        )
    }
}
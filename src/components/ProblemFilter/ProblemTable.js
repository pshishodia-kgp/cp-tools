import React from 'react'; 
import {Table, Button} from 'react-bootstrap'; 

export default class ProblemTable extends React.Component{
    constructor(props){
        //console.log('props : ', props); 
        super(props); 
        this.state = {
            tags : true,
            sortOrder : {   // true for ascending
                round : false,
                name : true, 
                rating : true,
            },
            sortActive : 'round', 
        }
    }

    handleSorting = (fieldName) => {
        let problems, sortActive, sortOrder = this.state.sortOrder;  
        if(fieldName === 'round'){
            problems = this.props.problems.sort(function(a, b){
                if(a.contestId === b.contestId)return  (a.index < b.index ? -1 : 1); 
                return parseInt(a.contestId) - parseInt(b.contestId); 
            });

        }else if(fieldName === 'name'){
            problems = this.props.problems.sort(function(a, b){
                if(a.name < b.name)return -1; 
                else if(a.name >  b.name)return 1; 
                else return 0; 
            });
        }else if(fieldName === 'rating'){
            problems = this.props.problems.sort(function(a, b){
                if(a.rating === b.rating)return  parseInt(b.contestId) - parseInt(a.contestId); 
                return parseInt(a.rating) - parseInt(b.rating); 
            });
        }

        if(!sortOrder[fieldName]){
            problems = problems.reverse(); 
        }
        sortActive = fieldName; 
        sortOrder[fieldName] = !sortOrder[fieldName]; 

        this.setState({
            problems : problems, 
            sortActive : sortActive,
            sortOrder : sortOrder,
        })
    }

    getIcon = (fieldName) => {
        let color = (this.state.sortActive == fieldName)? 'green' : '#212529'; 
        return (
            <i style = {{'margin' : '.2em', 'color' : color}} onClick = {() => this.handleSorting(fieldName)} className = {'fa ' + (this.state.sortOrder[fieldName]? 'fa-sort-up' : 'fa-sort-down')}></i> 
        )
    }

    tableHeader = () => {
        return (
            <thead> 
                <tr> 
                    <th> # {this.getIcon('round')}</th> 

                    <th>
                        Name
                        {this.getIcon('name')}
                        <Button variant = "dark" style = {{'float' : 'right'}} onClick = {() => this.setState({tags : !this.state.tags})} >ToggleTags </Button> 
                    </th> 

                    <th>
                        Rating
                        {this.getIcon('rating')}
                    </th> 
                </tr> 
            </thead> 
        )
    }

    tableRows = () => {
        return this.props.problems.map((problem) => {
            let url = "https://codeforces.com/problemset/problem/" + problem.contestId.toString() + '/' + problem.index.toString(); 
            let tagList = (!this.state.tags)? (<div> </div>)
                                            : problem.tags.map((tag) => <span style = {{'text-decorations' : 'none'}}>{tag}, </span> );
            return(
                <tr> 
                    <td> {problem.contestId.toString() + problem.index.toString()} </td> 
                    <td>
                        <div style={{'float' : 'left'}}>
                            <a href = {url} target = "_blank"> {problem.name} </a>
                        </div>
                        <div style={{'float': 'right', 'font-size' : '0.8rem', 'padding-top' : '1px', 'text-align' : 'right'}}>
                            {tagList}
                        </div>
                    </td>
                    <td> {problem.rating} </td> 
                </tr> 
            )
        });
    }
    
    render(){
        if(!this.props.problems){
            return (<div> </div> ); 
        }

        return (
            <div> 
                <span>Total problems : {this.props.problems.length} </span> 
            <Table className = "table" striped bordered style = {{borderRadius : '5px'}}> 
                {this.tableHeader()}
                <tbody> {this.tableRows()} </tbody>
            </Table> 
            </div> 
        )
    }
}
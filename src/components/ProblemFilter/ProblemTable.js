import React from 'react'; 
import {Table, Button, ButtonGroup} from 'react-bootstrap'; 

export default class ProblemTable extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            tags : true,
            sortOrder : {   // true for ascending
                round : false,
                name : true, 
                rating : true,
                solvedBy : true,
            },
            mode : 'all',
            problems : this.props.problems,
            sortActive : 'round', 
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.problems !== nextProps.problems){
            this.setState({ 
                problems : nextProps.problems,
            }, this.changeMode('all'));
        }
    }
    triedCount = (problemName) => {
        return (problemName in this.props.tried)? this.props.tried[problemName] : 0; 
    }
    solvedCount = (problemName) => {
        return (problemName in this.props.solved)? this.props.solved[problemName] : 0; 
    }

    handleSorting = (fieldName) => {
        let problems, sortActive, sortOrder = this.state.sortOrder;  
        if(fieldName === 'round'){
            problems = this.state.problems.sort((a, b) => {
                if(a.contestId === b.contestId)return  (a.index < b.index ? -1 : 1); 
                return parseInt(a.contestId) - parseInt(b.contestId); 
            });

        }else if(fieldName === 'name'){
            problems = this.state.problems.sort((a, b) => {
                if(a.name < b.name)return -1; 
                else if(a.name >  b.name)return 1; 
                else return 0; 
            });
        }else if(fieldName === 'rating'){
            problems = this.state.problems.sort((a, b) => {
                if(a.rating === b.rating)return  parseInt(b.contestId) - parseInt(a.contestId); 
                return parseInt(a.rating) - parseInt(b.rating); 
            });
        }else if(fieldName === 'solvedBy'){
            problems = this.state.problems.sort((a, b) => {
                if(this.triedCount(a.name) === 0 && this.triedCount(b.name) === 0)return 0; 
                if(this.triedCount(a.name) === 0)return 1; 
                if(this.triedCount(b.name) === 0)return -1; 
                if(this.solvedCount(a.name) === this.solvedCount(b.name))return this.triedCount(a.name) - this.triedCount(b.name); 
                return this.solvedCount(a.name) - this.solvedCount(b.name); 
            })
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
                        <Button variant = "outline-dark" style = {{'float' : 'right'}} onClick = {() => this.setState({tags : !this.state.tags})} >ToggleTags </Button> 
                    </th> 

                    <th>
                        Rating
                        {this.getIcon('rating')}
                    </th>

                    <th> 
                        Solved/Tried
                        {this.getIcon('solvedBy')}
                    </th>  
                </tr> 
            </thead> 
        )
    }

    tableRows = () => {
        return this.state.problems.map((problem) => {
            let url = "https://codeforces.com/problemset/problem/" + problem.contestId.toString() + '/' + problem.index.toString(); 
            let tagList = (!this.state.tags)? (<div> </div>)
                                            : problem.tags.map((tag) => <span className = "text-muted" style = {{'text-decorations' : 'none'}}>{tag}, </span> );
            
            let solvedCol = (this.triedCount(problem.name))? this.solvedCount(problem.name) + '/' + this.triedCount(problem.name) : '';
            let status = ''; 
            if(this.triedCount(problem.name) > 0 && this.solvedCount(problem.name) === 0)status = 'rejected-problem'; 
            if(this.triedCount(problem.name) > 0 && this.solvedCount(problem.name) === this.triedCount(problem.name))status = 'accepted-problem';
            return(
                <tr > 
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
                    <td className = {status}> {solvedCol} </td> 
                </tr> 
            )
        });
    }

    changeMode = (mode) => {
        let problems = []; 
        if(mode === 'all'){
            problems = this.props.problems; 
        }else if(mode === 'solved'){
            problems = this.props.problems.filter((problem) => {
                return this.triedCount(problem.name) > 0 && this.triedCount(problem.name) === this.solvedCount(problem.name); 
            });
        }else if(mode === 'unsolved'){
            problems = this.props.problems.filter((problem) => {
                return this.solvedCount(problem.name) === 0; 
            });
        }

        this.setState({
            problems : problems, 
            mode : mode,
        })
    } 

    render(){
        if(!this.state.problems){
            return (<div> </div> ); 
        }

        let modeVariant = { 'solved' : 'outline-info', 
                            'unsolved' : 'outline-info',
                            'all' : 'outline-info',}

        modeVariant[this.state.mode] = 'info'; 

        return (
            <React.Fragment> 
                {/* <span>Total problems : {this.state.problems.length} </span>  */}

                <ButtonGroup> 
                    <Button onClick = {() => this.changeMode('solved')} variant = {modeVariant['solved']}> Solved</Button>
                    <Button onClick = {() => this.changeMode('unsolved')} variant = {modeVariant['unsolved']}> Unsolved </Button> 
                    <Button onClick = {() => this.changeMode('all')} variant = {modeVariant['all']}> All </Button>
                </ButtonGroup> 
                
                <Table className = "table" striped bordered style = {{borderRadius : '5px'}}> 
                    {this.tableHeader()}
                    <tbody> {this.tableRows()} </tbody>
                </Table> 
            </React.Fragment> 
        )
    }
}
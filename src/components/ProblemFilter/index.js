import React from 'react'; 
import {Container, Row, Col} from 'react-bootstrap'
import FilterForm from './FilterForm';
import ProblemTable from './ProblemTable'
import {getProblemSet} from '../../HelperFunctions/GetProblems';
import {getSubmissions} from '../../HelperFunctions/UserSubmissions'
import {filterProblems} from '../../HelperFunctions/FilterProblems';  

export default class ProblemFilter extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            problems : [],
            solved : [],
            tried : [], 
            invalidUsers : [], 
        }
        this.problems = [];
    }

    componentDidMount = async () => {
        this.problems = await getProblemSet();
        this.setState({
            problems : this.problems.slice(0, Math.min(this.problems.length, 500)),
        });
    }

    handleSubmit = async (event, filter, users) => {
        if(event)event.preventDefault();
        let resp = await getSubmissions(users); 

        let validProblems = await getProblemSet(); 
        let problems = await filterProblems(validProblems, filter);
        problems = problems.slice(0, Math.min(problems.length, 500)); 
        this.setState({
            problems : problems,
            tried : resp.tried,
            solved : resp.solved,
            invalidUsers : resp.invalidUsers,
        });
    }

    render() {
        return (
            <Container> 
                <Row> 
                    <Col xs = "12" sm = "6"> <FilterForm invalidUsers = {this.state.invalidUsers} handleSubmit = {this.handleSubmit}/>  </Col> 
                </Row> 

                <Row> 
                    <Col xs = "12" sm = "12" lg = "12"> <ProblemTable problems = {this.state.problems} tried = {this.state.tried} solved = {this.state.solved}/> </Col> 
                </Row> 
            </Container> 
        )
    }
}
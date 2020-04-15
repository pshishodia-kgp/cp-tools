import React from 'react'; 
import {Container, Row, Col} from 'react-bootstrap'
import FilterForm from './FilterForm';
import ProblemTable from './ProblemTable'
import {getValidProblems, getSolved, filterProblems} from '../../data/Functions'; 

export default class ProblemFilter extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            problems : [],
            solved : [],
        }
        this.problems = [];
    }

    componentDidMount = async () => {
        this.problems = await getValidProblems({});
        this.setState({
            problems : this.problems.slice(1, 50),
        });
    }

    handleSubmit = async (event, filter, users) => {
        event.preventDefault();
        let resp = await getSolved(users); 

        console.log('resp of solved in submissinos : ' ,resp); 
        let solved = resp.solved; console.log('invalidUsers : ', resp.invalidUsers); 
        let validProblems = await getValidProblems(solved); 
        let problems = await filterProblems(validProblems, filter);
        this.setState({
            problems : problems,
        });
    }

    render() {
        return (
            <Container> 
                <Row> 
                    <Col xs = "12" sm = "6"> <FilterForm handleSubmit = {this.handleSubmit}/>  </Col> 
                </Row> 

                <Row> 
                    <Col xs = "12" sm = "12" lg = "12"> <ProblemTable problems = {this.state.problems} /> </Col> 
                </Row> 
            </Container> 
        )
    }
}
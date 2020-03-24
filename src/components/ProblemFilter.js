import React from 'react'; 
import {getUserList} from '../data/Functions'; 
import {Table} from 'react-bootstrap' 
import {fetchSuggestions, getValidProblems, getSolved, filterProblems} from '../data/Functions'; 


class ProblemFilter extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            filter : {
                tags : [], 
                lowerDiff : '', 
                upperDiff : '',
                baseRound : '',
            }, 
            problems : [],
            users : [],
            currentUser : '', 
            suggestions : [],
            solved : [],
        }
        this.userList = [];
        this.maxSuggestions = 10; 
        this.userSearch = React.createRef(); 
        this.problems = [];
    }

    componentDidMount = async () => {
        this.userList = await  getUserList();
        this.problems = await getValidProblems({}); 
        this.setState({
            problems : this.problems,
        });
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
       // //console.log(text,text.length,  user, user.length, newText, newText.length);  
    }

    showSuggestions = () => {
        let handleList = this.state.suggestions.map((handle) => <li className = "user-suggestions" onClick = {this.fillUser}>{handle}</li> ); 
        return (
            <ul> {handleList} </ul> 
        )
    }

    removeTag = (event) => {
        let tag = event.target.getAttribute('value'); 
        let newFilter = this.state.filter; 
        newFilter.tags = this.state.filter.tags.filter((currTag) => tag !== currTag);
        this.setState({
            filter : newFilter, 
        });
    }

    addTag = (event) => {
        let select = event.target;
        let option = select.options[select.selectedIndex]; 
        let tag = option.getAttribute('value'); 
        if(!tag || !tag.length)return; 
        if(this.state.filter.tags.indexOf(tag) === -1){
            let newFilter = this.state.filter; 
            newFilter.tags.push(tag); 
            this.setState({
                filter : newFilter,
            });
        }
    }

    showSelectedTags = () => {
        let tagList = this.state.filter.tags.map((tag) => {
            return(
                <span> 
                <span  style = {{'background-color' : 'grey'}}> 
                    <span> {tag} </span>
                    <span value = {tag} onClick = {this.removeTag}>&#10007;  </span>  
                </span> 
                <span>&nbsp;&nbsp;</span> 
                </span> 
            );
        });
        return (
            <div> {tagList} </div> 
        ); 
        }

    ProblemSet = () => {
        if(!this.state.problems){
            return (<div> </div> ); 
        }
        //console.log('problem', this.state.problems); 
        let tableRows = this.state.problems.map((problem) => {
            let url = "https://codeforces.com/problemset/problem/" + problem.contestId.toString() + '/' + problem.index.toString(); 
            let tagList = problem.tags.map((tag) => <span style = {{'text-decorations' : 'none'}}>{tag}, </span> );
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
        return (
            <Table striped bordered> 
                <thead> 
                    <tr> 
                        <th> # </th> 
                        <th> Name </th> 
                        <th> Rating </th> 
                    </tr> 
                </thead> 
                <tbody> 
                {tableRows}
                </tbody>
            </Table> 
        )
    }

    handleSubmit = async (event) => {
        console.log(this.state.filter); 
        event.preventDefault(); 
        let problems = await filterProblems(this.problems, this.state.filter);
        this.setState({
            problems : problems,
        });
    }

    handleInputChange = (event) => {
        let node = event.target; 
        let newFilter = this.state.filter;
        newFilter[node.name] = node.value; 
        this.setState({
            filter : newFilter,
        });
    }

    Form = () => {
        return (
            <div> 
            <form onSubmit = {this.handleSubmit}>
                <label htmlFor ="search-bar"> Users : <input type = "text" ref = {this.userSearch} placeholder = "Space separated user-names" onChange = {this.handleUserChange} />
                    {this.showSuggestions()} 
                </label> 

                <label for = "tags">
                    {this.showSelectedTags()}
                    <span> Tags </span>
                    <select onClick = {this.addTag}>
                        <option value=""></option>
                        {/* combine-tags-by-or */}
                        {/* <option value="combine-tags-by-or" title="*combine tags by OR">*combine tags by OR</option> */}
                            <option value="2-sat" title="2-satisfiability">2-sat</option>
                            <option value="binary search" title="Binary search">binary search</option>
                            <option value="bitmasks" title="Bitmasks">bitmasks</option>
                            <option value="brute force" title="Brute force">brute force</option>
                            <option value="chinese remainder theorem" title="Сhinese remainder theorem">chinese remainder theorem</option>
                            <option value="combinatorics" title="Combinatorics">combinatorics</option>
                            <option value="constructive algorithms" title="Constructive algorithms">constructive algorithms</option>
                            <option value="data structures" title="Heaps, binary search trees, segment trees, hash tables, etc">data structures</option>
                            <option value="dfs and similar" title="Dfs and similar">dfs and similar</option>
                            <option value="divide and conquer" title="Divide and Conquer">divide and conquer</option>
                            <option value="dp" title="Dynamic programming">dp</option>
                            <option value="dsu" title="Disjoint set union">dsu</option>
                            <option value="expression parsing" title="Parsing expression grammar">expression parsing</option>
                            <option value="fft" title="Fast Fourier transform">fft</option>
                            <option value="flows" title="Graph network flows">flows</option>
                            <option value="games" title="Games, Sprague–Grundy theorem">games</option>
                            <option value="geometry" title="Geometry, computational geometry">geometry</option>
                            <option value="graph matchings" title="Graph matchings, König's theorem, vertex cover of bipartite graph">graph matchings</option>
                            <option value="graphs" title="Graphs">graphs</option>
                            <option value="greedy" title="Greedy algorithms">greedy</option>
                            <option value="hashing" title="Hashing, hashtables">hashing</option>
                            <option value="implementation" title="Implementation problems, programming technics, simulation">implementation</option>
                            <option value="interactive" title="Interactive problem">interactive</option>
                            <option value="math" title="Mathematics including integration, differential equations, etc">math</option>
                            <option value="matrices" title="Matrix multiplication, determinant, Cramer's rule, systems of linear equations">matrices</option>
                            <option value="meet-in-the-middle" title="Meet-in-the-middle">meet-in-the-middle</option>
                            <option value="number theory" title="Number theory: Euler function, GCD, divisibility, etc">number theory</option>
                            <option value="probabilities" title="Probabilities, expected values, statistics, random variables, etc">probabilities</option>
                            <option value="schedules" title="Scheduling Algorithms">schedules</option>
                            <option value="shortest paths" title="Shortest paths on weighted and unweighted graphs">shortest paths</option>
                            <option value="sortings" title="Sortings, orderings">sortings</option>
                            <option value="string suffix structures" title="Suffix arrays, suffix trees, suffix automatas, etc">string suffix structures</option>
                            <option value="strings" title="Prefix- and Z-functions, suffix structures, Knuth–Morris–Pratt algorithm, etc">strings</option>
                            <option value="ternary search" title="Ternary search">ternary search</option>
                            <option value="trees" title="Trees">trees</option>
                            <option value="two pointers" title="Two pointers">two pointers</option>
                    </select>   
                </label>


                <label for = "baseRound"> 
                    <span> BaseRound : </span> 
                    <input type = "number" name = "baseRound" onChange = {this.handleInputChange} placeholder = "Base Round in numbers" /> 
                </label>


                <label for = "Difficulty"> 
                    <span> Difficulty </span> 
                    <input type = "number" name = "lowerDiff" onChange = {this.handleInputChange}/> 
                    <span> &nbsp; - &nbsp; </span>
                    <input type = "number" name = "upperDiff" onChange = {this.handleInputChange} />  
                </label>
                <button type = "submit"> Filter Problems !</button> 

            </form> 
            </div> 
        )
    }

    render() {
        return (
            <div>
                {this.Form()}
                {this.ProblemSet()}
            </div> 
        )
    }
}

export default ProblemFilter; 
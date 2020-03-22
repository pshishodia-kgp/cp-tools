import React from 'react'; 

class ProblemFilter extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            filter : {
                tags : [], 
                lowerDiff : 0, 
                upperDiff : 4000,
                baseRound : 0,
            }, 
            problems : [],
            users : [],
        }
    }

    handleUserChange = () => {

    }

    Form = () => {
        return (
            <div> 
            <form>
                <label for ="search-bar"> Users : <input type = "text" placeholder = "Space separated user-names" onChange = {this.handleUserChange} /> </label> 

                
                <label for = "tags">
                    <span> Tags </span>
                    <select>
                        <option value=""></option>
                        combine-tags-by-or
                        <option value="combine-tags-by-or" title="*combine tags by OR">*combine tags by OR</option>
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
                    <input type = "number" placeholder = "Base Round in numbers" /> 
                </label>


                <label for = "Difficulty"> 
                    <span> Difficulty </span> 
                    <input type = "number" /> 
                    <span> &nbsp; - &nbsp; </span>
                    <input type = "number" />  
                </label>

            </form> 
            </div> 
        )
    }

    render() {
        return (
            <div>
                {this.Form()}
            </div> 
        )
    }
}

export default ProblemFilter; 
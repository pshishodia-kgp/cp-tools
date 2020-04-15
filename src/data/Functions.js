// Users submission aggregating functions 
import {userSolved} from './userSolved.js'
var invalidUsers = []; 
var problemSet = []; 
var userList = [{handle : 'Black.n.White'}, {handle : 'TheLethalCode'}, {handle : 'TheFenrir'}, {handle : 'TheFool'}]; 
// var userList = [] ;

// get User Data, Solved Problems
const fetchUserData = async (user) =>{
    let resp = await fetch(`https://codeforces.com/api/user.status?handle=${user}`); 
    let data = await resp.json();
    if(data.status === "OK"){
        console.log(`sucessfully fetched ${user} data`); return data.result;
    }else{
        invalidUsers.push(user); return []; 
    }
} 

const findSolved = async (users) => {
    let solved = {}, triedButNotSolved = {};
    invalidUsers = []; 
    let promises = users.map((user) =>  fetchUserData(user)); 
    let contents = await Promise.all(promises); 

    console.log('fetched shizz : ', contents); 
    contents.map((content) => { 
        if(!content || !content.length)return ;
        let solvedHere = {}, triedHere = {}; 

        content.map((submission) => {
            if((submission.verdict == "OK"))solvedHere[submission.problem.name] = 1;
            triedHere[submission.problem.name] = 1; 
        });

        for(let problemName in triedHere){
            if(problemName in solvedHere){
                if(!(problemName in solved))solved[problemName] = 0; 
                solved[problemName]++; 
            }
            else {
                if(!(problemName in triedButNotSolved))triedButNotSolved[problemName] = 0;
                triedButNotSolved[problemName]++; 
            }
        }
    });
    return {solved : solved, triedButNotSolved : triedButNotSolved, invalidUsers : invalidUsers}; 
}

const getSolved = async (users) => {
    let data = await findSolved(users); 
    console.log('got Solved : ', data); 
    return data;
}


// functions for fetching problemSet

const fetchProblemSet = async () => {
    let resp = await fetch('http://codeforces.com/api/problemset.problems'); 
    let data = await resp.json(); 
    if(data.status === "OK"){
        console.log('fetched raw problemset');  return data.result; 
    }else return []; 
}

const fetchContests = async () => {
    let resp = await fetch('http://codeforces.com/api/contest.list'); 
    let data = await resp.json(); 
    if(data.status === "OK"){
        console.log('fetched contests again'); return data.result; 
    }else return []; 
}

const getProblemSet = async () => {
    if(problemSet.length)return problemSet;

    let response = await Promise.all([
        fetchProblemSet(), 
        fetchContests(),
    ]); 
    let rawProblemSet = response[0].problems;  
    let contests = response[1]; 
    if(!rawProblemSet.length  || !contests.length)return []; 
    console.log('fetched both rawProblemSet & contest'); 

    let contestType = {};               
    for(let contest of contests){                   // mark contest type
        let text = contest.name.toUpperCase();
        if(text.indexOf("EDUCATIONAL") !== -1)contestType[contest.id] = "educational";
        else if(text.indexOf("DIV.1") != -1 && text.indexOf("DIV. 2") != -1)contestType[contest.id] = "combined"; 
        else if(text.indexOf("DIV. 1") !== -1)contestType[contest.id] = "div1";
        else if(text.indexOf("DIV. 2") !== -1)contestType[contest.id] = "div2";
        else if(text.indexOf("DIV. 3") !== -1)contestType[contest.id] = "div3";
        else contestType[contest.id] = "combined"; 
    }

    for(let problem of rawProblemSet){  // add contesttype tags
        problem.tags.push(contestType[problem.contestId])
        problemSet.push(problem); 
    }
    console.log('problemSet : ', problemSet); 
    return problemSet; 
}

const getValidProblems = async (solved) => {
    let problems = await getProblemSet(); 
    return problems.filter(problem => !(problem.name in solved)); 
}

const filterProblems= (problems, filterSpecs) => {
    console.log(filterSpecs); 
    return problems.filter( (problem) => {
        for(let tag of filterSpecs.tags){
            if(problem.tags.indexOf(tag) === -1)return false; 
        }
        if(!(problem.rating))return false; 
        if(filterSpecs.lowerDiff && filterSpecs.lowerDiff.length && parseInt(problem.rating) < parseInt(filterSpecs.lowerDiff))return false; 
        if(filterSpecs.upperDiff && filterSpecs.upperDiff.length && parseInt(problem.rating) > parseInt(filterSpecs.upperDiff))return false; 
        if(filterSpecs.baseRound && filterSpecs.baseRound.length && parseInt(problem.contestId) <= parseInt(filterSpecs.baseRound))return false;
        return true; 
    }); 
}

const getUserList = async () => {
    if(userList.length)return userList; 
    console.log('userList : ', userList); 
    let resp = await fetch('https://codeforces.com/api/user.ratedList'); 
    console.log('fetched'); 
    resp = await resp.json(); 
    console.log('converting to json');
    if(resp.status.toString() === "OK"){
        console.log('fetched again, userList : ', userList); 
        userList = resp.result; return resp.result; 
    }
    else return []; 
    // console.log('whill start fetching'); 
    // let resp = await fetch('https://codeforces.com/api/user.ratedList');
    // console.log('fetched : ', resp);
    // return resp.json().result; 
}

const fetchSuggestions = async (query, maxSuggestions) => {
    console.log('will start fetching');
    let users = await getUserList(); 
    console.log('fetchSugg users : ', users);
    let cnt = 0; 
    let result = []; 
    // console.log(users);
    if(!query || !query.length)return result; 
    query = query.toUpperCase(); 

    for(let user of users){
        if(user.handle.toUpperCase().indexOf(query) !== -1){
            cnt++;
            result.push(user.handle); 
            if(cnt === maxSuggestions)break; 
        }
    }
    return result; 
}

export{
    getValidProblems,
    getSolved,
    filterProblems,
    getUserList,
    fetchSuggestions,
};
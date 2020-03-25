// Users submission aggregating functions 
import {data} from './problemFile.js';
import {userSolved} from './userSolved.js'
// console.log(data);
// var data = [{'name' : 'prashant'}]; 
var invalidUsers = []; 
var problemSet = data; 
var userList = [{handle : 'Black.n.White'}, {handle : 'TheLethalCode'}, {handle : 'TheFenrir'}, {handle : 'TheFool'}]; 
// var userList = [] ; 
const fetchUserData = async (user) =>{
    return userSolved.result; 
     fetch(`https://codeforces.com/api/user.status?handle=${user}`)
    .then((resp) => (resp).json())
    .then( (resp) => {
        console.log(user, resp); 
        if(resp.status.toString() !== "OK"){
            invalidUsers.push(user); 
            return []; 
        }else{
            return resp.result;         
        }
    })
    .catch((err) => {
        console.log(`Got error ${err} while fetching data for user ${user}`); 
    });
} 

const findSolved = async (users) => {
    let solved = {};
    // let promises = users.map(async (user) => await fetchUserData(user)); 
    // promises.map(async (promise) => {
    //     let content = await promise; 
    //     if(!content || !content.length)return ;
    //         for(let i = 0;i < content.length; ++i)if(content[i].verdict ==="OK"){
    //             solved[content[i].problem.name] = "TRUE"; 
    //         }
    // });
    users.map(async (user) => {
        let content = await fetchUserData(user); 
        
        if(!content || !content.length)return ;
        for(let i = 0;i < content.length; ++i)if(content[i].verdict ==="OK"){
            solved[content[i].problem.name] = "TRUE"; 
        }
    }); 
    return solved; 
}

const getSolved = async (users) => {
    console.log('inside getSolved');
    let solved = await findSolved(users); 
    let data = {solved : solved, invalidUsers : invalidUsers}; 
    return data;
}


// functions for fetching problemSet

const fetchProblemSet = async () => {
    return userSolved; 
    fetch('http://codeforces.com/api/problemset.problems')
    .then(resp => resp.json())
    .then((resp) => {
        if(resp.status.toString() !== "OK"){
            console.log("Problem in fetching problemset from API, status not OK");
            return [];  
        }else return resp.result;
    })
    .catch((err) => {
        console.log("Error in fetching problmeSet"); 
    });
}

const fetchContests = async () => {
    fetch('http://codeforces.com/api/contest.list')
    .then((resp) => resp.json())
    .then((resp) => {
        if(resp.status.toString() !== "OK"){
            console.log("Status not Ok while fetching contest list"); 
            return []; 
        }else return resp.result;
    })
    .catch((err) => {
        console.log(`Error : ${err} while fetching contestlist`); 
    });
}

const getProblemSet = async () => {
    if(problemSet.length)return problemSet;

    let response = await Promise.all([
        fetchProblemSet(), 
        fetchContests(),
    ]); 
    let rawProblemSet = response[0];  
    let contests = response[1]; 

    let contestType = {};               
    for(let contest of contests){                   // mark contest type
        let text = contest.name.toUpperCase();
        contestType[contest.id] = [];
        if(text.indexOf("EDUCATIONAL") !== -1)contestType[contest.id].push("educational");
        else if(text.indexOf("DIV. 1") !== -1)contestType[contest.id].push("div1");
        else if(text.indexOf("DIV. 2") !== -1)contestType[contest.id].push("div2");
        else if(text.indexOf("DIV. 3") !== -1)contestType[contest.id].push("div3");
        else contestType[contest.id].push("combined");
    }

    for(let problem of rawProblemSet){  // add contesttype tags
        for(let i of contestType[problem.contestId]){
            problem.tags.push(i); 
        }
        problemSet.push(problem); 
    }
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
    // console.log("inside user list"); 
    fetch('https://codeforces.com/api/user.ratedList')
    .then((resp) => console.log(resp.json()))
    .then((resp) => {
        if(resp.status.toString() !== "OK"){
            console.log("status not ok while fetching user list"); 
            userList = []; 
            return []; 
        }else{
            console.log("Fetched the user list");
            userList = resp.result; 
            return resp.result; 
        }
    })
    .catch((err) => {
        console.log("Error : ", err, "while fetching userlist");
        return [];
    })
}

const fetchSuggestions = async (query, maxSuggestions) => {
    let users = await getUserList(); 
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
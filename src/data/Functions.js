// Users submission aggregating functions 
var invalidUsers = []; 
var problemSet = [];
var userList = []; 

const fetchUserData = async (user) =>{
     fetch(`https://codeforces.com/api/user.status?handle=${user}`)
    .then((resp) => (resp).json())
    .then( (resp) => {
        if(resp.status.toString() != "OK"){
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
    let promises = users.map(async (user) => {
        let content = await fetchUserData(user); 
        
        for(let i = 0;i < content.length; ++i)if(content[i].verdict =="OK"){
            solved[content[i].problem.name] = "TRUE"; 
        }
    }); 
    return solved; 
}

const getSolved = async (users) => {
    let solved = await findSolved(users); 
    let data = {solved : solved, invalidUsers : invalidUsers}; 
    return data;
}


// functions for fetching problemSet

const fetchProblemSet = async () => {
    fetch('http://codeforces.com/api/problemset.problems')
    .then(resp => resp.json())
    .then((resp) => {
        if(resp.status.toString() != "OK"){
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
        if(resp.status.toString() != "OK"){
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

    contestType = {};               
    for(let contest in contests){                   // mark contest type
        let text = contest.name.toUpperCase();
        contestType[contest.id] = [];
        if(text.indexOf("EDUCATIONAL") != -1)contestType[contest.id].push("educational");
        else if(text.indexOf("DIV. 1") != -1)contestType[contest.id].push("div1");
        else if(text.indexOf("DIV. 2") != -1)contestType[contest.id].push("div2");
        else if(text.indexOf("DIV. 3") != -1)contestType[contest.id].push("div3");
        else contestType[contest.id].push("combined");
    }

    for(let problem in rawProblemSet){  // add contesttype tags
        for(let i in contestType[problem.contestId]){
            problem.tags.push(i); 
        }
        problemSet.push(problem); 
    }
    return problemSet; 
}

const getValidProblems = async (solved) => {
    let problems = await getProblmeSet(); 
    return problems.filter(problem => !(problem.name in solved)); 
}

const filterProblems= (problems, filterSpecs) => {
    return problems.filter(problem => {
        for(let tag in filterSpecs.tags){
            if(!(tag in problem.tags))return false; 
        }
        if(!(problem.difficulty))return false; 
        if(parseInt(problem.difficulty) < parseInt(filterSpecs.lowerDiff))return false; 
        if(parseInt(problem.difficulty) > parseInt(filterSpecs.upperDiff))return false; 
        if(parseInt(problem.contestId) <= parseInt(filterSpecs.baseRound))return false;
        return true; 
    }); 
}

const getUserList = async () => {
    if(userList.length)return userList; 
    fetch('https://codeforces.com/api/user.ratedList')
    .then((resp) => resp.json())
    .then((resp) => {
        if(resp.status.toString() != "OK"){
            console.log("status not ok while fetching user list"); 
            userList = []; 
            return []; 
        }else{
            userList = resp.result; 
            return resp.result; 
        }
    })
    .catch((err) => {
        console.log("Error : ", err, "while fetching userlist");
    })
}

export default getValidProblems; 
export default getSolved;
export default filterProblems; 
export default getUserList; 
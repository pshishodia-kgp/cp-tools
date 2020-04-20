// var problemSet = [];

const fetchProblemSet = async () => {
    try{
        let resp = await fetch('https://codeforces.com/api/problemset.problems'); 
        let data = await resp.json(); 
        if(data.status === "OK"){
            console.log('fetched problemset again');  return data.result; 
        }else return []; 
    }catch(err){
        console.log(err); 
    }
}

const fetchContests = async () => {
    let resp = await fetch('https://codeforces.com/api/contest.list'); 
    let data = await resp.json(); 
    if(data.status === "OK"){
        console.log('fetched contests again'); return data.result; 
    }else return []; 
}

const getProblemSet = async () => {
    // if(problemSet.length)return problemSet;
    let problemSet = []; 

    let response = await Promise.all([
        fetchProblemSet(), 
        fetchContests(),
    ]); 
    let rawProblemSet = response[0].problems;  
    let contests = response[1]; 
    if(!rawProblemSet.length  || !contests.length)return []; 

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
    return problemSet; 
}

// const getValidProblems = async (solved) => {
//     let problems = await getProblemSet(); 
//     return problems.filter(problem => !(problem.name in solved)); 
// }

export{
    getProblemSet, 
    // getValidProblems,
}
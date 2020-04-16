var invalidUsers = []; 

const fetchUserData = async (user) =>{
    console.log('user : ', user); 
    let resp = await fetch(`https://codeforces.com/api/user.status?handle=${user}`); 
    let data = await resp.json();
    if(data.status === "OK"){
        console.log(`sucessfully fetched ${user} data`); return data.result;
    }else{
        invalidUsers.push(user); return []; 
    }
} 

const findSubmissions = async (users) => {
    let solved = {}, tried = {};
    invalidUsers = []; 
    let promises = users.map((user) =>  fetchUserData(user)); 
    let contents = await Promise.all(promises); 

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
            if(!(problemName in tried))tried[problemName] = 0; 
            tried[problemName]++; 
        }
    });
    return {solved : solved, tried : tried, invalidUsers : invalidUsers}; 
}

const getSubmissions = async (users) => {
    let data = await findSubmissions(users); 
    return data;
}

export{
    getSubmissions,
}
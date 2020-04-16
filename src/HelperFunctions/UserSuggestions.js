var userList = [{handle : 'Black.n.White'}, {handle : 'TheLethalCode'}, {handle : 'TheFenrir'}, {handle : 'TheFool'}]; 

const getUserList = async () => {
    if(userList.length)return userList; 
    let resp = await fetch('https://codeforces.com/api/user.ratedList'); 
    let data= await resp.json(); 
    if(resp.status === "OK"){
        userList = data.result; return data.result; 
    }
    else return []; 
}

const fetchSuggestions = async (query, maxSuggestions) => {
    let users = await getUserList(); 
    let cnt = 0; 
    let result = []; 
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
    fetchSuggestions,
};
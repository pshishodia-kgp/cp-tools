const filterProblems= async (problems, filterSpecs) => {
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

export {
    filterProblems,
}
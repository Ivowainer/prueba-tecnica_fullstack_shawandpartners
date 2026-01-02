export function matchPerson(field, query){
    if(!query || !field) return false

    for(let i = 0; i < query.length; i++){
        if(field[i] != query[i]) return false
    }

    return true
}
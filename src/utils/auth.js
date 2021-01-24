const isAuthenticated = async () =>{

    const token = localStorage.getItem('accessToken')
    
    const reqConfig = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    }

    return await fetch('http://localhost:3300/auth', reqConfig)
    .then( res =>{
        if (res.status === 200)
            return res.json()
    })
    .then( jsonRes =>{
        if (jsonRes)
            return jsonRes.id
        else
            return false
    })
    .catch( err =>{
        console.log(err);
        alert('Erro no servidor')
    })
}

export default isAuthenticated
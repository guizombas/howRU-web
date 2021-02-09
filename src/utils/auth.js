const isAuthenticated = async () =>{

    const token = localStorage.getItem('accessToken')
    
    const reqConfig = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    }

    return await fetch(process.env.REACT_APP_BACKEND_IP+'/auth', reqConfig)
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
        const div = document.querySelector('#fail')
        if (div){
            div.classList.remove('hide')
            div.classList.add('show')
        }
    })
}

export default isAuthenticated
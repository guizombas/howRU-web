import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {FaLongArrowAltLeft, FaSearch} from 'react-icons/fa'

import '../styles/pages/find.css'
import '../styles/global.css'
interface Results{
    id: number,
    name: string
}

const Find = () => {
    const history = useHistory()

    const [results, setResults] = useState<Array<Results>>()
    const [searchMade, setSearchMade] = useState(false)

    const handleSearchFormSubmit = (event:FormEvent) =>{
        event.preventDefault()

        const typeOfSearch:any = document.getElementsByName('typeOfSearch')[0]
        const text:any = document.getElementsByName('text')[0]
        
        const token = localStorage.getItem('accessToken')

        const reqConfig:RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token || ''
            }
        }

        fetch(`http://localhost:3300/searchUser/${text.value}/${typeOfSearch.value}`, reqConfig)
        .then( res =>{

            if (res.status === 400){
                alert('Erro de autenticação')
                return window.location.href = '/'
            }
            if (res.status === 200)
                return res.json()

        })
        .then( (jsonRes:Results[]) =>{
            if (jsonRes){
                setResults(jsonRes.map( (user:Results) =>{
                    return {
                        id: user.id,
                        name: user.name
                    }
                }))
            }
        })
        .catch( err =>{
            console.log(err);
            alert('Erro no servidor')
            
        })

        setSearchMade(true)

    }

    return (
        <div id="findPage">

            <h1 className="title">
                <span onClick={()=>{history.goBack()}} className="goBack"><FaLongArrowAltLeft></FaLongArrowAltLeft></span>
                <span>Encontrar amigos</span>
            </h1>
            <hr/>

            <form id="findFriendsForm" onSubmit={handleSearchFormSubmit}>

                <fieldset>
                    <label htmlFor="typeOfSearch">Buscar por:</label>
                    <select name="typeOfSearch" id="typeOfSearch">
                        <option value="name">Nome</option>
                        <option value="id">ID</option>
                        <option value="email">E-mail</option>
                        <option value="tel">Telefone</option>
                    </select>
                </fieldset>
                
                <fieldset>
                    <input name="text" type="text" placeholder="Busca"/>
                    <button type="submit">
                        <FaSearch></FaSearch>
                    </button>
                </fieldset>

            </form>

            <div className="results">
                {
                    searchMade
                    ?
                        results && results.length > 0
                        ?
                        results.map( result => {
                            return(
                                <Link 
                                    key={result.id}
                                    to={"/perfil/"+result.id}
                                    className="friendCard"
                                >{result.name}</Link>
                            )
                        } )
                        :
                        <div className="notFound">
                            Não foram encontrados resultados para a busca
                        </div>
                    :
                    ""
                }

            </div>

        </div>
    )
}

export default Find
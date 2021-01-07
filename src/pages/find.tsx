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

        setSearchMade(true)
        setResults([{
            id: 7,
            name: "Guilherme Gabriel Silva Pereira"
        },
        {
            id: 99,
            name:"Carlos Drummond de Andrade"
        }
    ])

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
                    <input type="text" placeholder="Busca"/>
                    <button type="submit">
                        <FaSearch></FaSearch>
                    </button>
                </fieldset>

            </form>

            <div className="results">
                {
                    searchMade
                    ?
                        results
                        ?
                        results.map( result => {
                            return(
                                <Link 
                                    key={result.id}
                                    to={"/perfil/id:"+result.id}
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
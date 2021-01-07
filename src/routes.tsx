import { BrowserRouter, Switch, Route } from 'react-router-dom'

import pageLanding from './pages/pageLanding' 
import login from './pages/login'
import register from './pages/register';
import menu from './pages/menu';
import perfil from './pages/perfil';
import chat from './pages/chat';
import find from './pages/find';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={pageLanding}></Route>
                <Route path="/login" component={login}></Route>
                <Route path="/cadastro" component={register}></Route>
                <Route path="/menu" component={menu}></Route>
                <Route path="/perfil/:id" component={perfil}></Route>
                <Route path="/chat/yID=:yid/fID=:fid" component={chat}></Route>
                <Route path="/encontrar" component={find}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes
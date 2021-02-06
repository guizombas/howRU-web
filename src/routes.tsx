import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthRoute from './components/authRoute';

import pageLanding from './pages/pageLanding' 
import login from './pages/login'
import register from './pages/register';
import menu from './pages/menu';
import perfil from './pages/perfil';
import chat from './pages/chat';
import find from './pages/find';
import NotFound from './pages/notFound';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <AuthRoute path="/" exact component={pageLanding} needAuth={false}></AuthRoute>
                <AuthRoute path="/login" component={login} needAuth={false}></AuthRoute>
                <AuthRoute path="/cadastro" component={register} needAuth={false}></AuthRoute>
                <AuthRoute path="/menu" component={menu} needAuth={true}></AuthRoute>
                <AuthRoute path="/perfil/:id" component={perfil} needAuth={true}></AuthRoute>
                <AuthRoute path="/chat/:fid" component={chat} needAuth={true}></AuthRoute>
                <AuthRoute path="/encontrar" component={find} needAuth={true}></AuthRoute>
                <Route path='/' component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes
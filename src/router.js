import {Switch, Route} from 'react-router-dom';
import Example1Page from './pages/Example1Page';
import Example2Page from './pages/Example2Page';
import Example3Page from './pages/Example3Page';
import Example4Page from './pages/Example4Page';
import Home from './pages/Home';

const AppRouter = () => 
    <Switch>
        <Route exact path="/" component = {Home}/>
        <Route path = "/example1Page" component = {Example1Page} />
        <Route path = "/example2Page" component = {Example2Page} />
        <Route path = "/example3Page" component = {Example3Page} />
        <Route path = "/example4Page" component = {Example4Page} />
    </Switch>

export default AppRouter;
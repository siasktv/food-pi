import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/landingPage';
import Home from './components/home';
import CreateRecipe from './components/createRecipe';
import Details from './components/details';
import SignIn from "./components/Signin/Signin";
import Page from "./components/Page/Page"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={LandingPage}/>
        <Route exact path='/home' component={Page}/>
        <Route path = '/recipe' component={CreateRecipe} />
        <Route path="/create" component ={SignIn}/>
        <Route exact path = '/recipes/:id' component={Details} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

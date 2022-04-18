import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
// import Navbar from './Components/Navbar';
import Home from './Components/Home';
import EditPage from "./Components/EditPage";
import AddPage from './Components/AddPage';
import ViewPage from "./Components/ViewPage";
import DeletePage from './Components/DeletePage';
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Switch, Route } from "react-router-dom";
import axios from 'axios';

axios.defaults.withCredentials=true

function App() {
  return (
    <div className="App">

      <Switch>
        {/* <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Home} /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/addStudent" component={AddPage} />
        <Route exact path="/UpdateStudent/:id" component={EditPage} />
        <Route exact path="/details/:id" component={ViewPage} />
        <Route exact path="/deleteStudent/:id" component={DeletePage} />
      </Switch>


    </div>
  );
}

export default App;

import React,{Component} from "react";
import CardList from "../components/CardList";
import {SearchBox} from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";
import "../components/ErrorBoundary";
import ErrorBoundary from "../components/ErrorBoundary";
class App extends Component {
    constructor()
    {
        super();
        this.state={
            'robots':[],
            'searchField':''
        };
    }

    componentDidMount()
    {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response=>response.json())
        .then(users=>this.setState({'robots':users}));
    }

    onSearchChange=(event)=>{
        this.setState({searchField:event.target.value});
    }


    render(){
        const fileterdRobots=this.state.robots.filter(robot=>{
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
        })
        if(this.state.robots===0)
        {
            return <h1 className="tc pa3">Loading</h1>
        }else{
            return (
                <div className="tc pa2">
                <h1 className="pa3 f2">Robo Friends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                    <CardList robots={fileterdRobots}/>
                    </ErrorBoundary>
                </Scroll>
                </div>
               
            );
        }
        
    }
    
   
}
export default App;
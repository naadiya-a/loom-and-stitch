import React, {Component} from 'react'

/* 
This is a class component (as opposed to a function component)
Make it into a function component!
Note that fn components don't need a render() 
    
Also note you can use components as tags. like in App.js could have <Counter />. Just import it first
*/
class Counter extends Component {
    state = {
        counter: 0
    }

    onClick = () => {
        this.setState({
            counter: this.state.counter + 1
        })
        console.log("I was clicked")
    }

    render(){
        return (
            <div>
                <h1>Counter</h1>
                <p>{this.state.counter}</p>
                <button onClick={this.onClick}>Click me</button>
            </div>
            
        )
    }
}

export default Counter;
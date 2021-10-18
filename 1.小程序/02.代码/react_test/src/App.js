import React,{Component} from 'react';

class App extends Component{
  state={
    msg:0
  }

  buttonRef=React.createRef();

  handleClick=()=>{
    console.log('msg',this.state.msg)
    this.setState({
      msg:this.state.msg+1
    })
    console.log('msg1',this.state.msg)
    this.setState({
      msg:this.state.msg+1
    })
    console.log('msg2',this.state.msg)
    this.setState({
      msg:this.state.msg+1
    })
    console.log('msg3',this.state.msg)
    this.setState({
      msg:this.state.msg+1
    })
    console.log('msg4',this.state.msg)
  }

  handleShow(){
    console.log('1')
  }

  handleShow2(){
    console.log('2')
  }

  render(){
    return(
      <div>
        <h1>{this.state.msg}</h1>
        {/* <button onClick={this.handleClick}>+1</button>
        <button ref={this.buttonRef}>+111</button> */}
        <button onClick={this.handleShow} ref={this.buttonRef}>show</button>
      </div>
    )
  }

  componentDidMount(){
    this.buttonRef.current.onclick=this.handleShow2;
  }
}




export default App;

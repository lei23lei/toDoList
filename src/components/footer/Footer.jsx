import React, { Component } from 'react'
import PubSub from 'pubsub-js';
export default class Footer extends Component {
  state={done:2,total:4,mouse:false}
  componentDidMount(){
    this.footer = PubSub.subscribe('footer', (msg, data) => { 
      this.setState({ total: data.length });
      const done = data.reduce((acum, cur) => acum + (cur.done ? 1 : 0), 0);
      this.setState({ done: done });
    });
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.footer);
  }
  allDone=(e)=>{
    PubSub.publish('allDone',e.target.checked);  
  }
  deleteAllDone(){
    PubSub.publish('deleteAllDone')
  }
  enter=(e)=>{
    return()=>{
      this.setState({mouse:e})
    }
  }
  render() {
    const {total,done,mouse} = this.state;
    return (
        <footer>
          <ul className="list-group">
            <li className="list-group-item footer"
            onMouseLeave={this.enter(false)} onMouseEnter={this.enter(true)}
              style={{background:mouse?"#FFDDCA":"white"}}>
                <input ref={e=>this.input=e} onChange={this.allDone} type="checkbox" 
                  checked={total===done&&total!==0?true:false}
                />&nbsp;<div>done {done}</div><div>/ total {total}</div>
            </li>
            <button type="button" className="btn btn-warning" onClick={this.deleteAllDone}>Delete all done</button>
          </ul>
        </footer>
    )
  }
}

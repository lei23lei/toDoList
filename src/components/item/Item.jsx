import React, { Component } from 'react';


export default class Item extends Component {
    state={mouse:false};
    mouseEnter=(e)=>{
        return()=>{
            this.setState({mouse:e});
        }
    }
    isCheck=(id)=>{
        return(e)=>{
            this.props.updateState(id,e.target.checked)
            console.log(id,e.target.checked);
        }
    }
    delete=(id)=>{
        if(window.confirm("Sure to delete")){
            this.props.deleteItem(id);
        }
    }
  render() {
    const {mouse} = this.state;
    const {id,name,done} = this.props
    return (
        <li className="list-group-item" style={{background:mouse?'#FDD7E4':"white"}}
            onMouseLeave={this.mouseEnter(false)} onMouseEnter={this.mouseEnter(true)}>
          <input type="checkbox" ref={e=>this.input=e} onChange={this.isCheck(id)} checked={done} /> {name}
          <button type="button" onClick={()=>this.delete(id)} style={{display:mouse?'block':'none'}} className="btn btn-danger float-right">Delete</button>
        </li>
    )
  }
}

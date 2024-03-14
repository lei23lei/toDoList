import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import {nanoid} from 'nanoid';

export default class Header extends Component {
    input=(e)=>{
        const {keyCode,target} = e;
        if(keyCode !== 13) return;
        if(target.value.trim()===''){
            alert("Can not be empty");
            return;
        };
        const data = {id:nanoid(),name:target.value,done:false}
        PubSub.publish('msg',data);
        this.props.func(data)
        target.value=''
    }
  render() {
    return (
        <header>
          <h1>To-do List</h1>
          <input onKeyUp={this.input} type="text" className="input" placeholder="add items" />
        </header>
    )
  }
}

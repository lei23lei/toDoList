import React, { Component } from 'react'
import Item from '../item/Item'
import PubSub from 'pubsub-js';
export default class List extends Component {
    state={list:[
        {id:1,name:"running",done:false},
        {id:2,name:"sleeping",done:true},
        {id:3,name:"eating",done:false},
        {id:4,name:"shopping",done:true}
    ]}
    componentDidMount(){
        this.deleteAllDone=PubSub.subscribe('deleteAllDone',(msg,data)=>{
            const {list} = this.state;
            const newList = list.filter((e)=>{
                return e.done === false;
            })
            this.setState({list:newList})
            PubSub.publish('footer',newList)
        })
        this.allDone=PubSub.subscribe('allDone',(msg,data)=>{
            const {list} = this.state;
            const newList = list.map(e=>{
                return {...e,done:data}
            })
            this.setState({list:newList})
            PubSub.publish('footer',newList)
        })
        this.token=PubSub.subscribe('msg',(msg,data)=>{
            const {list} = this.state;
            const newList = [data,...list];
            this.setState({list:newList});
            PubSub.publish('footer',newList)
        });
        PubSub.publish('footer',this.state.list);  
    }
    componentWillUnmount(){
        PubSub.unsubscribe(this.token);
        PubSub.unsubscribe(this.allDone);
        PubSub.unsubscribe(this.deleteAllDone);
    }
    //UPDATE CHECK STATE FROM ITEM
    updateState=(id,state)=>{
        const {list} = this.state;
        const newList = list.map((e)=>{
            if(e.id===id) return {...e,done:state}
            else return e;
        })
        this.setState({list:newList})
        PubSub.publish('footer',newList)
    }
    //DELETE FROM ITEM
    deleteItem=(id)=>{
        const {list} = this.state;
        const newList = list.filter((e)=>{
            return e.id != id
        })
        this.setState({list:newList})
        PubSub.publish('footer',newList)
    }
  render() {
    const {list} = this.state;
    return (
        <main>
            <ul className="list-group">
                {
                   list.map((e)=>{
                    return <Item key={e.id} {...e} updateState={this.updateState} deleteItem={this.deleteItem}/>
                   }) 
                }
            </ul>
        </main>
    )
  }
}

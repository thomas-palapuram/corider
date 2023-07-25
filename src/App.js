import React from "react"
import  edit  from './edit.svg';
import back from './Back.svg'
import dots from './dots-vertical.png'
import paperclip from './paperclip.svg'
import send from './send.svg'
import stripes from'./stripes.svg'
import './App.css';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      items:[],
      isloaded:false,
    }
}
componentDidMount()
{
  fetch("https://qa.corider.in/assignment/chat?page=0")
  .then(res=>res.json())
  .then(json=>{
    this.setState({
      isloaded: true,
      items: json,
    })
  });
}

  render()
  {
  const today = new Date();
  const month_list = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"];
  const month = month_list[today.getMonth()];
  const year = today.getFullYear();
  const date = today. getDate();
  const currentDate =  date + " "+month+", " + year;
  var{isloaded,items }=this.state;
  if(!isloaded)
  {
    return <div>Loading...</div>

  }

  return (
    
       
       <div className='chat-screen'>
        <div className="title-bar">
        <div className='frame-81-1'>
          <img className="back" src={back} alt="Back" />
          <h1 ><span className="title">{items.name}</span></h1>
          <img className='edit' src={edit} alt="edit"/>
        </div>
        <br></br>
        <header className='header'>
          <div className="text">
            <div className='profile'>
              <div className='flex-col'>
                <img className='rect' src={items.chats[0].sender.image} alt="rect1"/>
                <img className='rect' src={items.chats[1].sender.image} alt="rect2"/>
            </div>
            <div className='flex-col'>
            <img className='rect' src={items.chats[2].sender.image} alt="rect1"/>
              <img className='rect' src={items.chats[3].sender.image} alt="rect2"/>
            </div>
            </div>
            <div className='ride'> <span className="from">From  </span>
            <span className="ride-title">{items.from}</span><br/>
            <span className="from">To  </ span><span className="ride-title">{items.to}</span></div>
          </div>
          <img className='dots-vertical' src={dots}/>
        </header>
        </div>
        <div className="chat-area">
        <div className="date"><img className="l-stripe" src={stripes}/> {currentDate} <img className ="r-stripe"src={stripes}/></div>
          {items.chats.map(chat=>
            {if (!chat.sender.self)
           return (
            <div className="box">
            <div className="sender">
            <div >
            <img  className="profile-2"src={chat.sender.image}/>
            </div>
           <div  className="others-message-box"><span className="others-message">{chat.message}</span></div>
          </div>
          </div>
           )
           else
           return (
            <div className="sender">
            <div className="self-message-box"><span className="self-message">{chat.message}</span></div>
           </div>
           )
            }
          )}
        </div>
        
        <div className='reply'>
          <div className='frame-13'>
            <div className='frame-25'>
          <input type="text" placeholder="Reply to @ sender" className='reply-text'></input>
          </div>
          <img className='papaer-clip' src={paperclip}/>
          <img className='send-img' src={send}/>
          </div>
        </div>
       </div>
       
     
  );
}
}

export default App;

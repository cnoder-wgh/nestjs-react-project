import { useEffect, useState } from 'react'
import api from './api';
import './App.css'
// @ts-ignore
import loadsh from 'loadsh';//防抖加节流

function App() {
  const [list, setList] = useState<any[]>([
    { id: 1, text: 'todo saa', status: 0 },
    { id: 2, text: 'eat dinner', status: 1 }
  ])
  const [loading, setLoading] = useState(false);

  const onKeyUp = (e: any) => {
    if (e.keyCode === 13 && e.target.value) {
      const newList = [{ id: '', text: e.target.value, status: 0 }, ...list,]
      setList(newList)
    }
  };

  useEffect(() => {
    api.setting().then((val: any) => {
      console.log('val===>', val)
    })
    const myDiv: any = document.getElementById('myDiv'); // 监听触底
    function checkScroll() {
      if (myDiv.clientHeight + myDiv.scrollTop >= myDiv.scrollHeight - 5) {
        loadsh.debounce(() => {
          console.log("已滚动到底部");
        }, 250, { 'maxWait': 1000 }, true)
      }
    }
    myDiv.addEventListener('scroll', checkScroll);
  }, [])

  const onCheckbox = (val:any) => {
    console.log('val===>',val.target.checked)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }
  const onLeft = () => {

  }
  const onAllCompleted = () => {

  }
  const onClear = () => {

  }

  return (
    <>
      <div className="background">
      </div>
      <div className="content" >
        <h1 >TODO</h1>
        <div className="input-block"><input onKeyUp={loadsh.debounce(onKeyUp, 250, { 'maxWait': 1000 }, true)} placeholder="Create a new todo..."></input></div>
        <div className="list" id="myDiv">
          {list.map((item: any, index: number) => <div className="item" key={index}>
            <input type="checkbox" checked={item.status === 1 ? true : false} onChange={onCheckbox}/><div className={item.status === 1 ? 'text done' : 'text'}>{item.text}</div>
          </div>)}
          {loading && <div className="mask">
            <div className="loading"></div>
          </div>}
        </div>
        {list[0] && <div className="action">
          <div className="cell" onClick={onLeft}>5 items left</div>
          <div className="cell" onClick={onAllCompleted}>All Active Completed</div>
          <div className="cell" onClick={onClear}>Clear Completed</div>
        </div>}
      </div>
    </>
  )
}

export default App

import React from 'react'
import { useEffect,useState } from 'react'

export default function Home() {
    const [items,setItems] = useState([])
    const [isPending,setIsPending] = useState(true)

    useEffect(()=>{
        fetch("http://192.168.8.122:8000/items")
        .then((res)=>{
            console.log(res)
            return res.json()
        })
        .then(data=>{
          console.log(data)
          setItems(data)
          setIsPending(false)
        })
    },[])

    const Refresh = ()=>{
      setIsPending(true)
      setTimeout(()=>{
          fetch("http://192.168.8.122:8000/items")
        .then((res)=>{
            console.log(res)
            return res.json()
        })
        .then(data=>{
          console.log(data)
          setItems(data)
          setIsPending(false)
        })
    },500)
    }

    const handleClick = (id)=>{
      fetch('http://192.168.8.122:8000/items/'+id,{
            method:'DELETE'
        })
        .then(()=>{
          Refresh()
        })
    }
        
  return (
    <div className='Bill-Box'>
      <h1 className='intro'>
        Welcome to your Bill Page
      </h1>
      <button onClick={Refresh} className='Refresh-but'>Refresh</button>
      {isPending && <div>
          <h2>Loading...</h2>
        </div>}
      {items && <div className='Bill-box'>{items.map((item)=>(
        <div key={item.id}>
          <h2>Item Code : {item["Item-Code"]}</h2>
          <button onClick={()=>{handleClick(item.id)}} className='Delete-but'>Remove Item</button>
        </div>
      ))}</div>
}
    </div>
  )
}

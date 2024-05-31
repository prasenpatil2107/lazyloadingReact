import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface Products{
id:number,
title:string,
}

function App() {
  const [data, setData] = useState<Products[]>([]);
  const [skip, setSkip] = useState(0);
let counter = 1;
  const listInnerRef = useRef<HTMLDivElement>(null);
  
  const fetchData = async () =>{
    try{
      const getData =    await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
      const response = await getData.json();
      console.log(response,"response")
      setData((prev) => [...prev, ...response.products]);
    }
    catch(error){
      console.log(error);
    }
   
  }
  useEffect(() => {
    fetchData();
  },[skip])


  const handleScroll = (e:any) => {
    e.preventDefault();
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;
      console.log(isNearBottom, "isNearBottom");
      console.log(scrollTop,"scrollTop");
      console.log(scrollHeight,"scrollHeight");
      console.log(clientHeight,"clientHeight");
      
      if (isNearBottom) {
        console.log(skip,"Reached bottom");
      //   counter++;

      //   // DO SOMETHING HERE
        setSkip(skip + 10);
      }
    }
  }


  

  useEffect(() => {
    const listInnerElement = listInnerRef.current;

    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", handleScroll);

      // Clean-up
      return () => {
        listInnerElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <>
      
      <div ref={listInnerRef} style={{ height: "200px", overflowY: "scroll" }} >
        <table border={2}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr >
                <td>{item.id}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
        <button onClick={() => setSkip(skip + 10)}>Load More</button>
      </div>
      </div>

    </>
  )
}

export default App

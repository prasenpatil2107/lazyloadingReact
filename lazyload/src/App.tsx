import { useEffect, useRef, useState } from 'react'
import './App.css'

interface Products{
id:number,
title:string,
}
interface Response{
limit:number,
skip:number,
total:number,
}

function App() {
  const [data, setData] = useState<Products[]>([]);
  const [skip, setSkip] = useState(0);
  const listInnerRef = useRef<HTMLDivElement>(null);
  // const [response, setResponse] = useState<Response[]>([]);
  
  const fetchData = async () =>{
    try{
      const getData =    await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
      const response = await getData.json();
      console.log(response,"response")
      // setResponse(response);
      setData((prev) => [...prev, ...response.products]);
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(skip, "skip");
    fetchData();
  },[skip])


  const handleScroll = async (e: any) => {
    e.preventDefault();
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;
  
      if (isNearBottom) {
        try {
          // Fetch new data
          const getData = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
          const response = await getData.json();
          console.log(response, "response");
          // setData((prev) => [...prev, ...response.products]);
  
          // Update skip value
          setSkip(response.limit + 10);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  

  useEffect(() => {
    const listInnerElement = listInnerRef.current;

    if (listInnerElement) {
      console.log(listInnerElement, "listInnerElement");
      listInnerElement.addEventListener("scroll", handleScroll);
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
      <div className='spinner'></div>

    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'
import Posts from './components/Posts';
import Notes from './components/Notes';
import Pagination from './components/Pagination';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(()=>{
    const API_URL = 'https://jsonplaceholder.typicode.com/todos'  
      const fetchData = async () => {
        setIsLoading(true)
      const urlData = await fetch(API_URL);
      const res = await urlData.json();
       setData(res);
       setIsLoading(false);
       if(!res.ok){
        console.log("Failed to fetch data")
       }
     }
     fetchData();
  },[])
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost -  postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)

  function handleSearch(e){
    const value = e.target.value.toLowerCase();
    setSearchText(value);
  }

  const filteredData = currentPosts?.filter((item)=>{
    return item.title.toLowerCase().includes(searchText)
  });


  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <section className='bg-yellow-300 w-screen min-h-screen flex flex-col items-center justify-start gap-10'>
      <header className='w-4/5 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Blogs</h1>
        <input type='search' value={searchText} placeholder="Search" onChange={handleSearch} className='border p-2 rounded-lg outline-none'/>
        <span>&lt; {currentPage}/{data.length/postsPerPage} &gt;</span>
      </header>
        <Posts isLoading={isLoading} posts={filteredData}/>
        <Pagination postsPerPage={postsPerPage} totalPosts={data.length} paginate={handlePaginate}/>
        {/* <Notes /> */}
    </section>
    )
}

export default App

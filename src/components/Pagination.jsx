
const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    for(let i=1;i<=Math.ceil(totalPosts / postsPerPage);i++){
        pageNumbers.push(i);
    }
  return (
    <ul className='flex border-2 items-center justify-between border-black fixed bottom-0'>
        {pageNumbers.map(number => (
            <li key={number} className='px-3 py-1 hover:bg-gray-50 cursor-pointer' onClick={()=> paginate(number)}>
                {number}
            </li>
        ))}
    </ul>
  )
}

export default Pagination

const Posts = ({isLoading, posts}) => {
    if(isLoading) return <div className='flex h-screen items-center justify-center'>Loading...!</div>
  return (
    <ul>
        {posts.map(post =>(
            <li key={post.id} className="border px-2 py-1 border-black font-semibold">
                {post.title}
            </li>
        ))}
    </ul>
  )
}

export default Posts
const SkeletonLoader = () => {
  return (
    <>
   <div className="flex flex-col items-center justify-center h-screen bg-white">
  <div className="flex items-center space-x-1 text-2xl font-mono tracking-widest">
    <span className="text-gray-800">Loading</span>

    <span className="flex space-x-1">
      <span className="animate-bounce delay-0">.</span>
      <span className="animate-bounce delay-150">.</span>
      <span className="animate-bounce delay-300">.</span>
    </span>

    <span className="ml-1 w-[2px] h-7 bg-green-500 animate-blink"></span>
  </div>
</div>
</>

  )
}

export default SkeletonLoader
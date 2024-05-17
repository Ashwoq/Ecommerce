const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen space-x-2 bg-white/70 dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-6 h-6 bg-black rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loader;
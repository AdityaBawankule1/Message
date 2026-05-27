export default function Button({ children, ...props}) {
  return (
    <button
      className="
      bg-purple-700
      hover:bg-purple-800
      text-white
      px-4
      py-2
      rounded-lg
      transition
      "
      {...props}
    >
      {children}
    </button>
  );
}
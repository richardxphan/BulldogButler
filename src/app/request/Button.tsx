const Button = ({ children, type = 'button', ...props }) => {
  return (
    <button
      type={type}
      className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
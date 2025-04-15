const Button = (props) => {
    return (
      <button className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
        type={props.type || 'button'}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  };
  
  export default Button;
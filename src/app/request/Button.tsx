import { useState } from 'react';

const Button = (props) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = (e) => {
    if (props.onClick) {
      props.onClick(e);
    }
    setIsDisabled(true);
  };

  return (
    <button
      className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition disabled:opacity-50"
      type={props.type || 'button'}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

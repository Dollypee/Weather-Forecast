import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Loading = ({ title }) => {
  return (
    <div>
      <div className='mt-6 flex justify-center'>
        <span className='text-center text-white'>{title}</span>
      </div>
      <div className='flex justify-center'>
        <ImSpinner2 className='mt-6 spinner text-center' size={70} color='#FFFFFF' />
      </div>
    </div>
  );
};

export default Loading;
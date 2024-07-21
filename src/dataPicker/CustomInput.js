import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <div className="custom-input" onClick={onClick} ref={ref}>
    <input
      type="text"
      value={value}
      readOnly
      style={{ width: '100%', padding: '10px', paddingRight: '30px', boxSizing: 'border-box' }}
    />
    <FaCalendarAlt style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
  </div>
));

export default CustomInput;

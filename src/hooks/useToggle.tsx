import {useState} from 'react';

export function useToggle(initialValue = false) {
  const [toggle, setToggle] = useState(initialValue);
  const _toggle = () => {
    setToggle(!toggle);
  };
  return {toggle, _toggle};
}

import React, {useEffect, useRef} from 'react';
import {TextField} from 'react-native-material-textfield';

const InputField = React.forwardRef(({value, ...props}, ref) => {
  const rref = useRef(null);

  const setReference = reference => {
    if (ref) {
      ref(reference);
    }
    rref.current = reference;
  };

  useEffect(() => {
    rref.current.setValue(value);
  }, [value]);

  return <TextField ref={setReference} {...props} />;
});

export default InputField;

import { useState, useEffect } from 'react';

export default function UseTheme(key: string, initialState: string) {
  const [state, setState] = useState(() => {
    const storage = localStorage.getItem(key);
    if (storage) {
      return JSON.parse(storage);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, setState]);
  return [state, setState];
}

import React, { useState } from 'react';
type QueryProps = {
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({ setQuery }: QueryProps) {
  const [search, setSearch] = useState('');
  const timer = React.useRef<NodeJS.Timeout>();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    clearTimeout(timer.current);

    setSearch(value);

    timer.current = setTimeout(() => {
      if (setQuery) setQuery(value);
    }, 600);
  };

  return <input value={search} onChange={handleInput} />;
}

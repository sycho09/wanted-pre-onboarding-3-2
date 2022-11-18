import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { FilterKeyword } from './atom';

export default function useDropDown() {
  const [isToggled, setIsToggled] = useState(false);
  const [selectedItem, setSelectedItem] = useRecoilState(FilterKeyword);

  const handleToggle = () => {
    setIsToggled((isToggled) => !isToggled);
  };

  const handleSelectedItem = (item: any) => {
    setSelectedItem(item);
    setIsToggled((isToggled) => !isToggled);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const isInDropDown = target.closest('.dropdown');

      if (!isInDropDown && isToggled) setIsToggled(false);
    };

    if (ref.current) window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [ref.current, isToggled]);

  return { ref, isToggled, selectedItem, handleToggle, handleSelectedItem };
}

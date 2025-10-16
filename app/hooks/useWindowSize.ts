import {useState, useEffect} from 'react';

export interface windowsize{
    width:number | undefined,
    height:number | undefined
}

export const useWindowSize = () =>{
const [windowSize, setWindowSize] = useState<windowsize>({
    width:undefined,
    height:undefined
});

useEffect(() => {
const handleResize =()=>{
    setWindowSize({
        width:window.innerWidth,
        height:window.innerHeight
    })
}
handleResize();

window.addEventListener('resize',handleResize);
  return () => { 
window.removeEventListener('resize',handleResize);
  };
}, [])

return windowSize
}

import { useEffect, useRef } from 'react';
import { getLatestAdverts } from './../../service';

export const useGetAdverts = (setAdverts) => {

    const setAdvertsRef = useRef(setAdverts);

    useEffect(() => {
        // toma la lista de anuncios del backend por axios
        getLatestAdverts().then((adverts) => {
          setAdvertsRef.current(adverts);
        });
      }, []);
    
}

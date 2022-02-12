import React,{useRef,useCallback} from 'react'


export function useInfinitescroll(dis,loader,pageinc){


    const observer = useRef()
    const lastdivref = useCallback(node => {
        if(loader) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                // dis(pageinc())
                pageinc()
            }
        })
      if(node) observer.current.observe(node)
    },[loader])
    

    return [lastdivref]
  

}
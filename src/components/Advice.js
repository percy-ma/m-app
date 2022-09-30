import { useEffect } from 'react'
import axios from 'axios'

export default function Advice() {
    const getAdvice = () => {
        axios.get('https://api.adviceslip.com/advice').then(res => {
            console.log(res.data)
        })
    }

    useEffect(() => {
      getAdvice()
    
      return () => {
        
      }
    }, [])
    

    return (
        <div>

        </div>
    )
}
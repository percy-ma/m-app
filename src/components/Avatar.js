import {useState} from 'react'
import multiavatar from '@multiavatar/multiavatar/esm'
import { Button, Input, Card } from 'antd'
import './Avatar.css'

export default function Avatar() {
    const [name, setName] = useState('')
    const [svg, setSvg] = useState('')
    
    const handleInput = (e) => {
        const value = e.target.value
        setName(value)
    }
    const getAvatar = () => {
        if(name !== '') {
            setSvg(multiavatar(name))
        }
    }
    const clear = () => {
        setName('')
        setSvg('')
    }
    return (
        <>
            <Card>
                <label htmlFor='name'>Name</label>
                <Input type='text' name='name' value={name} onChange={handleInput}/>
                <Button onClick={getAvatar}>Click</Button>
                <Button onClick={clear}>Clear</Button>
                <div className='img' dangerouslySetInnerHTML={{
                    __html: svg
                }}></div>
            </Card>
        </>
    )
}
import{useState} from 'react';

function TestComponent(){
    const [index,setIndex] = useState(0);

    const handleClick =()=>{
        setIndex(index+1);
        console.log(index)
    }


    return(
        <div className="px-4 lg:px-16 py-8 border border-black">
            <h1 className="text-2xl">{0}</h1>
            <Button onclick={handleClick}>Click Me</Button>

        </div>
    )
}

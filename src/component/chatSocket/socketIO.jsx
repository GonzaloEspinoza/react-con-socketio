import React,{useState, useEffect, useRef} from 'react';

import socketIoClient from 'socket.io-client';

const ChatSocketIo = ()=>{
    const myRef = useRef();
    const [names, setNames] = useState(['carlos','edith']);

    useEffect(async()=>{
        // const socket = io('http://localhost:4000');
        const socket= socketIoClient("http://192.168.100.9:4000");
        
        try{

            var data = await fetch('http://192.168.100.9:4000/listnames')
            setNames(await data.json());
            socket.on('[user] addNewUser',data=>{
                console.log('connected to server',data);
                setNames(data);
            })

        }
        catch(e){
            console.log("error al traer los datos inciales")
        }

        
        console.log('init socket')
    },[])

    const sendData=(e)=>{
        e.preventDefault();
        var newName = myRef.current.value;
        console.log(newName)
        var params ={
            'method':'POST',
            'body':JSON.stringify({'name':newName}),
            'headers':{
                'Content-Type':'application/json'
            }
        }
        fetch('http://192.168.100.9:4000/listnames',params)
        .then(data=>{
            console.log(data);
        })
        .catch(err=>{

            console.log(err)
        })
    }

    return (
        <div>
            <form action="false">

                <div className="pt-20 flex flex-col w-full sm:w-80 mx-auto">
                    <label htmlFor="">lista de usuarios</label>
                    <input ref={myRef} className="focus:outline-none my-4 border border-green-400" type="text" name="message" placeholder="Agregar nuevo nombre" autoComplete="off" />
                    <input onClick={(e)=>sendData(e)} className=" bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:shadow-lg" type="button" value="btn" />
                </div>
            </form>
            <hr className="w-full w-full sm:w-80 mx-auto pt-10" />
    
            <div className="pt-10">
                lista de nombre
                 <ol className="list-decimal">
                    {
                    names.map((d,i)=>{
                            return <li  key={i}>{d}</li>
                        })
                    }
                </ol>
            </div>
        </div>
    )

}



export default ChatSocketIo;

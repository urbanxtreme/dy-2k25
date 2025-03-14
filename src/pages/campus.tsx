import { useEffect, useState } from 'react';
import './LogMe.css'
import { getMySin, repentMySins } from '@/Secrets/authKarma';


const Campus = () =>{

    interface Data {
        name?: string;
        REFERAL?:string

    }

    const [data, setData] = useState<Data>({})

    useEffect (()=>{
      setTimeout(()=>{
        getMySin().then((res:any)=>{
          if(res.status == "success"){
              setData(res.data);

          }else{
              location.href="/login"
          }
      })
      },2000)

    },[])

    const copyToClipBoard = (content: string) => {
        navigator.clipboard.writeText(content).then(
          () => {
            console.log("Content copied to clipboard successfully!");
          },
          (err) => {
            console.error("Failed to copy content to clipboard: ", err);
          }
        );
      };
return (<>   <div className="pageWrap">
    <div className="log">
      <header>
       <h1>Campus Ambassador</h1>
        </header>
    <br></br>
            <h1>
                Hello {data.name ? data.name : "Loading Pls Wait"}
            </h1>
        <br></br>
            <p>Your Referral Code</p>
            <p style={{fontSize:"24px"}} onDoubleClick={()=>{
                copyToClipBoard("referral")
            }}> 
                {data.REFERAL?data.REFERAL : "resolving"}
            </p>

<br></br>
                    <div
            className="butto"
            onClick={() => {
              const cll = (v)=>{
                if(v.status == "success"){
                  location.reload()
                }else{
                  alert(v.e)
                }
              }
              repentMySins(cll)
            }}
          >SignOut</div>
        </div>
        </div></>)
}

export default Campus
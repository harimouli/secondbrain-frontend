
import { Button } from "../components/Button"

import { PlusIcon } from "../icons/PlusIcon"

import { ShareIcon } from "../icons/ShareIcon"

import {Card} from "../components/Card"

import { useEffect, useState } from "react"

import { CreateContentModal } from "../components/CreateContentModal"

import { Sidebar } from "../components/Sidebar";

import {useContent} from "../hooks/useContent";





export function Dashboard() {
    const [modelOpen, setModelOpen] = useState(false);
    const {allContent, refreshContent} = useContent();
    const [activeNeuron, setNeuron] = useState("");

    useEffect(() => {
        refreshContent();
    }, [modelOpen, refreshContent])
    
  const isNoContent: number = allContent.length;



  return (
  <div>
    {<Sidebar activeNeuron = {activeNeuron} setNeuron = {setNeuron} />}
    <div className = "p-4 ml-72 min-h-screen bg-slate-100">
        <CreateContentModal open = {modelOpen} onClose = {setModelOpen}/>
       <div className = "flex pt-1 justify-end top-0 right-1 gap-4">
        <Button onClick={() => setModelOpen(true)}  startIcon = {<PlusIcon size = {"lg"}/>} size = "md" variant="primary"  text = {"Add Content"}></Button>
        <Button startIcon = {<ShareIcon size = {"md"}/>} size = "md" variant="secondary" text = {"Share"}></Button>
        </div>

        { isNoContent === 0  ? (

            <div className = "flex  items-center justify-center h-screen text-4xl text-[#5d5e60]">
                 
                    Add cool stuff bhai!
                  
            </div>


        ) : (
               <div className = "flex flex-wrap gap-4 mt-4">
                   {allContent.map(({title, type, link, _id})=> <Card key={_id}  title={title} link={link} type={type} refreshContent={ refreshContent} />)}
              </div>
        )

        }

        
       


    </div>
   </div>
  )
}


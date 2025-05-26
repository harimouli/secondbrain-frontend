


import { Button } from "../components/Button"

import { PlusIcon } from "../icons/PlusIcon"

import { ShareIcon } from "../icons/ShareIcon"

import {Card} from "../components/Card"

import { useState } from "react"

import { CreateContentModal } from "../components/CreateContentModal"
import { Sidebar } from "../components/Sidebar"


export function Dashboard() {
    const [modelOpen, setModelOpen] = useState(false);
  return (
  <div>
    {<Sidebar />}
    <div className = "p-4 ml-72 min-h-screen bg-slate-100">
        <CreateContentModal open = {modelOpen} onClose = {setModelOpen}/>
       <div className = "pt-1 flex justify-end gap-4 position-fixed">
        <Button onClick={() => setModelOpen(true)}  startIcon = {<PlusIcon size = {"lg"}/>} size = "md" variant="primary"  text = {"Add Content"}></Button>
        <Button startIcon = {<ShareIcon size = {"md"}/>} size = "md" variant="secondary" text = {"Share"}></Button>
        </div>
        <div className = "flex gap-4">
             <Card type = "youtube" title="First video" link="https://www.youtube.com/watch?v=JuBBIJ7adjM"/>
             <Card type = "twitter" title="First tweet" link="https://x.com/sniperdotdev/status/1920107393083666702"/>
        </div>
    </div>
   </div>
  )
}


import { Button } from "../components/Button"

import { PlusIcon } from "../icons/PlusIcon"

import { ShareIcon } from "../icons/ShareIcon"

import {Card} from "../components/Card"

import { useEffect, useState } from "react"

import { CreateContentModal } from "../components/CreateContentModal"

import { Sidebar } from "../components/Sidebar";

import {useContent} from "../hooks/useContent";
//import { useNavigate, type NavigateFunction } from "react-router-dom"

import { IoMenuSharp } from "react-icons/io5";


import emptyImage from "../../assets/empty.png"


export function Dashboard() {
    const [modelOpen, setModelOpen] = useState(false);
    const {allContent, refreshContent} = useContent();
    const [activeBar, setActiveBar] = useState("");
   


    const [isSidebarOpen , setSidebar] = useState(true);

    

    useEffect(() => {
        refreshContent();
    }, [modelOpen, refreshContent])
    function lowercaseFirstLetter(str: string) : string {
      if(str === "Dashboard") return "";
     return str.charAt(0).toLowerCase() + str.slice(1);
  } 

    type ContentType = { title: string; type: string; link: string; _id: string };
    let filteredContent: ContentType[] = [];

    const active: string = lowercaseFirstLetter(activeBar);  
    if(active === ""){
      filteredContent = allContent;
    }
    else{
      filteredContent = allContent.filter((eachEle: ContentType) => eachEle.type === active);
    }
    const isNoContent: number = filteredContent.length;
  return (
  <div>

    {isSidebarOpen &&  <Sidebar  isSidebarOpen = {isSidebarOpen} setSidebar={setSidebar} activeBar= {activeBar} setActiveBar = {setActiveBar} />}

   
        <div className = {`p-4 min-h-screen bg-slate-100 ${isSidebarOpen ? "ml-72" : ""}`} >
        


        
        {!isSidebarOpen && 
            <div className = "fixed top-0 left-0 p-5 text-slate-600" onClick={()=> {
                setSidebar(!isSidebarOpen)
            }}>
                    <IoMenuSharp size = "30" />

             </div>   

        }
        <CreateContentModal refreshContent = {refreshContent} open = {modelOpen} onClose = {setModelOpen}/>
       <div className = "flex pt-1 justify-end top-0 right-1 gap-4">
        <Button onClick={() => setModelOpen(true)}  startIcon = {<PlusIcon size = {"lg"}/>} size = "md" variant="primary"  text = {"Add Content"}></Button>
        <Button startIcon = {<ShareIcon size = {"md"}/>} size = "md" variant="secondary" text = {"Share"}></Button>
        </div>

        { isNoContent === 0  ? (

            <div className = "flex  items-center justify-center h-screen text-4xl text-[#5d5e60]">
                 
                  
                  <img src = {emptyImage}  width={800}/>
            </div>


        ) : (
               <div className = "flex flex-wrap gap-3 mt-4">
                   {filteredContent.map(({title, type, link, _id})=> <Card key={_id}  title={title} link={link} type={type as "document" | "youtube" | "twitter" | "linkedin"} refreshContent={ refreshContent} />)}

              </div>
              
        )

        }
      </div>
   </div>
  )
}


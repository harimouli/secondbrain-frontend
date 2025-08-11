
import { Button } from "../components/Button"

import { PlusIcon } from "../icons/PlusIcon"

import { ShareIcon } from "../icons/ShareIcon"

import {Card} from "../components/Card"

import {  useEffect, useState } from "react"

import { CreateContentModal } from "../components/CreateContentModal"

import { Sidebar } from "../components/Sidebar";

import {useContent} from "../hooks/useContent";  
//import { useNavigate, type NavigateFunction } from "react-router-dom"

import { IoMenuSharp } from "react-icons/io5";


import { NoContentView } from "../components/NoContentView"
import { LoadingView } from "../components/LoadingView"
import { ShareModel } from "../components/ShareModel"

export function Dashboard() {
    const [modelOpen, setModelOpen] = useState(false);
    const {allContent, refreshContent, isLoading} = useContent();
    const [activeBar, setActiveBar] = useState("");
    const [openShareModel, setOpenShareModel] = useState(false);


    const [isSidebarOpen , setSidebar] = useState(true);

    useEffect(()=> {
      const handleResize = () => {
        if(window.innerWidth < 768) {
          setSidebar(false);
        } else {
          setSidebar(true);
        }
      }

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      }
    }, [])




    useEffect(() => {
        refreshContent();
    }, [])

    function lowercaseFirstLetter(str: string) : string {
      if(str === "Dashboard") return "";
     return str.charAt(0).toLowerCase() + str.slice(1);
  } 

   

  
  





    type ContentType = { title: string; type: string; link: string; _id: string };
    let filteredContent: ContentType[] = [];

    const active: string = lowercaseFirstLetter(activeBar);  
    const safeAllContent: ContentType[] = Array.isArray(allContent) ? allContent : [];
    if(active === ""){
      filteredContent = safeAllContent;
    }
    else{
      filteredContent = safeAllContent.filter((eachEle: ContentType) => eachEle.type === active);
    }
    const isNoContent: number = filteredContent.length;
  return (



  <div>

    {isSidebarOpen &&  <Sidebar  isSidebarOpen = {isSidebarOpen} setSidebar={setSidebar} activeBar= {activeBar} setActiveBar = {setActiveBar} />}

   
        <div className = {`p-4 min-h-screen bg-slate-200 ${isSidebarOpen ? "ml-72" : ""}`} >
        


        
        {!isSidebarOpen && 
            <div className = "fixed top-0 left-0 p-5 text-slate-600" onClick={()=> {
                setSidebar(!isSidebarOpen)
            }}>
                    <IoMenuSharp size = "30" />

             </div>   

        }
        <ShareModel open = {openShareModel} onClose = {() => setOpenShareModel(false)} />
        <CreateContentModal refreshContent = {refreshContent} open = {modelOpen} onClose = {setModelOpen}/>
       <div className = "flex pt-1 justify-end top-0 right-1 gap-4">
        <Button onClick={() => setModelOpen(true)}  startIcon = {<PlusIcon size = {"lg"}/>} size = "md" variant="primary"  text = {"Add Content"}></Button>
        <Button onClick={() => setOpenShareModel(true)} startIcon = {<ShareIcon size = {"md"}/>} size = "md" variant="secondary" text = {"Share"}></Button>
        </div>
        {isLoading ? (
        
            <LoadingView />
        
        ) : isNoContent === 0 ? (
          <NoContentView />
        ) : (
          <div className="flex flex-wrap gap-3 mt-4">
            {filteredContent.map(({ title, type, link, _id }) => (
              <Card
                key={_id}
                title={title}
                link={link}
                type={type as "document" | "youtube" | "twitter" | "linkedin"}
                refreshContent={refreshContent}
              />
            ))}
          </div>
        )}
        
                   

      </div>
   </div>
  )
}


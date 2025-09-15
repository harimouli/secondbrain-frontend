
import { Button } from "../components/Button"

import {Menu, Plus, Share2} from "lucide-react";





import {Card} from "../components/Card"

import {  useEffect, useState } from "react"

import { CreateContentModal } from "../components/CreateContentModal"

import { Sidebar } from "../components/Sidebar";

import {useContent} from "../hooks/useContent";  

import { IoMenuSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

import { NoContentView } from "../components/NoContentView"

import { LoadingView } from "../components/LoadingView"

import { ShareModel } from "../components/ShareModel"

import { useDevice } from "../contexts/DeviceContext";


export function Dashboard() {
    const [modelOpen, setModelOpen] = useState(false);
    const {allContent, refreshContent, isLoading} = useContent();
    const [activeBar, setActiveBar] = useState("Dashboard");
    const [openShareModel, setOpenShareModel] = useState(false);


    const [isSidebarOpen , setSidebar] = useState(true);
    const {deviceType} = useDevice();
    const isMobile = deviceType === "mobile";
    const isTablet = deviceType === "tablet";
    const isDesktop = deviceType === "desktop"; 
    
    if(isMobile){
      if(isSidebarOpen){
        setSidebar(false);
      }
    }
    useEffect(() => {
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

   
        <div  className = {`min-h-screen bg-white ${isSidebarOpen ? "ml-72" : ""}`} >     
                
       
          {/*menu  when sidebar is closed*/} 
                    {!isSidebarOpen && 
                        <div className = "hidden md:block fixed top-0 left-0 p-5 text-slate-600" onClick={()=> {
                            setSidebar(!isSidebarOpen)
                        }}>
                                <IoMenuSharp size = "30" />

                        </div>   

                    }
                    <ShareModel open = {openShareModel} onClose = {() => setOpenShareModel(false)} />
                    <CreateContentModal refreshContent = {refreshContent} open = {modelOpen} onClose = {setModelOpen}/>
        {/*Header*/}
       <header  className = "hidden md:flex pt-1 md:justify-end top-0 right-1 md:gap-4 md:bg-transparent border-b-1 border-b-slate-300 pb-2 p-4">
        
                {/* Header buttons ADDCONTENT &&  SHARE*/}
                  <div className = {`hidden md:flex md:items-center md:justify-between md:gap-4  md:bg-transparent  ${isSidebarOpen && (isDesktop || isTablet) ? "w-[98%]" : "w-[60%]"}`}>
                          <div className = "md:flex items-center max-w-xl gap-4 w-[60%]">
                              <div className = "flex items-center w-full border rounded-md ">
                                <IoIosSearch size = "25"/>
                                <input type  = "search" placeholder = "Search..." className = "border-none  text-base  rounded-md p-2 w-[95%] md:text-sm  outline-none"/>
                              </div>
                          </div>  

                          

                          <div className = "flex md:flex items-center gap-2 md:gap-6 p-4">
                               <Button onClick={() => setModelOpen(true)}  startIcon = {<Plus size = { "20px"}/>} size = {"md"} variant="primary"  text = {isDesktop || isTablet ?  "Add Link" : ""}></Button>
                               <Button onClick={() => setOpenShareModel(true)} startIcon = {<Share2 size = {"20px"}/>} size = "md" variant="secondary" text = {isDesktop || isTablet ?  "Share" : ""}></Button>
                          </div>


                         
                  </div>
      </header>


      <nav className = "md:hidden flex items-center justify-between p-3  border-b border-b-slate-300">
                   <div>
                      <Menu size = "35" onClick={()=> {
                        setSidebar(!isSidebarOpen)
                      }} className = "text-slate-400"/>
                   </div>
              <div className = "flex items-center gap-3 w-[86%] justify-end">
                  <div className = "relative flex items-center  w-[75%] border border-slate-300 rounded-md px-2 py-2">
                          <IoIosSearch size = "20" className = "text-slate-300" />
                        <input   type  = "search" placeholder = "Search..." className = "border-none  text-base  rounded-md  outline-none"/>
                    </div>
                
                <div className = "flex items-center gap-3 w-[25%] justify-end">
                    <Button onClick={() => setModelOpen(true)}  startIcon = {<Plus size = { "20px"}/>} size = {"sm"} variant="primary"  text = {isDesktop || isTablet ?  "Add Link" : ""}></Button>
                    <Button onClick={() => setOpenShareModel(true)} startIcon = {<Share2 size = {"18px"}/>} size = "sm" variant="secondary" text = {isDesktop || isTablet ?  "Share" : ""}></Button>
                </div>
              </div>
                   
      </nav>  

        {/*Rending the Links of user*/}
        {isLoading ? (   <LoadingView />
        ) : isNoContent === 0 ? (
          <NoContentView />
        ) : (
          <div className="flex flex-col items-center md:flex-wrap md:flex-row md:items-start gap-3 mt-4 p-3">

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


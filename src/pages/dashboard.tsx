
import { Button } from "../components/Button"
import {ButtonVariant, ButtonSize} from "../types/button"
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

import { DeviceType } from "../utils/Globaltypes";

import { type ContentType} from "../utils/Globaltypes";

export function Dashboard() {
    const [modelOpen, setModelOpen] = useState(false);
    const {allContent, refreshContent, isLoading} = useContent();
    const [activeBar, setActiveBar] = useState("Dashboard");
    const [openShareModel, setOpenShareModel] = useState(false);


    const [isSidebarOpen , setSidebar] = useState(false);
    const {deviceType} = useDevice();
    const isMobile = deviceType === DeviceType.Mobile;
    const isTablet = deviceType === DeviceType.Tablet;
    const isDesktop = deviceType === DeviceType.Desktop;
    useEffect(() => {
      if(isMobile) {
      if(isSidebarOpen) {
        setSidebar(false);
      }
    }
      else if( isTablet) {
        if(isSidebarOpen) {
          setSidebar(false);
        }
      }else{
        setSidebar(true);
      }
      refreshContent();
        
    }, [])

    function lowercaseFirstLetter(str: string) : string {
      if(str === "Dashboard") return "";
     return str.charAt(0).toLowerCase() + str.slice(1);
  } 

   

  
  





   
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

   
        <div  className = {`min-h-screen bg-white ${isSidebarOpen && isDesktop ? "ml-72" : "w-[100%]"}`} >     
          {/*menu  when sidebar is closed*/} 
                  
                    <ShareModel open = {openShareModel} onClose = {() => setOpenShareModel(false)} />
                    <CreateContentModal refreshContent = {refreshContent} open = {modelOpen} onClose = {setModelOpen}/>
        {/*Header*/}
       <nav  className = "hidden lg:flex  border-b border-b-slate-300  items-center">

                  <div className = {`flex w-full`}>
                          
                           {!isSidebarOpen && 
                        <div className = "  p-5 text-slate-400" onClick={()=> {
                            setSidebar(!isSidebarOpen)
                        }}>
                                <IoMenuSharp size = "30" />

                        </div>   

                    }
                          <div className = "md:flex items-center max-w-xl gap-4 w-[50%] p-3">
                              <div className = "flex items-center w-full border rounded-md outline-none  border-slate-300 px-1">
                                <IoIosSearch className= "text-slate-400" size = "25"/>
                                <input type  = "search" placeholder = "search your content" className = "border-none  text-base text-slate-600  rounded-md p-2 w-[100%]  md:text-md  outline-none"/>
                              </div>
                          </div>  

                          

                          <div className = "flex md:flex items-center justify-end gap-6 p-4 ml-auto">
                               <Button onClick={() => setModelOpen(true)}  startIcon = {<Plus size = { "20px"}/>} size = {ButtonSize.Medium} variant={ButtonVariant.Primary} text = {isDesktop || isTablet ?  "Add Link" : ""}></Button>
                               <Button onClick={() => setOpenShareModel(true)} startIcon = {<Share2 size = {"20px"}/>} size = {ButtonSize.Medium} variant={ButtonVariant.Secondary} text = {isDesktop || isTablet ?  "Share" : ""}></Button>
                          </div>


                         
                  </div>
      </nav>


      <nav className = " lg:hidden w-full flex items-center justify-between   p-3  border-b border-b-slate-300">
                   <div className = "w-[10%]">
                      <Menu size = "35" onClick={()=> {
                        setSidebar(!isSidebarOpen)
                      }} className = "text-slate-400"/>
                   </div> 
              <div className = "flex items-center gap-3 w-[90%] justify-end">
                  <div className = "relative flex items-center  w-[75%] border border-slate-300 rounded-md px-2 py-2">
                          <IoIosSearch size = "20" className = "text-slate-300" />
                        <input   type  = "search" placeholder = "Search..." className = "border-none  text-base  rounded-md  outline-none"/>
                    </div>
                
                <div className = "flex items-center gap-3 w-[25%] justify-end transition-all ease-in-out duration-1000">
                    <Button onClick={() => setModelOpen(true)}  startIcon = {<Plus size = { "20px"}/>} size = {ButtonSize.Small} variant={ButtonVariant.Primary} text = {isDesktop || isTablet ?  "Add Link" : ""}></Button>
                    <Button onClick={() => setOpenShareModel(true)} startIcon = {<Share2 size = {"18px"}/>} size = {ButtonSize.Small} variant={ButtonVariant.Secondary} text = {isDesktop || isTablet ?  "Share" : ""}></Button>
                    
   
                </div>
              </div>
                   
      </nav>  

        {/*Rending the Links of user*/}
        {isLoading ? (   <LoadingView />
        ) : isNoContent === 0 ? (
          <NoContentView />
        ) : (
          <div className="flex flex-col items-center md:flex-wrap md:flex-row md:items-start gap-3 mt-4 p-3">

            {filteredContent.map(({ title, type, link, _id }: ContentType) => (
              console.log(typeof(_id)),
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
        {/*<embed src="https://100xdevs.com/" className="w-[500px] h-[300px]"/>*/
        }
     <div className = "hidden fixed z-50 bottom-20 right-5 gap-1 ">
          <button className = "text-2xl text-amber-300">Theme</button>
      </div>
      </div>
   </div>
  )
}


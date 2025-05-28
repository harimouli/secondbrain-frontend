import { Input } from "../components/Input"

import {Button} from "../components/Button"

export const Signin = () => {

    return (
        <div className = "h-screen w-screen bg-slate-100 flex justify-center items-center">
                    <div className = " flex flex-col items-center bg-white rounded-md shadow-lg p-4">
                                <Input type = {"text"} placeholder="username" />
                                <Input type = {"password"} placeholder="Password"/>
                                <div className = "flex justify-center pt-4 w-full">
                                        <Button  variant="primary" text = "Signin" size = "md" fullWidth = {true} loading={false}/>
                                </div>
            
                    </div>
        </div>
    )
}
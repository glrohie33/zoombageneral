import {getSession} from "./lib/get-session.js"
export default function handler(req,res){
    const session = getSession(req,res)
    session.isLogin = false;
    res.status(200).json({
        status:true
    })
}

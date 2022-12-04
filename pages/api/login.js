import nextSession from 'next-session'
const getSession = nextSession()
export default async function handler(req, res) {
    let status = false;
    let code = 500
    try{
        const session = await getSession(req, res)
        session.isLogin = true;
        status=true
        code=200
    }catch (e) {
        console.log(e.message);
    }

    res.status(code).json({status});
}

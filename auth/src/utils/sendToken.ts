require("dotenv").config()

const sendToken = async (user: any, status: number, res: any) => {
    try {
        const token = await user.getJwtToken() 
        
        // if (!process.env.COOKIE_EXPIRE) {
        //     throw new Error('Please set the COOKIE_EXPIRE environment variable to a number of seconds');
        // }
        
        const cookieExpire = parseInt(process.env.COOKIE_EXPIRE!, 10)
        
        const option = {
            expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
            httpOnly:true
        }
     return   res.status(status).cookie("token",token,option).json({
            status: "success",
            user,
            token
    })
    } catch (error) {
        console.log(error)
    }
}
export default sendToken
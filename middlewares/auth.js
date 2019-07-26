const jwt=require('jsonwebtoken');
const config=require('config');

module.exports=function (req,res,next) {
    const token=req.header.token;
    if(!token) return res.redirect('/login');

    try {
        const decode=jwt.verify(token,config.get('jwtPrivateKey'));
        req.user=decode;
        next();
    } catch (ex) {
        res.redirect('/login');
    }
}
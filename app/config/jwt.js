const jwt = require('jsonwebtoken');
const secretKey = 'th3r1gy53cr3tpa55w0rd';
module.exports = {
    createToken: function(user) {
        return jwt.sign({user}, secretKey);
    },
    validateToken: function (req, res, next){
       console.log(req);
        const bearerHeader = req.headers["authorization"];
        if(typeof bearerHeader !== 'undefined'){
            const bearerToken = bearerHeader.split(" ")[1];
            jwt.verify(bearerToken, secretKey, (err,data) => {
                if(err)
                    // res.sendStatus(403);
                    // res.json({
                    //     message:token})
                        res.status(403).send({
                            message:"invalid token"
                              
                          });
                else
                    next();
            });
        }
        else{
            res.sendStatus(403)
        }
    }
}

export const roleValidator = (req, res, next) =>{
    const user = req.user;

    conole.log(`roleValidator - ${user}`);
    if(user.role == "admin") next();

    res.status(401).json({message: "User is not authorized to access api"});
}
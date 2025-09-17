export const roleValidator = (req, res, next) =>{
    
    try {
        const user = req.user;
        if(user.role == "admin") next();
        else throw new Error("User is not authorized to access api");
    } catch(err) {
        res.status(401).json({message: err.message});
    }
}
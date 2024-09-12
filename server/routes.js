const express=require("express");
const { registerUser, loginUser, getProfile, logoutUser,  updateUser, deleteUser }=require("./controller");
const router=express.Router();
const cors=require("cors");

router.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/logout", logoutUser);
router.put("/update", updateUser);
router.delete("/delete",deleteUser);

module.exports=router;
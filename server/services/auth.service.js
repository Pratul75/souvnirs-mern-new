const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ResponseTemp = require("../utils/ResponseTemp");
const AdminDetailsModel = require("../models/AdminDetailsModel");

class AuthService {
    // in check details if user or astrologer is already present then we will not send the data to controller we will do diect response to clint from here



    async createNewUser(data, res) {

            // generate password
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(data.password, salt);
            data.password = hashedPassword;

            // store in db
            const newUser = await AdminDetailsModel.create(data);
           
            // await newUser.save();
            if(newUser){

                return new ResponseTemp(true,"successful created admin",false, 200,newUser)      
            }  
            else{
                return new ResponseTemp(false,"not created admin",false, 400)      
            }
    }


    async login(password, loginPerson) {
        if (await bcrypt.compare(password, loginPerson.password)) {


            const token = jwt.sign(
                { id: loginPerson._id, role: loginPerson.role },
                process.env.SECRET_KEY,
                { expiresIn: "2h" }
            );
            loginPerson.password = undefined;
            // userDetails.token = token

            const options = {
                // i am currently removing domain as in postman it is not creating token in cookies
                // domain: process.env.REACT_APP_URL,
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            return new ResponseTemp(true, "login is granted", false, 200, {
                token: token,
                options: options,
                success: true,
                id: loginPerson?._id,
                role: loginPerson?.role,
                name: loginPerson?.name
            });
        } else {
            return new ResponseTemp(false, "password is incorrect", false, 404);
        }
    }

    async changePassword(id, password, oldPassword, newPassword, model) {

        console.log(id, password, oldPassword, newPassword);

        if (await bcrypt.compare(oldPassword, password)) {

            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(newPassword, salt);
            newPassword = hashedPassword;

            const user = await model.findById(id)

            if (user) {

                user.password = newPassword;

                await user.save();


                return new ResponseTemp(true, "password changes", false, 200)
            }
            else {
                return new ResponseTemp(false, "password not changes", false, 400)
            }

        }
        else {
            return new ResponseTemp(false, "password does not match", false, 400)
        }

    }
    async findOneByEmail(email){
        const admindetails = await AdminDetailsModel.findOne({email})
        if(admindetails){
            return new ResponseTemp(true,"successful find admin",false, 200, admindetails)      
        }  
        else{
            return new ResponseTemp(false,"not created admin",false, 400)      
        }
    }
}

module.exports = AuthService;

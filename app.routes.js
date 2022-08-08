const newsModel = require('./DB/model/news')
const userModel = require('./DB/model/user')
const router = require('express').Router()
const bcrypt = require('bcryptjs');
const { signup, updateUser } = require('./validation');
const sendEmail = require('./email');
const dataMethod = ['body', 'params', 'query']
const valiodation = (schema) => {
    return (req, res, next) => {
        const validationArr = []
        dataMethod.forEach(key => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key]);
                if (validationResult.error) {
                    if (validationResult.error.details) {
                        validationArr.push(validationResult.error.details)
                    }
                }
            }
        });
        if (validationArr.length > 0) {
            res.json({ message: 'Validation error  ', vErr: validationArr })
        } else {
            next()
        }
    }
}

router.post("/signup", valiodation(signup), async (req, res) => {
    try {
        const { userName, email, password, age } = req.body
        const checkUser = await userModel.findOne({ email })
        if (checkUser) {
            res.json({ message: "Email exist" })
        } else {
            const hash = await bcrypt.hash(password, 8)
            const user = await userModel.insertMany({
                userName,
                email, password: hash, age //Mahmoud@123 
            })
            const messageURL = req.protocol + '://' + req.headers.host + '/confirmEmail/' + user[0]._id
            const message = `
<h1> check your email to confirm it</h1>
<a href='${messageURL}'>Confirm Now</a>
`
console.log(messageURL);
            sendEmail(`${user[0].email} , hema.awad96@gmail.com`, message)
            res.json({ message: "Done", user })
        }
    } catch (error) {
        res.json({ message: "Catch err", error })
    }

})

router.get("/confirmEmail/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndUpdate(id, { confirmEmail: true }, { new: true })
        res.json({ message: "Done", user })
    } catch (error) {
        res.json({ message: "catch err", error })
    }

})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email , confirmEmail:true })
    console.log(user); // {} = true , null = false
    if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            res.json({ message: "login success", user })

        } else {
            res.json({ message: "email password misMatch" })

        }
    } else {
        res.json({ message: "in-valid  login data" })
    }

})
router.get("/users", async (req, res) => {
    const user = await userModel.find({
        _id: "62ef8837b3ff3dd9f62c06d7"
    })
    res.json({ message: "Done", user })
})


router.delete("/user/:id", async (req, res) => {
    const user = await userModel.findOneAndDelete({ _id: req.params.id })
    res.json({ message: "Done", user })
})


router.patch('/user/:id', valiodation(updateUser), async (req, res) => {
    const { id } = req.params;
    const { name } = req.body
    const user = await userModel.findOneAndUpdate(
        { _id: id }, {
        userName: name
    }, { new: true })
    res.json({ message: "Done", user })
})

router.post("/news", async (req, res) => {
    const { title, desc, userID } = req.body
    const news = await newsModel.insertMany({ title, desc, userID })
    res.json({ message: "Done", news })
})
router.get("/", async (req, res) => {

    const news = await newsModel.find({}).populate([{
        path: "userID",
        select: "-_id userName email"
    }])
    res.json({ message: "Done", news })
})


router.patch("/news/:id", async (req, res) => {
    const { id } = req.params
    const { title, userID } = req.body
    const news = await newsModel.findOneAndUpdate(
        { _id: id, userID },
        { title }, { new: true })
    res.json({ message: "Done", news })
})
router.delete("/news/:id/:userID", async (req, res) => {
    const { id, userID } = req.params
    const news = await newsModel.findOneAndDelete(
        { _id: id, userID })
    res.json({ message: "Done", news })
})

router.get("/new/:id", async (req, res) => {
    const { id } = req.params;
    const news = await newsModel.findOne({ _id: id })
    res.json({ message: "Done", news })
})





module.exports = router
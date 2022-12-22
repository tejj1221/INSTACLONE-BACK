const router = require('express').Router();
const Post = require('../models/post');
const bodyParser = require('body-parser');
const multer = require('multer');
const { storage } = require('./cloudinary');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())


const upload = multer({ storage: storage });

router.post('/',upload.single('PostImage'), async (req, res) => {
    console.log(req.file);
    const { name, location, description } = req.body;
    try {
        let post = await Post.create({
            name: name,
            location: location,
            description: description,
            PostImage: req.file.path,

        })
        res.json({
            status: "Success",
            post
        })
        console.log(post);
    }
    catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err.message
        })

    }
})

router.get('/', async (req, res) => {
    try {
        let posts = await Post.find().sort({ createdAt: -1 });
        res.json({
            status: "Success",
            posts
        })
    }
    catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err.message
        })
    }
})


module.exports = router;

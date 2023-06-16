import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
        const newfilename = Date.now() + file.originalname;
        cb(null, newfilename);
    },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
    const file = req.file;
    // console.log(file);
    // file.filename = "./upload/" + file.filename;
    res.status(200).send(file.filename);
});

export default router;

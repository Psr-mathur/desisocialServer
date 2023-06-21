import express from "express";
import ImageKit from "imagekit";

const router = express.Router();

const imagekit = new ImageKit({
    publicKey: "public_3KUbtWkmwmFb3qiesmlr9FbNpHY=",
    privateKey: "private_vgAvkxRvEvlmtEHtqT3VKm6d6S0=",
    urlEndpoint: "https://ik.imagekit.io/psrmathur/",
});

// var base64Img = "iVBORw0KGgoAAAAN";

// imagekit.upload(
//     {
//         file: base64Img, //required
//         fileName: "my_file_name.jpg", //required
//         tags: ["tag1", "tag2"],
//     },
//     function (error, result) {
//         if (error) console.log(error);
//         else console.log(result);
//     }
// );

router.post("/", (req, res) => {
    const base64 = req.body.base64;
    imagekit.upload(
        {
            file: base64,
            fileName: Date.now(),
        },
        (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        }
    );
});
export default router;

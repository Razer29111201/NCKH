import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/img')
    },
    filename: function (req, file, cb) {
        var today = new Date()
        today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
        console.log(today)

        cb(null, today + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })



export {
    upload
}
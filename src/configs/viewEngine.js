const configViewEngine = (app, express) => {

    app.set('views', './src/views/');
    app.set('view engine', 'ejs');
    app.use(express.static('src/public'))
}

export default configViewEngine;
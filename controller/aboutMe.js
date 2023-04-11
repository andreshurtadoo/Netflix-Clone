// ENVIA LA VISTA A LA PAGINA ABOUT_ME

function information(req, res){
    res
        .status(200)
        .render('aboutMe', {
            name:'Andres Hurtado',
            pais:'Venezuela',
            ci:'29626410'
        })
}

module.exports = { information }
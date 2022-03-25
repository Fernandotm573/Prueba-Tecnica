// funcion de petición
async function postData(url = '', data = {}) {
    const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

const data = {
        User: 'etraining',
        Password: 'explorandoando2020%',
        option: 'municipios'
    }




const main = () => {
    postData('https://www.php.engenius.com.co/DatabaseIE.php', data)
    .then(({data}) => {
        render(data)
    })
    .then(() => {
        const liList = document.getElementById('ul').childNodes
        liList.forEach((li) => {
            li.addEventListener('click', (e) => {
                const data = {
                    User: 'etraining',
                    Password: 'explorandoando2020%',
                    option: 'instituciones',
                    CodMun: e.target.id
                }

                postData('https://www.php.engenius.com.co/DatabaseIE.php', data)
                .then(({data}) => {
                    renInst(data)
                })
            })
        })
    })
}


          //RENDERIZAR INSTITUCIONES
const renInst = (data) => {
    document.getElementById('title').innerHTML = 'Instituciones'
    render(data)

    const liList = document.getElementById('ul').childNodes
    liList.forEach((li) => {
        li.addEventListener('click', (e) => {
            const data = {
                User: 'etraining',
                Password: 'explorandoando2020%',
                option: 'sedes',
                CodInst: e.target.id
            }

            postData('https://www.php.engenius.com.co/DatabaseIE.php', data)
            .then(({data}) => {
                renSedes(data)
            })
        })
    })


}


           //RENDERIZAR SEDES
const renSedes = (data) => {
    document.getElementById('title').innerHTML = 'Sedes'

    render(data)

    const liList = document.getElementById('ul').childNodes
    liList.forEach((li) => {
        li.addEventListener('click', (e) => {
            const data = {
                User: 'etraining',
                Password: 'explorandoando2020%',
                option: 'grupos',
                CodSede: e.target.id
            }

            postData('https://www.php.engenius.com.co/DatabaseIE.php', data)
            .then(({data}) => {
                renGrupos(data)
            })
        })
    })

}


         //RENDERIZAR GRUPOS DE INSTITUCIONES
const renGrupos = (data) => {
    document.getElementById('title').innerHTML = 'Grupos'
    render(data)

    const liList = document.getElementById('ul').childNodes
    liList.forEach((li) => {
        li.addEventListener('click', (e) => {
            const data = {
                User: 'etraining',
                Password: 'explorandoando2020%',
                option: 'infoGrupo',
                IdGrupo: e.target.id
            }

            postData('https://www.php.engenius.com.co/DatabaseIE.php', data)
            .then((data) => {
                renInfoGrupos(data)
            })
        })
    })
}

              //RENDERIZAR INFORMACION DE GRUPO
const renInfoGrupos = ({data}) => {
    const resp = data[0]
    document.getElementById('title').innerHTML = 'Información del grupo'
    const ul = document.getElementById('ul')
    ul.innerHTML = `
        <li>${resp.id}</li>
        <li>${resp.nombre}</li>
        <li>${resp.sede}</li>
        <li>${resp.institución}</li>
        <li>${resp.municipio}</li>
        <li>${resp.numGrupo}</li>
    `
    console.log(resp, data)
}

const render = (data) => {
    const ul = document.getElementById('ul')
    ul.innerHTML = ''
    data.forEach((e) => {
        if(e.dane !== undefined){
            ul.innerHTML = `${ul.innerHTML}<li id=${e.dane}>${e.nombre}</li>`
        }else{
            ul.innerHTML = `${ul.innerHTML}<li id=${e.id}>${e.nombre}</li>`
        }
    })
}


  //BOTON PARA RETROCEDER
main()
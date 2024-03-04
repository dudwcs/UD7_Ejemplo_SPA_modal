

function login(event) {
    //evitamos que se envíe el formulario de forma predefinida (la acción por defecto sería enviar los datos al servidor)
    event.preventDefault();

    let email = document.getElementById('email').value;
    let pwd = document.querySelector("#pwd").value;
    let rol = document.querySelector("#rol").value;


    let login_url = "?controller=Usuario&action=login";

    //preparamos los datos que se enviarían al servidor como si se enviasen  por POST  desde el formulario
    const data = new FormData();
    data.append('email', email);
    data.append('pwd', pwd);
    data.append('rol', rol);

    const request = new Request(base_url + login_url, {
        method: "POST",
        body: data
    });

    fetch(request)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                    //bad request
                } else if (response.status === 400) {
                    console.log('error 400');
                    return false;
                } else {
                    console.log("Something went wrong on API server!");
                    return false;
                }

            })
            .then((response) => {
                console.log(response);
                if (response.userId && response.email) {
                    toggleLoginMain(response.email);
               
                } else {
                    console.error('La autenticación ha fallado');
                }
            }
            )
            .catch((error) => {
                console.error('Ha ocurrido un error en login' + error);
            });


}

/**
 * Muestra la sección main y oculta la sección login o viceversa en función del estado actual de cada una.
 * @param  email email del usuario logueado o cadena vacía. Ambos se mostrarán en la cabecera de la página.
 * Si email es cadena vacía, la sección main se vaciará de contenido html
 */
function toggleLoginMain(email) {



    let main = document.getElementById('main');
    let login = document.getElementById('login');
    let usuarioCabecera = document.getElementById('userHeader');
    let emailHeader = document.getElementById('email_header');

    emailHeader.innerHTML = email;
// https://getbootstrap.com/docs/5.0/utilities/display/
    emailHeader.classList.toggle('d-none');


    login.classList.toggle('d-none');

    main.classList.toggle('d-none');
    usuarioCabecera.classList.toggle('d-none');
    
    if(email.trim()===''){
        //vaciamos el main
        main.innerHTML='';
    }

}


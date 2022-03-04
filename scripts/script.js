let formulario = document.getElementById('formulario');
let citas = [];

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    capturarDatos()    
})

const capturarDatos = ()=>{    
    let nombre = document.getElementById('nombre').value;
    let fecha = document.getElementById('fecha').value;
    let hora = document.getElementById('hora').value;
    let sintomas = document.getElementById('sintomas').value;

    if(nombre == '' || fecha == '' || hora == '' || sintomas == ''){
        Swal.fire('Por favor rellene todos los campos');        
    }else{
        let registrarCita ={
            id: Math.round(Math.random()*(100-1)+1),
            nombre,
            fecha,
            hora,
            sintomas
        }
        console.log(registrarCita);
    
        const key = JSON.parse(localStorage.getItem('citas'))
    
        if(key !== null){
            key.unshift(registrarCita)
            localStorage.setItem('citas', JSON.stringify(key));
        }else{
            citas.unshift(registrarCita);
            localStorage.setItem('citas', JSON.stringify(citas));
        }
        getLocalStorage()
    }
}

let listarCitas = document.getElementById('listarCita');

const getLocalStorage = ()=>{
    listarCitas.innerHTML='';
    let traeraCitaLS = JSON.parse(localStorage.getItem('citas'));

    traeraCitaLS.map(cita=>{
        const {id, nombre, fecha, hora, sintomas} = cita

        listarCitas.innerHTML+=`
        <td>${nombre}</td>
        <td>${fecha}</td>
        <td>${hora}</td>
        <td>${sintomas}</td>
        <td><button id=${id} class="btn btn-lg btn-danger">X</button></td>        
        `;
    })
}

document.addEventListener('DOMContentLoaded', getLocalStorage);

listarCitas.addEventListener('click', e=>{
    const btnDelete = e.target.classList.contains('btn-danger');
    const id = e.target.id;
    
    const local = JSON.parse(localStorage.getItem('citas'))
    const buscar = local.find(data=> data.id === Number(id))
    console.log(buscar);

    if(btnDelete){
        local.forEach((element, index)=>{
            if(element.id === buscar.id){
                local.splice(index, 1);
                localStorage.setItem('citas', JSON.stringify(local));
                getLocalStorage();
            }
        })
    }
})

let btnBuscar = document.getElementById('btnBuscar');
let buscarNombre = document.getElementById('busqueda');

btnBuscar.addEventListener('click', e=>{
    e.preventDefault();

    let input = document.getElementById('inputBuscar').value;
    let data = JSON.parse(localStorage.getItem('citas'));

    if(input.length == 0){
        buscarNombre.innerHTML =``;
        buscarNombre.innerHTML =`
            <div>Por favor escriba el nombre que desea buscar</div>
        `
    }else{
        let filter = data.filter(cita=> cita.nombre.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
    
    buscarNombre.innerHTML =``;

    filter.length === 0 ?
        buscar.nombre.innerHTML += `
            <div>El nombre ${input} no existe</div>
        `
        :
        filter.map(cita=>{
            const {nombre, fecha, hora, sintomas} = cita;

            buscarNombre.innerHTML += `
                <div>
                    <div><h1>${nombre}</h1></div>
                    <div><h3>${fecha}</h3>
                        <h3>${hora}</h3>
                        <h3>${sintomas}</h3>
                    </div>
                </div>
            `
        })
    }
})  

    const btnLimpiar = document.querySelector('.btnLimpiar');

    btnLimpiar.addEventListener('click', e=>{
        formulario.reset()
    })
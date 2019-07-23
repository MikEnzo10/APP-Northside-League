var vm = new Vue({
    el: '#app',
    data: {
        partidos: [],


        gameInfo: true,
        locations: false,
        baseDatos: firebase.database(),
        userName: "",
        userImage: "",
        userID: "",





        objeto: {
            
            login: false,
            chat: false,
            mostrarPartidos: true,
            partido01: false,
            partido02: false,
            partido03: false,
            partido04: false,
            partido05: false,
            partido06: false,
            partido07: false,
            partido08: false,
            partido09: false,
            partido10: false,
            partido11: false,
            partido12: false,
            partido13: false,
            partido14: false,
            partido15: false,
            partido16: false,
            partido17: false,

        }
    },

    methods: {



        llamarFetch() {

            fetch("https://northside-league.firebaseio.com/partidos.json", {

                method: "GET",
                headers: {

                }
            }).then(response => {

                if (response.ok) {

                    return response.json();
                }

                throw new Error(response.statusText);
            }).then(listaPartidos => {


                this.partidos = listaPartidos;
                console.log("partidos:", this.partidos)





            }).catch(function (error) {
                console.log("Request failed: " + error.message);
            });
        },


        cambiarVista(partido) {

            var idPartidos = (Object.keys(this.objeto))


                idPartidos.forEach(key => this.objeto[key] = false)

            this.objeto[partido] = true
        },


        login() {

            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider);


        },

        logout() {
            firebase.auth().signOut().then(function () {
                // Sign-out successful.
            }).catch(function (error) {
                // An error happened.
            });
        },

        enviarMensajes() {
            var mensaje = document.querySelector("#message").value;
            console.log(mensaje);
            this.baseDatos.ref('mensajes').push({
                nombre: this.userName,
                mensaje: mensaje
            });
//            document.getElementById('message').val('');
        },

        recibirMensajes() {
            console.log("Hola");
            this.baseDatos.ref('mensajes').on('child_added', function (data) {
                console.log(data.val().mensaje);
                document.getElementById('mensajesChat').innerHTML += '<img' + data.val().userImage + '>' + '<p class="nombreChat">' + data.val().nombre + '</p>' +  '<p class="estiloMensajesChat sb7">' + data.val().mensaje  + '</p><br>';
            });


        },

        inicializarFire() {
            firebase.auth().onAuthStateChanged(user => {
            
                    if (user && this.userID === user.uid){
                    
                    return;
                        
                    }

                if (user) { //log IN
                    console.log(user)
                    this.userID = user.uid;
                    this.userName = user.displayName;
                    this.userImage = user.photoURL;

                } else { //Logout
                    this.userID = this.userName = this.userImage = null;
                    
                }
            })
            
        },
    },









    created() {
        this.llamarFetch();
    },

    mounted() {
        this.recibirMensajes();
        this.inicializarFire();
    }
})

<template>
    <main>
        <div class="itens">
            <div v-if="changed" class="accept">
                <p>Informações da conta atualizada.</p>
            </div>
            <div class="title">
                <h1 class="tilte_h1">Informações da conta: </h1>
            </div>
            <div class="name">
                <img src="@/assets/usuario.png" alt="">
                <input type="TEXT" maxlength="30" id="usuario_value" placeholder="Seu nome">
            </div>
            <div class="email">
                <img src="@/assets/email.png" alt="">
                <input type="TEXT" maxlength="40" id="email_value" placeholder="Seu email">
            </div>
            <div class="update_class">
                <p v-on:click="updateAccount" class="update">Atualizar</p>
            </div>
        </div>
    </main>
</template>

<script>
import api from '@/services/ServiceAutenticationAPI.js';
export default {
    name: 'Perfil',
    data() {
        return {
            changed: false
        }
    },
    mounted () {
        api.get('/user').then(function(response){
            var email = document.getElementById('email_value');
            var name = document.getElementById('usuario_value');

            email.value = response.data.email;
            name.value = response.data.userName;
        }).catch(function(){
            window.location.href = '/login';
        });
    },
    methods: {
        updateAccount: function() {
            var email = document.getElementById('email_value').value;
            var name = document.getElementById('usuario_value').value;

            const newAccount = JSON.stringify({
                email: email,
                userName: name
            })
            var self = this;
            api.post('/user/change', newAccount, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                }, withCredentials: true
            }).then(function(response) {
                console.log(response)
                self.changed = true;
            }).catch(function(response){
                console.log(response)
            });
        }
    }
}

</script>

<style scoped>
    main {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    h1 {
        color: white;
        padding: 20px 0px;
        text-decoration: none;
        font-size: 30px;
    }
    .name, .email {
        display: flex;
        align-items: center;
    }

    input {
        margin: 0px 10px;
        padding: 20px 10px;
        width: 300px;
        height: 32px;
        border-radius: 8px;
        border: none;
        font-size: 20px;
        text-align: center;
    }
    .update_class, .title {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .update {
        margin: 15px 0px;
        padding: 10px;
        background: #00155E;
        border-radius: 20px;
        transition: 0.2s opacity;
    }

    .update:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    img {
        width: 70px;
    }
    .accept {
        display: flex;
        background-color: #001254;
        padding: 10px;
        border-radius: 20px;
        border-style: solid;
        border-color: #000d3d;
        border-width: 2px;
        align-items: center;
        justify-content: center;
    }
    .accept p {
        display: flex;
        font-size: 20px;
        align-items: center;
    }

</style>
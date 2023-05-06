<template>
    <main>
        <div v-if="warning" class="warning">
            <p>O email ou senha estão incorretos</p>
        </div>
        <div class="email">
            <img src="@/assets/email.png" alt="">
            <input type="TEXT" maxlength="40" id="email_value" placeholder="Informe seu email">
        </div>
        <div class="password">
            <img src="@/assets/password.png" alt="">
            <input type="TEXT" maxlength="20" id="password_value" placeholder="Informe sua senha">
        </div>
        <div>
            <p class="change-password">Esqueci minha senha</p>
        </div>
        <div class="buttons">
            <p class="button-register">Registrar</p>
            <p v-on:click="sendLogin" class="button-login">Logar</p>
        </div>
    </main>
</template>


<script>
import apiAutentication from '@/services/ServiceAPI.js';
export default {
    name: 'Login',
    data() {
        return {
            warning: false
        }
    },
    methods: {
        sendLogin: function() {

            var email = document.getElementById('email_value').value;
            var password = document.getElementById('password_value').value;

            const login = JSON.stringify({
                email: email,
                password: password
            })

            var self = this;

            apiAutentication.post('http://127.0.0.1:8080/user/login', login, { 
                headers: { 
                    'Content-Type': 'application/json',
                }, withCredentials: true
            })
            .then(function(response) {
                localStorage.setItem('token', response.data);
                window.location.href = "/";
                return;
            }).catch(function() {
                self.warning = true;
                return;
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
    .warning p {
        font-size: 15px;
        background-color: red;
        padding: 5px 20px;
        border-radius: 20px;
    }
    .buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .button-login, .button-register {
        margin: 0px 5px;
    }
    .button-login {
        background-color: green;
        border-radius: 20px;
        padding: 10px 15px;
        font-size: 20px;
        transition: 0.8s;
    }
    .button-register {
        background-color: blue;
        border-radius: 20px;
        padding: 10px 15px;
        font-size: 20px;
        transition: 0.8s;
    }
    .button-register:hover, .button-login:hover {
        cursor: pointer;
        opacity: 0.6;
    }
    .email img, .password img {
        width: 40px;
    }
    .email input, .password input {
        margin: 0px 10px;
        padding: 5px 5px;
        width: 300px;
        height: 32px;
        border-radius: 8px;
        border: none;
        font-size: 20px;
        text-align: center;
    }
    input::placeholder {
        text-align: center;
        font-size: 20px;
    }
    input:focus-visible {
        outline: none;
    }
    .email, .password {
        padding: 10px 0px;
        display: flex;
        align-items: center;
    }
    .change-password {
        font-size: 15px;
        padding: 10px 0px;
    }
    .change-password:hover {
        cursor: pointer;
    }
</style>
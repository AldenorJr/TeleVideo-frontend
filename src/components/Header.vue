<template>
    <header>
            <div class="home">
                <a href="/">
                    <img src="@/assets/image.png" alt="img_home" id="logo">
                    <p>TELE VIDEO</p>
                </a>
            </div>

            <div v-if="!menuActive" v-on:click="openMenu" class="mobile">
                <img src="@/assets/mobile_extende.png" alt="mobile">
            </div>

            <div class="menu-overlay" v-if="menuActive"> </div>
            <div class="menu-cellphone" :class="{active:menuActive}">
                <div class="list" :class="{listActive:menuActive}">
                    <ul>
                        <li v-if="menuActive" v-on:click="closeMenu"> <img src="@/assets/close.png" alt=""></li>
                        <li><p>TVs</p></li>
                        <li><p>Consertos</p></li>
                        <li v-on:click="produtosLoading"><p>Produtos</p></li>
                        <li v-if="menuActive" v-on:click="perfilLoading"><a id="mobile-perfil">Área do usuário</a></li>
                    </ul>
                </div>
            </div>

            <div v-on:click="perfilLoading" class="perfil">
                <a id="computer-perfil">Área do usuário</a>
            </div>
    </header>
</template>

<script>
import api from "@/services/ServiceAutenticationAPI.js";
export default {
    name: 'Header',
    data() {
        return {
            menuActive: false
        }
    },
    methods: {
        openMenu: function() {
            if(this.menuActive == false) this.menuActive = true;
        },
        closeMenu: function() {
            if(this.menuActive == true) this.menuActive = false;
        },
        perfilLoading: function() {
            api.get('/user')
            .then(function(){
                window.location.href = "/perfil";
            }).catch(function(){
                 window.location.href = '/login';
            }); 
        },
        produtosLoading: function() {
            api.get('/user')
            .then(function(){
                window.location.href = "/produtos";
            }).catch(function(){
                 window.location.href = '/login';
            }); 
        },
    }
}
</script>

<style scoped>
    .mobile {
        display: none;
    }
    header {
        padding: 0px 30px;
        width: 100%;
        height: 90px;
        background-color: #00155E;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    nav {
        display: flex;
        padding: 5px 50px;
        align-items: center;
        justify-content: space-between;
    }
    ul {
        display: flex;
        justify-content: space-between;
    }
    li {
        padding: 0px 80px;
    }
    .perfil {
        transition: 0.2s opacity;
        transition: 0.2s background-color;
        color: white;
        background-color: #002dd0;
        border-radius: 10px;
        padding: 10px;
    }
    .perfil:hover {
        cursor: pointer;
        opacity: 0.8;
    }
    .home {
        padding: 10px;
    }
    .home a {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .home a p {
        padding: 0px 15px;
    }
    .logo {
        width: 45px;
    }
    @media (max-width: 1150px) {
        .perfil, .list, .menu-cellphone {
            display: none;
        }
        .active {
            display: flex;
        }
        .listActive {
            display: flex;
            align-items: center;
        }
        .listActive ul {
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            padding: 50px;
        }
        .listActive ul li {
            margin: 20px 0px;
        }
        .mobile {
            display: block;
            padding: 0px 30px;
            transition: 0.2s;
        }

        .mobile:hover {
            cursor: pointer;
            opacity: 0.7;
        }
        
        .menu-overlay {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 60%;
            height: 100vh;
            background-color: black;
            opacity: 0.8;
        }
        .active {
            position: fixed;
            top: 0px;
            right: 0px;
            width: 40%;
            height: 100vh;
            background-color: #00155E;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }
    }
</style>
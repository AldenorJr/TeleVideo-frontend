<template>
    <div class="main">
        <div class="menuOverlay" v-if="menuOverlay" v-on:click="produtoClickDisable()"></div>
        <div class="menuProduto" v-if="menuOverlay" :class="{ menuProdutoActive: menuOverlay }">
            <div class="infoOverlay">
                <h1 class="name">Produto</h1>
                <h1>{{ produtoOverlay.name }}</h1>
            </div>
            <div class="imageOverlay">
                <img v-if="produtoOverlay.imagem != null" :src="'data:image/png;base64,' + produtoOverlay.imagem">
                <img v-if="produtoOverlay.imagem == null"
                    src="https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/2496/not-found-image-15383864787lu.jpg">
            </div>
            <div class="infoProdutoOverlay">
                <p class="title">Descrição:</p>
                <p class="descrpt">{{ produtoOverlay.descricao }}</p>
                <p class="title">Observação: </p>
                <p class="descrpt">{{ produtoOverlay.obs }}</p>
                <div class="marca">
                    <p class="title_marca">Marca: </p>
                    <p class="descrpt_marca">{{ produtoOverlay.marca }}</p>
                </div>
            </div>
            <div class="valores">
                <p class="dinheiro">R$ {{ produtoOverlay.preco }}</p>
                <p class="unidades">Unidades {{ produtoOverlay.quantidade }}</p>
                <p class="vendidos">Vendidos {{ produtoOverlay.vendidos }}</p>
            </div>
            <div class="buttons">
                <div v-if="valueNotExist" class="value">
                    <p>Valor não informado</p>
                </div>
                <div class="vender">
                    <p v-on:click="produtoClickVender()">Vender produto: </p>
                    <input type="NUMBER" id="venda" maxlength="100" placeholder="Informe a quantidade">
                </div>
                <div class="adicionar">
                    <p>Adicionar produto: </p>
                    <input type="NUMBER" id="adicionar" maxlength="100" placeholder="Informe a quantidade">
                </div>
                <div class="photo">
                    <p>Adicionar foto:</p>
                    <input type="image" id="photo" placeholder="Envie uma imagem">
                </div>
                <div class="codigo-barras">
                    <p>Codigos de barras</p>
                </div>
            </div>
        </div>
        <div class="produtos">
            <a class="produtosInfo" v-for="(produto, index) in produtos" :key="index"
                v-on:click="produtoClickEnable(produto.id)">
                <p class="unidades">Uninidades {{ produto.quantidade }}</p>
                <img v-if="produto.imagem != null" :src="'data:image/png;base64,' + produto.imagem">
                <img v-if="produto.imagem == null"
                    src="https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/2496/not-found-image-15383864787lu.jpg">
                <div class="info">
                    <p class="name">{{ produto.name }}</p>
                    <div class="info">
                        <p class="preco">R$ {{ produto.preco }}</p>
                    </div>
                </div>
            </a>
        </div>
        <div class="button">
            <p>Pagina:</p>
            <div class="buttons" v-for="(button, index) in buttons" :key="index">
                <p v-on:click="pagine(button)">{{button}}</p>
            </div>
        </div>
    </div>
</template>


<script>
import api from '@/services/ServiceAutenticationAPI.js';
export default {
    name: 'Produtos',
    data() {
        return {
            produtoOverlay: null,
            produtoSelect: 0,
            menuOverlay: false,
            produtos: [],
            nameSearch: null,
            buttons: [],
            valueNotExist: false
        }
    },
    mounted() {
        this.pagine(1);
    },
    methods: {
        pagine: async function (pagine) {
            this.buttons = [];
            this.valueNotExist = false;
            this.produtos = [];
            var produtosTask;
            if(this.nameSearch == null) {
                await api.get('/produtos')
                    .then(function (response) {
                        produtosTask = response.data;
                    }).catch(function () {
                        window.location.href = "/login"
                    });
            }

            if(pagine <= 1) {
                this.buttons.push((pagine + 1))
                this.buttons.push((pagine + 2))
                this.buttons.push((pagine + 3))
            } else if(pagine <= 2) {
                this.buttons.push((pagine - 1))
                this.buttons.push((pagine))
                this.buttons.push((pagine + 1))
                this.buttons.push((pagine + 2))
            } else {
                this.buttons.push((pagine - 2))
                this.buttons.push((pagine - 1))
                this.buttons.push((pagine))
                this.buttons.push((pagine + 1))
                this.buttons.push((pagine + 2))
            }
            console.log(this.buttons)
            let item = 1;
            let skip = 0;
            if (pagine != 1) {
                pagine = pagine - 1;
                skip = (24 * pagine);
            }
            for (let produto of produtosTask) {
                if (skip != 0) {
                    skip--;
                    continue;
                }
                this.produtos.push(produto);
                item++;
                if (item > 24) break;
            }
        },
        produtoClickEnable: function (id) {
            var t = this;
            api.get('/produtos/' + id)
                .then(function (response) {
                    t.produtoOverlay = response.data;
                    t.produtoSelect = id;
                    t.menuOverlay = true;
                }).catch(function (response) {
                    console.log(response)
                });
        },
        produtoClickDisable: function () {
            this.produtoSelect = 0;
            this.menuOverlay = false;
            this.valueNotExist = false;
        },
        produtoClickVender: function () {
            var t = this;
            var value = document.getElementById('venda').value;
            if(value == 0 || value == null) {
                this.valueNotExist = true;
                return;
            }
            this.produtoOverlay.quantidade -= value;
            this.produtoOverlay.vendidos = (this.produtoOverlay.vendidos+value);
            api.put('/produtos', this.produtoOverlay, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                }, withCredentials: true
            })
                .then(function() {
                    window.location.reload();
                })
        },
    }
}

</script>


<style scoped>
    .main {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .button {
        display: flex;
        align-items: center;
    }

    .button p {
        font-size: 30px;
    }

    .buttons p {
        padding: 7px 10px;
        font-size: 30px;
        background: rgb(37, 37, 37);
        box-shadow: 0 -1px 30px 0 rgb(0, 0, 0), 0 2px 3px 0 rgb(14, 10, 10);
        border-radius: 10px;
        transition: 0.2s opacity;
    }

    .buttons p:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    .produtos {
        margin: 20px 0px;
        padding: 0px 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .produtosInfo {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin: 20px 20px;
        width: 240px;
        height: 250px;
    }

    .produtosInfo:hover {
        box-shadow: 0 -1px 30px 0 rgb(0, 0, 0), 0 2px 3px 0 rgb(14, 10, 10)
    }

    .preco {
        color: green;
    }

    img {
        width: 200px;
        height: 150px;
    }

    .menuOverlay {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100vh;
        background-color: black;
        opacity: 0.4;
    }

    .infoOverlay {
        display: flex;
        justify-content: center;
        align-items: center;
        color: green;
        font-size: 30px;
        padding: 10px 0px;
    }

    .infoProdutoOverlay {
        display: flex;
        flex-direction: column;
        padding: 0px 20px;
    }

    .infoProdutoOverlay .title {
        display: flex;
        padding: 10px 0px;
        font-size: 30px;
        align-items: center;
        justify-content: center;
    }

    .infoProdutoOverlay .title_marca {
        display: flex;
        padding: 10px 10px;
        font-size: 30px;
        align-items: center;
        justify-content: center;
    }

    .infoProdutoOverlay .descrpt_marca {
        display: flex;
        font-size: 30px;
        justify-content: center;
        align-items: center;
        color: aqua;
    }

    .marca {
        display: flex;
        justify-content: center;
        padding: 10px;
    }

    .infoProdutoOverlay .descrpt {
        font-size: 20px;
        padding: 20px 20px;
        height: 120px;
        background: rgb(37, 37, 37);
        box-shadow: 0 -1px 30px 0 rgb(0, 0, 0), 0 2px 3px 0 rgb(14, 10, 10);
        border-radius: 10px;
    }

    .valores {
        display: flex;
        justify-content: space-around;
        padding: 10px 10px;
        margin: 0px 20px;
        background: rgb(37, 37, 37);
        box-shadow: 0 -1px 30px 0 rgb(0, 0, 0), 0 2px 3px 0 rgb(14, 10, 10);
        border-radius: 10px;
    }
    .buttons {
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
    }
    .vender, .adicionar, .codigo-barras {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 10px 0px;
    }
    .vender p {
        background-color: rgb(0, 51, 0);
        color: #00ff11;
    }
    .adicionar p {
        background-color: rgb(0, 2, 51);
        color: rgb(0, 8, 255);
    }
    .codigo-barras p {
        background-color: rgb(134, 78, 0);
    }
    .vender p, .adicionar p, .codigo-barras p {
        padding: 5px 8px;
        border-radius: 10px;
        transition: 0.2s opacity;
    }
    .vender p:hover, .adicionar p:hover, .codigo-barras p:hover {
        cursor: pointer;
        opacity: 0.8;
    }
    input {
        background-color: rgb(37, 37, 37);
        color: white;
        border-radius: 10px;
        border: 2px solid rgb(149, 149, 149);
        padding: 10px 0px;
        font-size: 20px;
        display: flex;
        text-align: center;
        text-decoration-color: white;
    }
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input:focus::placeholder {
        color: transparent;
    }
    .value {
        display: flex;
        justify-content: center;
    }
    .value p {
        margin: 10px 0px;
        background-color: red;
        font-size: 20px;
        padding: 5px 20px;
        border-radius: 20px;
        border: 2px solid rgb(248, 80, 80);
    }

    input::placeholder {
        color: rgb(255, 255, 255);
    }

    .valores .dinheiro {
        color: green;
    }

    .unidades {
        color: white;
    }

    .vendidos {
        color: red;
    }

    .infoOverlay h1 {
        padding: 0px 10px;
    }

    .imageOverlay {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .imageOverlay img {
        width: 320px;
        height: 160px;
        box-shadow: 0 -1px 30px 0 rgb(0, 0, 0), 0 2px 3px 0 rgb(14, 10, 10);
    }

    .menuProdutoActive {
        position: fixed;
        top: 15vh;
        width: 40%;
        height: 75vh;
        background: rgb(19, 19, 19);
        box-shadow: 0 -1px 30px 0 rgb(0, 0, 0), 0 2px 3px 0 rgb(14, 10, 10);
        color: white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .produtosInfo:hover {
        box-shadow: 0 -1px 30px 0 rgb(0, 0, 0), 0 2px 3px 0 rgb(14, 10, 10)
    }
</style>
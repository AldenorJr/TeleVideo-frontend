<template>
    <main>
        <p class="p1">ELETRÔNICA TELE VIDEO</p>
        <p class="p2">Sistema desenvolvido por Aldenor Jr</p>
    </main>
</template>

<script>
export default {
    name: "Home"
}

</script>

<style scoped>
    main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .p1 {
        font-size: 40px;
    }

    @media (max-width: 1150px) {
        .p1 {
            font-size: 35px;
        }
    }

</style>
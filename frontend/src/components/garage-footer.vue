<template>
    <div class="footer">
        <router-link to="/">&#127968;</router-link>
        <router-link to="/chat">&#9993;</router-link>
        <router-link to="/">&plus;</router-link>
        <router-link to="/">❤</router-link>
        <router-link to="/">&#9786;</router-link>
    </div>
</template>

<script>
export default {
    name: 'garage-footer'
}
</script>

<style lang="scss" scoped>
.footer{
    display:flex;
    background-color: #666666;
    color: #e8e8e8;
    justify-content: space-around;
    align-items: center;
}
</style>

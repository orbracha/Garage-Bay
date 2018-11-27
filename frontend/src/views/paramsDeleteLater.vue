<template>
    <div>
        <ul>
            <li v-for="item in items" :key="item._id" @click="itemClicked(item._id)">{{item}}</li>
        </ul>
        
    </div>
</template>

<script>
export default {
    name:'forParams',
    created(){
        this.$store.dispatch({type:'loadItems'})
    },
    methods:{
        itemClicked(itemId){
            this.$router.push(`/item/${itemId}`)
            
        }
    },
    computed:{
        items(){
            return this.$store.getters.getItems
        }
    },
}
</script>

<style>

</style>

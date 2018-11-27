<template>
    <section>
        <ul class="home-list">
            <item-preview v-for="item in items" :item="item" :key="item._id"/>
        </ul>
    </section>
</template>

<script>
import itemPreview from '@/components/item-preview.vue';
import itemService from '@/services/item-service.js';
export default {
      props: {
        items: Array
    },
  
    components: {
        itemPreview,
        itemService
    },
    created(){
        console.log('inside  item list', this.items);   
    },

}

</script>

<style lang="scss" scoped>
ul{
    padding: 0;
    max-width: 100%;
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fill , minmax(300px, 1fr));
}
</style>


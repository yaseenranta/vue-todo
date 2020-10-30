<template>
    <div> {{remaining}} Item left</div>
</template>


<script>
export default {
    name : 'remaining',
    methods : {
        
    },
    computed: {
        remaining(){
            return this.$store.getters.remaining;
        }
    },
}
</script>
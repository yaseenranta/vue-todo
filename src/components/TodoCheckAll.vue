<template>
    <div>
    <label>
        <input type="checkbox" :checked="!anyRemaining" @change="checkAll()"/>Check All  
    </label>
    </div>
</template>


<script>
export default {
    name : 'TodoCheckAll',
    methods : {
        checkAll(){
            this.$store.commit('checkAll',event.target.checked)
        }
    },
    computed: {
        anyRemaining(){
            return this.$store.getters.anyRemaining;
        }
    },
}
</script>
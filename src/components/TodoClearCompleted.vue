<template>
    <div>
        <button v-if="showClearCompleted" @click="clearCompleted" >Clear Completed</button>            
    </div>
</template>
<script>
export default {
    name  : 'todos-clear-completed',
    methods: {
        clearCompleted(){

            this.$store.commit('clearCompleted')
            // eventBus.$emit('clearCompleted')       
        }
    },
    computed: {
        showClearCompleted(){
            return this.$store.getters.showClearCompleted;
        }
    },
}
</script>
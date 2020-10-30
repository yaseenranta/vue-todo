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
            this.$store.dispatch('clearCompleted')
        }
    },
    computed: {
        showClearCompleted(){
            return this.$store.getters.showClearCompleted;
        }
    },
}
</script>
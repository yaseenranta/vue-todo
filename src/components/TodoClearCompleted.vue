<template>
    <div>
        <button v-if="showClearCompleted" @click="clearCompleted" >Clear Completed</button>            
    </div>
</template>
<script>
export default {
    name  : 'todos-clear-completed',
    props : ['showClearCompleted'],
    methods: {
        clearCompleted(){
            eventBus.$emit('clearCompleted')       
        }
    },
}
</script>
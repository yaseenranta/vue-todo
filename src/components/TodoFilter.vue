<template>
<div>
    <button @click="filterTodos('all')" :class="{active :filter == 'all'}">All</button>
    <button @click="filterTodos('active')" :class="{active :filter == 'active'}">Active</button>
    <button @click="filterTodos('completed')" :class="{active :filter == 'completed'}">Completed</button>
</div>
</template>

<script>
export default {
    name : 'TodoFilter',
    data(){
        return{
            filter : 'all'
        }
    },
    methods : {

        filterTodos(filter){
           this.filter = filter
            eventBus.$emit('filterTodos',filter)
        }
    }
}
</script>
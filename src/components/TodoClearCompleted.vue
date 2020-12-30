<template>
    <div>
        <button v-if="showClearCompleted" @click="clearCompleted" >Clear Completed</button>            
    </div>
</template>
<script>
 import {mapGetters} from 'vuex'
export default {
    name  : 'todos-clear-completed',
    methods: {
        clearCompleted(){
            this.$store.dispatch('todo/clearCompleted')
        }
    },
    computed: {
        ...mapGetters( 'todo',{
           'showClearCompleted' :  'showClearCompleted'
        })

    },
}
</script>
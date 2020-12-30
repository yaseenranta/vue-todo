<template>
    <div> {{remaining}} Item left</div>
</template>


<script>
import {mapGetters} from 'vuex'
export default {
    name : 'remaining',
    methods : {
        
    },
    computed: {

        ...mapGetters('todo',{
            'remaining' : 'remaining'
        })
    },
}
</script>
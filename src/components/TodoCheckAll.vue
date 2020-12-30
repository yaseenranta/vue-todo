<template>
    <div>
    <label>
        <input type="checkbox" :checked="!anyRemaining" @change="checkAll()"/>Check All  
    </label>
    </div>
</template>


<script>
 import {mapGetters} from 'vuex'
export default {
    name : 'TodoCheckAll',
    methods : {
        checkAll(){
            this.$store.dispatch('todo/checkAll',event.target.checked)
        }
    },
    computed: {
        ...mapGetters('todo',{
          'anyRemaining'  : 'anyRemaining'  
        })
        
    },
}
</script>
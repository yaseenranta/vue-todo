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
    props : ['anyRemaining'],
    methods : {
        checkAll(){
            eventBus.$emit('checkAll');
        }
    }
}
</script>
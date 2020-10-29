<template>
    <div> {{remaining}} Item left</div>
</template>


<script>
export default {
    name : 'remaining',
    props : ['remaining'],
    methods : {
        pluralize(){
            eventBus.$emit('pluralize',this.index);
        }
    }
}
</script>
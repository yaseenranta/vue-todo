<template>
    <span>
        <button @click="pluralize()">Pluralize</button>
    </span>
</template>


<script>
export default {
    name : 'pluralize',
    props : ['index'],
    methods : {
        pluralize(){
            eventBus.$emit('pluralize',this.index);
        }
    }
}
</script>
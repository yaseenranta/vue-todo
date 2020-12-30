<template>
    <span>
        <button @click="pluralize">Pluralize</button>
    </span>
</template>


<script>
export default {
    name : 'pluralize',
    props : ['id'],
    methods : {
        pluralize(){
            this.$store.dispatch('todo/handlePluralize',this.id)
        }
    }
}
</script>
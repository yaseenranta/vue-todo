<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png" class="logo">
    <TodoList />
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'Home',
  components: {
    TodoList
  }
}
</script>

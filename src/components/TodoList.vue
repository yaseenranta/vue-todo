<template>
  <div class="todolist ">
      <input type="text" class="todo-input" @keyup.enter="addNewTodo" v-model="newtodo">
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
          <todoItem  v-for="(todo,index) in filteredtodos" 
            :key="todo.id" :index="index" :todo="todo" :anyRemaining="!anyRemaining"></todoItem>        
        </transition-group>      

      <div class="extra-container">
        <TodoCheckAll></TodoCheckAll>
         <Remaining ></Remaining>
      </div>

      <div class="extra-container">
        <TodoFilter></TodoFilter>
        <div>
        <transition name="fade">
          <TodoClearCompleted></TodoClearCompleted>
        </transition>
        </div>
      </div>
      
  </div>
</template>

<script>
import todoItem from '@/components/TodoItem.vue'
import Remaining from '@/components/Remaining.vue'
import TodoCheckAll from '@/components/TodoCheckAll.vue'
import TodoFilter from '@/components/TodoFilter.vue'
import TodoClearCompleted from '@/components/TodoClearCompleted.vue'


export default {
  name: 'TodoList',
  components : {
    todoItem,
    Remaining,
    TodoCheckAll,
    TodoFilter,
    TodoClearCompleted,
  },
  data : function(){
      return {
         titleCachebefore : null, 
         newtodo : '',                     
      }
  },
  methods : {
      addNewTodo(){
          let todoId = this.$store.state.todos.length;
          if(this.newtodo.trim().length == 0){
              return;
          }
          this.$store.commit('addNewTodo' ,{
              id : todoId + 1,
              title : this.newtodo,
              isCompleted : false,
              isEditing : false
          })

          this.newtodo = '';
      }
                  
  },
  computed : {
  
    filteredtodos(){
      return this.$store.getters.filteredtodos;
    },
    anyRemaining(){
        return this.$store.getters.anyRemaining;
      }    
  }
}
</script>

<style lang="scss"> 
    

@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    &:focus {
      outline: 0;
    }
  }
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }
  .todo-item-left { // later
    display: flex;
    align-items: center;
  }
  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }
  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; //override defaults
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    &:focus {
      outline: none;
    }
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }
  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    border:1px solid #ccc;
    margin-left: 2px;
    &:hover {
      background: lightgreen;
    }
    &:focus {
      outline: none;
    }
  }
  .active {
    background: lightgreen;
  }
  // CSS Transitions
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>


<template>
  <div class="todolist ">
      <input type="text" class="todo-input" @keyup.enter="addNewTodo" v-model="newtodo">
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
          <todoItem  v-for="(todo,index) in filteredtodos" 
            :key="todo.id" :index="index" :todo="todo" :anyRemaining="!anyRemaining"
            ></todoItem>        
        </transition-group>      

      <div class="extra-container">
        <TodoCheckAll :anyRemaining="anyRemaining"></TodoCheckAll>
         <Remaining :remaining="remaining"></Remaining>
      </div>

      <div class="extra-container">
        <TodoFilter></TodoFilter>
        <div>
        <transition name="fade">
          <TodoClearCompleted :showClearCompleted="showClearCompleted"></TodoClearCompleted>
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
  created() {
    eventBus.$on('doneEdit', (data) => this.doneEdit(data))
    eventBus.$on('removeItem', (index) => this.removeTodo(index))
    eventBus.$on('pluralize',(index) => this.handlePluralize(index))
    eventBus.$on('checkAll',this.checkAll);
    eventBus.$on('filterTodos', (filter) => this.filter = filter)
    eventBus.$on('clearCompleted',this.clearCompleted)       
  },
  beforeDestroy() {
    eventBus.$off('doneEdit', (data) => this.doneEdit(data))
    eventBus.$off('removeItem', (index) => this.removeTodo(index))
    eventBus.$off('pluralize',(index) => this.handlePluralize(index))
    eventBus.$off('checkAll',this.checkAll);
    eventBus.$off('filterTodos', (filter) => this.filter = filter)
    eventBus.$off('clearCompleted',this.clearCompleted)       
  },
  data : function(){
      return {
         titleCachebefore : null, 
         newtodo : '',
         filter : 'all',
         todos : [
             {
             id          : 1,
             title        : "Todo Item 1",
             isCompleted : false,
             isEditing   : false,
             },
             {
             id          : 2,
             title        : "Todo Item 2",
             isCompleted : false,
             isEditing   : false
             }
         ],            
      }
  },
  methods : {
      addNewTodo(){
          let todoId = this.todos.length;
          if(this.newtodo.trim().length == 0){
              return;
          }

          this.todos.push({
              id : todoId + 1,
              title : this.newtodo,
              isCompleted : false,
              isEditing : false
          })

          this.newtodo = '';
      },
      doneEdit(data){

          // this.todos[data.index] = data.todo
          this.todos.splice(data.index,1,data.todo)
      },
      removeTodo(index){
          this.todos.splice(index,1)
      },
      checkAll(){
        this.todos.forEach(todo => {
          todo.isCompleted = event.target.checked
        });
      },
      clearCompleted(){
        this.todos = this.todos.filter(todo => !todo.isCompleted);
      },
      handlePluralize (index){
        let todo = this.todos[index]
          todo.title = todo.title + 's';  
          eventBus.$emit('doneEdit',{
            index : index,
            todo : todo
          }) 
      }            
  },
  computed : {
    remaining(){
        return this.todos.filter(todo => !todo.isCompleted).length;
    },
    anyRemaining(){
      if(this.todos.length == 0){
        return true;
      }
       return this.remaining != 0;
    },
    filteredtodos(){
      if (this.filter == 'all') {
        return this.todos;
      }else if(this.filter == 'active'){
        return this.todos.filter(todo => !todo.isCompleted);

      }else if(this.filter == 'completed'){
        return this.todos.filter(todo => todo.isCompleted);

      }
      return this.todos;
    },
    showClearCompleted(){
      return this.todos.filter(todo => todo.isCompleted).length > 0;
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


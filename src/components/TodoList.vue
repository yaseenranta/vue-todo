<template>
  <div class="todolist ">
      <input type="text" class="todo-input" @keyup.enter="addNewTodo" v-model="newtodo">
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
          <div class="todo-item" v-for="(todo,index) in filteredtodos" :key="todo.id">
              <div class="todo-item-left">
                  <input type="checkbox" v-model="todo.isCompleted"/>
                  <div v-if="!todo.isEditing" class="todo-item-label" :class="{completed : todo.isCompleted}" @dblclick="editTodo(todo)" >
                      {{todo.title}}
                  </div>
                  <input v-else type="text" class="todo-item-edit" 
                  v-model="todo.title" 
                  v-on:blur="doneEdit(todo)" @keyup.esc="cancelTodo(todo)" 
                  @keyup.enter="doneEdit(todo)" v-focus>
                  
              </div>
              <div class="remove-item" @click="removeTodo(index)">
                  &times
              </div>
          </div>        
        </transition-group>      

      <div class="extra-container">
        <div><label>
            <input type="checkbox" :checked="!anyRemaining" @change="checkAll()"/>Check All  
          </label></div>
        <div> {{remaining}} Item left</div>
      </div>
      <div class="extra-container">
        <div>
          <button @click="filter = 'all'" :class="{active :filter == 'all'}">All</button>
          <button @click="filter = 'active'" :class="{active :filter == 'active'}">Active</button>
          <button @click="filter = 'completed'" :class="{active :filter == 'completed'}">Completed</button>
        </div>
        <div>
            <transition name="fade">
              <button v-if="showClearCompleted" @click="clearCompleted()">Clear Completed</button>            
            </transition>
        </div>
      </div>
      
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    msg: String
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
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
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
      editTodo(todo,index){
          todo.isEditing =true;
        //   this.todos[index].isEditing = true;
          this.titleCachebefore = todo.title;

      },
      doneEdit(todo){
          if(todo.title.trim() == ''){
             todo.title = this.titleCachebefore;
          }
          todo.isEditing = false;
          this.titleCachebefore = '';    
          console.log('blur')
      },
      cancelTodo(todo){
          todo.isEditing = false;
          todo.title = this.titleCachebefore;
          
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


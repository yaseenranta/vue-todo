
const state = () => ({
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
    ]
})

const mutations = {
    addNewTodo(state,todo){

      state.todos.push(todo)
    },
    doneEdit(state,data){

      let index = state.todos.findIndex(item => item.id == data.id)
      state.todos.splice(index,1,data)
      
    },
    removeTodo(state,id){
        let index = state.todos.findIndex(item => item.id == id)
        state.todos.splice(index,1)
    },
    checkAll(state,checked){
      state.todos.forEach(todo => { todo.isCompleted = checked });
    },
    clearCompleted(state){
      state.todos = state.todos.filter(todo => !todo.isCompleted);
    },
    filteredtodos(state,filter){
       state.filter = filter 
    },
    handlePluralize (state,id){
      let index = state.todos.findIndex(item => item.id == id)
      let todo = state.todos[index]  
      todo.title = todo.title + 's';  
        eventBus.$emit('doneEdit',{
          index : index,
          todo : todo
        }) 
    }
}

const getters = {
    
    remaining(state){
      return state.todos.filter(todo => !todo.isCompleted).length;
    },
    
    anyRemaining(state,getters){
      if(state.todos.length == 0){
        return true;
      }
      return getters.remaining != 0;
    },
    
    filteredtodos(state){
      if (state.filter == 'all') {
        return state.todos;
      }else if(state.filter == 'active'){
        return state.todos.filter(todo => !todo.isCompleted);

      }else if(state.filter == 'completed'){
        return state.todos.filter(todo => todo.isCompleted);

      }
      return state.todos;
    },
    
    showClearCompleted(state){
      return state.todos.filter(todo => todo.isCompleted).length > 0;
    }

}


const actions = {
    addNewTodo(context,todo){

      setTimeout(() => {
        context.commit('addNewTodo',todo)        
      }, 1000);
      
    },
    doneEdit(context,data){

      setTimeout(() => {
        context.commit('doneEdit',data)      
      }, 1000);

    },
    removeTodo(context,id){
      
      setTimeout(() => {
        context.commit('removeTodo',id)      
      }, 1000);

    },
    checkAll(context,checked){

      setTimeout(() => {
        context.commit('checkAll',checked)
      }, 1000);

    },
    clearCompleted(context){

      setTimeout(() => {
        context.commit('clearCompleted')   
      }, 1000);   

    },
    filteredtodos(context,filter){
      
      setTimeout(() => {
        context.commit('filteredtodos',filter)        
      }, 1000);

    },
    handlePluralize (context,id){
      
      setTimeout(() => {
        context.commit('handlePluralize',id)            
      }, 1000);

    }
  }

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
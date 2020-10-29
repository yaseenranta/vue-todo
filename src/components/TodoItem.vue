<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="isCompleted" @change="doneEdit"/>
            <div v-if="!isEditing" class="todo-item-label" :class="{completed : isCompleted}" @dblclick="editTodo" >
                {{title}}
            </div>
            <input v-else type="text" class="todo-item-edit" 
            v-model="title" 
            v-on:blur="doneEdit" @keyup.esc="cancelTodo" 
            @keyup.enter="doneEdit" v-focus>
            
        </div>
        <div class="remove-item" @click="removeTodo(index)">
            &times
        </div>
    </div>   
</template>

<script>
export default {
    name : 'todo-item',
    props : ['todo','index','anyRemaining'],
    data (){
        return {
            titleCachebefore : null,
             id          : null,
             title        :null,
             isCompleted : null,
             isEditing   : null,
             }
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },
    watch : {
        anyRemaining(){
            if(this.anyRemaining){
                this.isCompleted = true;
            }else{
                this.isCompleted = this.todo.isCompleted;
            }
        }
    },
    created() {
        this.id = this.todo.id
        this.title = this.todo.title
        this.isCompleted = this.todo.isCompleted
        this.isEditing = this.todo.isEditing
    },
    methods: {
        removeTodo(index){
            this.$emit('removeItem',index)
        },
        editTodo(){
            this.isEditing = true;       
            this.titleCachebefore = this.title;
        },
        doneEdit(){
            if(this.title.trim() == ''){
                this.title = this.titleCachebefore;
            }
            this.isEditing = false;
            this.titleCachebefore = '';    

            this.$emit('doneEdit',{
            index : this.index,
            todo  : {
              id          : this.id,
              title       : this.title,
              isCompleted : this.isCompleted,
              isEditing   : this.isEditing,
            }        
        })
        },
        cancelTodo(){
            this.isEditing = false;
            this.title = this.titleCachebefore;            
        }    
    },
    computed : {

    }
}
</script>
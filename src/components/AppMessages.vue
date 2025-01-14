<script>
import { useMessagesStore } from '../store/messages.js';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'AppMessages',
    computed: {
        ...mapState(useMessagesStore, ['messages'])
    },
    methods: {
        ...mapActions(useMessagesStore, ['deleteMessageAction', 'pushMessageAction', 'clearMessageAction']),
        removeMsg(index) {
            this.deleteMessageAction(index);
        },
        autoRemoveMsg(index, type) {
            if (type === 'info' || type === 'success') {
                setTimeout(() => {
                    this.removeMsg(index);
                }, 5000);
            }
        }
    },
    // He implementado el borrado automático de mensajes. Dejo comentado el código siguiente
    // puesto que en clase no se ha explicado cómo hacerlo. 😊
    watch: {
        // Observa cambios en la propiedad 'messages'
        messages: {
            // Define un manejador que se ejecuta cuando 'messages' cambia
            handler(newMessages) {
                // Itera sobre cada mensaje nuevo en 'newMessages'
                newMessages.forEach((msg, index) => {
                    // Llama a la función 'autoRemoveMsg' pasando el índice y el tipo de mensaje
                    this.autoRemoveMsg(index, msg.type);
                });
            },
            // Indica que Vue debe observar cambios profundos en 'messages'
            deep: true
        }
    }
}
</script>

<template>
    <div id="msgContainer">
        <div v-for="(msg, index) in messages" :key="index" :class="['msg', msg.type]" @dblclick="removeMsg(index)">
            <p>{{ msg.message }}</p>
            <button @click="removeMsg(index)">x</button>
        </div>
    </div>
</template>

<style scoped>
#msgContainer {
    position: sticky;
    top: 60px;
    right: 10px;
    z-index: 1000;
}

#msgContainer:empty {
    display: none;
}

.msg {
    background-color: #333;
    color: white;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.error {
    border: 2px solid rgba(255, 0, 0, 0.8);
}

.info {
    border: 2px solid rgba(0, 0, 255, 0.8);
}

.success {
    border: 2px solid rgba(0, 128, 0, 0.8);
}
</style>
import { reactive } from 'vue'

export const store = {
  debug: true,
  state: reactive({
    messages: [],
  }),
  pushMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with ', newValue)
    this.state.messages.push(newValue)
  },
  deleteMessageAction (index) {
    if (this.debug) console.log('deleteMessageAction triggered with ', index)
    this.state.messages.splice(index, 1)
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.messages = []
  }
}

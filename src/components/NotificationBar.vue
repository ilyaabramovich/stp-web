<template>
  <b-notification
    @close="remove(notification)"
    auto-close
    duration="5000"
    :type="notificationType"
    >{{ notification.message }}</b-notification
  >
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'NotificationBar',

  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  computed: {
    notificationType() {
      return `is-${this.notification.type}`
    }
  },

  methods: mapActions('notification', ['remove'])
}
</script>

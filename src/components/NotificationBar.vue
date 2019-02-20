<template>
  <b-notification
    @close="remove(notification)"
    auto-close
    :type="notificationTypeClass"
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
      return this.notification.type === 'error'
        ? 'danger'
        : this.notification.type
    },

    notificationTypeClass() {
      return `is-${this.notificationType}`
    }
  },

  methods: mapActions('notification', ['remove'])
}
</script>

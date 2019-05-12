<template>
  <div class="container">
    <notification-bar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NotificationBar from '@/components/NotificationBar'
export default {
  name: 'NotificationContainer',
  components: {
    NotificationBar
  },
  computed: mapState('notification', ['notifications'])
}
</script>

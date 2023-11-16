<template>
  <slot v-if="checkPermission(has)"></slot>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { usePermissionStore } from '@/stores/permission';
export default {
  name: 'CAuth',
  props: {
    has: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapStores(usePermissionStore)
  },
  methods: {
    checkPermission(auth: string): boolean {
      return this.permissionStore.isAuth(auth);
    }
  }
};
</script>

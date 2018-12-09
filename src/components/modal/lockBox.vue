<template>
  <div>
    <v-dialog v-model="show" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2 center" primary-title>Please Contact us!</v-card-title>

        <v-card-text class="center">You had enter too many wrong passcode. Please contact us!!</v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
};
</script>


<template>
  <div>
    <v-dialog v-model="show" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2 center" primary-title>Thank you</v-card-title>

        <v-card-text class="center">Thank you for choosing us. Your box is opened</v-card-text>
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

<template>
  <div>
    <v-dialog v-model="show" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2 center" primary-title>Incorrect Passcode!</v-card-title>

        <v-card-text class="center">Incorrect passcode please try again!!</v-card-text>
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


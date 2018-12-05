<template>
  <div>
    <v-dialog v-model="show" persistent width="300" lazy>
      <v-card color="indigo" dark>
        <v-card-text>Loading...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
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

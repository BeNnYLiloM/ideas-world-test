<template>
  <div class="my-4 red--text">
    {{ errorText }}
  </div>
</template>

<script>
export default {
  name: 'ErrorFormMessage',
  props: {
    errorText: {
      type: String,
      required: true,
      default: 'Something was wrong...',
    },
  },
}
</script>

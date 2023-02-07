

<script setup>
const isVisible = ref(false)
const closeEvent = function () {
  isVisible.value = false;
}
const openEvent = function () {
  isVisible.value = true;
}
</script>

<template>
  <div>
    <modal :isVisible="isVisible" @close="closeEvent">
    </modal>
    <button @click="openEvent">
      モーダルを開く
    </button>
  </div>
</template>
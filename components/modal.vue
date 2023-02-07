<template >
<teleport to="body">
    <div class="modal" v-show="isVisible" @click="close">
    <div class="modal-content" ><slot/>{{  isVisible }}</div>
    </div>
</teleport>
</template>
    

<script setup lang="ts">
interface Props {
    isVisible: boolean;
}
interface Emits {
    (e: 'close', isVisible: boolean): void;
}
const emits = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
    isVisible: false
});

const close = function () {
    emits("close", props.isVisible)
}
</script>

<style scoped lang='sass'>
.modal
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  background-color: rgba(0,0,0,.5)
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

.modal-content
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  background-color: rgba(0,0,0,.5)
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  
  // モーダルの幅や色などはお好きにどうぞ！
  background-color: white
  width: 600px
  height: auto
  border-radius: 20px
  padding: 20px

</style>
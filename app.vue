

<script setup lang="ts">
import { read, writeFileXLSX, WorkSheet } from 'xlsx'

interface Emits {
  (e: "update:File", value: File): void;
}
const emits = defineEmits<Emits>()

const isVisible = ref(false)
const closeEvent = function () {
  isVisible.value = false;
}
const openEvent = function () {
  isVisible.value = true;
}

const selectedFile = ref<ArrayBuffer | null>(null)

const worksheetRef = ref<WorkSheet | null>()


const clearworksheetRef = function () {
  worksheetRef.value = null;
  // if (document?.getElementById?.("inputFile")) {
  //   (document?.getElementById?.("inputFile") as any).value = ""
  // }
  console.log('done: clearworksheetRef')
}

// ファイル選択確定時にEmit
const onFileSelectChange = (e: Event) => {
  console.log("onFileSelectChange")
  const target = e.target as HTMLInputElement
  const files = target.files
  const file = files![0]
  const reader = new FileReader()
  reader.addEventListener("load", (e) => {
  const buffer = reader.result
  if (!buffer) {
    return
  }
  try {
    const workbook = read(buffer)
    const sheetName = workbook.SheetNames[0]
    const value = workbook.Sheets[sheetName]
    worksheetRef.value = value
    console.log('done')
  } catch(e) {
    console.log('workbook:err', e);
  }
  })
  reader.readAsArrayBuffer(file)
}
</script>

<template>
  <div>
    <modal :isVisible="isVisible" @close="closeEvent">
      <input type="file" id="input-file"  @change="onFileSelectChange"/>
      <button @click="closeEvent" id="close">閉じる</button>
    </modal>
    <button @click="openEvent" id="open-modal">
      モーダルを開く
    </button>
    <button @click="clearworksheetRef" id="clear">
      clearworksheetRef
    </button>
  </div>
</template>
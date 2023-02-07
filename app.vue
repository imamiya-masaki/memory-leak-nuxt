

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

const worksheetRef = ref<WorkSheet>()

const why = ref<string>("ready:0");

const clearworksheetRef = function () {
  worksheetRef.value = undefined;
  why.value = "ready:" + String(Number(why.value.split(':')[1]) + 1);
  if (document?.getElementById?.("inputFile")) {
    (document?.getElementById?.("inputFile") as any).value = ""
  }
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
    console.log('none buffer', buffer)
    return
  }
  try {
    const workbook = read(buffer)
    const sheetName = workbook.SheetNames[0]
    const value = workbook.Sheets[sheetName]
    worksheetRef.value = value
    why.value = "done:" + String(Number(why.value.split(':')[1]));
    console.log('done')
    console.log('value', value)
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
      <input type="file" id="inputFile"  @change="onFileSelectChange"/>
      {{  why }}
    </modal>
    <button @click="openEvent">
      モーダルを開く
    </button>
    <button @click="clearworksheetRef">
      clearworksheetRef
    </button>
  </div>
</template>
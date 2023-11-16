<template>
  <div class="c-editor">
    <Toolbar
      class="c-editor-toolbar"
      :editor="editorRef"
      :defaultConfig="toolbarOptions"
      mode="default"
    />
    <Editor
      class="c-editor-container"
      v-model="content"
      mode="default"
      :defaultConfig="editorOptions"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue';
const editorRef = shallowRef();

function handleCreated(editor) {
  editorRef.value = editor;
}

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>
<script lang="ts">
import { defineComponent } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css';

export default defineComponent({
  emits: ['update:value'],
  props: {
    value: String
  },
  components: {
    Editor,
    Toolbar
  },
  created() {
    this.content = this.value;
  },
  data() {
    return {
      content: undefined as string | undefined,
      toolbarOptions: {
        toolbarKeys: ['headerSelect', 'fontSize', 'color', 'uploadImage']
      },
      editorOptions: {
        MENU_CONF: {
          uploadImage: {
            maxFileSize: 10 * 1024 * 1024,
            base64LimitSize: 10 * 1024 * 1024
          }
        }
      }
    };
  },
  watch: {
    content(val) {
      this.$emit('update:value', val);
    }
  }
});
</script>
<style lang="scss" scoped>
.c-editor {
  border: 1px solid #ccc;

  .c-editor-toolbar {
    border-bottom: 1px solid #ccc;
  }

  .c-editor-container {
    height: 500px !important;
    overflow-y: hidden;
  }
}
</style>

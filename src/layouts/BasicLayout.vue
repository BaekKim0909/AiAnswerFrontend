<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import { useRouter } from 'vue-router'
const rotuter = useRouter()
</script>

<template>
  <div id="basicLayout">
    <a-layout style="height: 100vh">
      <a-layout-header>
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <GlobalFooter />
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 28px;
  padding: 20px;
  background: linear-gradient(to right, #fefefe, #fff);
}

.footer {
  padding: 6px;
  text-align: center;
  background: #efefef;
}
</style>

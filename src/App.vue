<template>
  <div class="table-generator-app">
    <TablePreview />
    <CustomizeTable />
    <GenerateCode />
  </div>
</template>

<script>
import CustomizeTable from './components/CustomizeTable.vue';
import TablePreview from './components/TablePreview.vue';
import GenerateCode from './components/GenerateCode.vue';

import { useTableSettingsStore } from '@/stores/tableSettings';
import { storeToRefs } from "pinia";

export default {
  components: {
    CustomizeTable,
    TablePreview,
    GenerateCode
  },
}
</script>
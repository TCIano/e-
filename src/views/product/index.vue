<template>
  <div>
    <input-form></input-form>
    <form-item :tableHead="tableHead"></form-item>
  </div>
</template>

<script>
import InputForm from '@/components/form'
import FormItem from "@/components/form";
export default {
  components: {
    InputForm,
    FormItem
  },
  data() {
    return {
    tableHead: [
    {
    column_name: 'classId'
    column_comment: '序号'
    }
    ]
    };
  },

  created() {},

  methods: {},
};
</script>

<style scoped></style>

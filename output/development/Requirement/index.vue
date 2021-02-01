<template>
  <div>
    <!-- 条件查询 -->
    <div class="g-table-filter">
      <div class="g-table-filter-item">
        <span>迭代</span>
        <el-select v-model="iretion" placeholder="请选择迭代" clearable>
          <el-option
            v-for="item in options.sex"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <div class="g-table-filter-item">
        <span>迭代b</span>
        <el-select v-model="iretiaaaon" placeholder="请选择迭代b" clearable>
          <el-option
            v-for="item in options.sefffx"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <el-button @click="onQuery">查询</el-button>
    </div>

    <!-- 工具栏 -->
    <div class="g-table-toolbar">
      <el-button-group>
        <el-button @click="onCreate">新增</el-button>
        <el-button @click="onDeleteSelected">删除</el-button>
      </el-button-group>
    </div>

    <!-- 表格 -->
    <div class="g-table-grid">
      <el-table>
        <el-table-column
          label="标题"
          prop="name"
          width="200px"
        ></el-table-column>
        <el-table-column label="优先级">
          <template #default="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="迭代" prop="name"></el-table-column>
        <el-table-column label="负责人" prop="name"></el-table-column>
        <el-table-column label="计划开始时间" prop="name"></el-table-column>
        <el-table-column label="计划结束时间" prop="name"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 翻页 -->
    <div class="g-table-page">
      <el-pagination
        :current-page="table.page.currentPage"
        :page-size="table.page.pageSize"
        :total="table.page.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="table.onSizeChange"
        @current-change="table.onCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup>
import useOptions from './use.options.js'
import useTable from './use.table.js'
import useCreatePanel from './use.panel.create.js'

const options = useOptions()
const table = useTable()

const createPanel = useCreatePanel({
  success: () => {
    table.onQuery
  },
})
</script>

<style lang="scss" scoped></style>

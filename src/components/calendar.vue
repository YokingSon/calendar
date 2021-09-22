<template>
  <div class="mycalendar">
    <div class="header">
      <div class="triangle-left" @click="preMonth"></div>
      <span class="date-title">
        {{ date.getFullYear() }}-{{ prefixInteger(date.getMonth() + 1, 2) }}
      </span>
      <div class="triangle-right" @click="nextMonth"></div>
    </div>
    <el-calendar ref="calendar" :first-day-of-week="7" v-model="date">
      <template #dateCell="{ date }">
        <p class="calendar-item">
          <span>{{ date.getDate() }}</span>
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      date: new Date(),
    };
  },
  mounted() {
    this.$refs.calendar.$el.querySelector(".el-calendar__header").remove();
  },
  computed: {
    getDateStr() {},
  },
  methods: {
    prefixInteger(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
    preMonth() {
      this.$refs.calendar.selectDate("prev-month");
    },
    nextMonth() {
      this.$refs.calendar.selectDate("next-month");
    },
  },
};
</script>


<style scoped>
.mycalendar {
  width: 50%;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.date-title {
  margin: 0 20px;
  font-size: 20px;
  font-weight: bold;
  line-height: 30px;
}
.triangle-left {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-right: 10px solid black;
  border-bottom: 5px solid transparent;
  cursor: pointer;
}
.triangle-right {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-left: 10px solid black;
  border-bottom: 5px solid transparent;
  cursor: pointer;
}
.mycalendar >>> .el-calendar-table thead th:before {
  content: "周";
}

/* .mycalendar >>> .el-calendar {
  background-color: rgb(21, 65, 90);
} */

.mycalendar >>> .el-calendar-table thead th {
  background: #dadcdd;
  border: 2px solid #fff;
  height: 15px;
  color: black;
  padding: 5px 0;
  font-weight: bold;
}

.mycalendar >>> .el-calendar-table .el-calendar-day {
  height: 50px;
  padding: 3px;
}

.mycalendar >>> .el-calendar-table .el-calendar-day:hover {
  background-color: #dadcdd;
}

.mycalendar >>> .el-calendar-table td {
  border: 2px solid #fff;
}

.mycalendar >>> .el-calendar-table tr td:first-child {
  border: 2px solid #fff;
}

.mycalendar >>> .el-calendar-table tr:first-child td {
  border: 2px solid #fff;
}

.mycalendar >>> .el-calendar-table td.is-selected {
  background-color: #acc8ec;
  border: 2px solid #fff;
}

.calendar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-style: normal;
}
</style>

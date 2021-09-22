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
      <template #dateCell="{ date, data }">
        <div
          class="mybackground"
          :style="
            isPast(data, date)
              ? 'background:rgb(225, 245, 252)'
              : 'background:transparent'
          "
        >
          <div
            class="triangle-topright"
            v-if="isPlaned(data.day)"
            :style="
              data.isSelected
                ? 'border-top: 15px solid rgb(255, 183, 0)'
                : 'border-top: 15px solid rgb(14, 145, 248)'
            "
          ></div>
          <p class="calendar-item">
            <span>{{ date.getDate() }}</span>
          </p>
        </div>
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
      scheduleList: ["2021-09-21"],
    };
  },
  mounted() {
    this.$refs.calendar.$el.querySelector(".el-calendar__header").remove();
    this.getScheduleList();
  },
  computed: {},
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
    getScheduleList() {
      let url = "/api/getScheduleList";
      this.$axios
        .get(url)
        .then((response) => {
          this.scheduleList = response.data.data.mtime;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    isPlaned(day) {
      return this.scheduleList.includes(day);
    },
    isPast(data, date) {
      return date < new Date() && data.type === "current-month";
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
.triangle-topright {
  float: right;
  /* margin: -3px; */
  width: 0;
  height: 0;
  /* border-top: 15px solid rgb(14, 145, 248); */
  border-left: 15px solid transparent;
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
  background-color: rgb(255, 238, 185);
  border: 2px solid #fff;
}
.mycalendar >>> .el-calendar-table td.is-today {
  color: black;
}

.calendar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-style: normal;
}
.mybackground {
  position: absolute;
  transform: translateX(-3px) translateY(-3px);
  width: 87px;
  height: 50px;
}
.mybackground:hover {
  background-color: #dadcdd;
}
</style>

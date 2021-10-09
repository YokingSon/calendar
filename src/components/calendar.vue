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
        <el-popover placement="top-start" title="" trigger="click">
          <div v-if="isPlaned(data.day)" class="pop">
            <div class="popitem">
              <img src="@/assets/img/主题.png" />
              <div class="name">主题</div>
              <div class="value">关于xxxx管理制度的讨论会</div>
            </div>
            <div class="popitem">
              <img src="@/assets/img/日期.png" />
              <div class="name">日期</div>
              <div class="value">2021-09-10 10:00</div>
            </div>
            <div class="popitem">
              <img src="@/assets/img/备忘.png" />
              <div class="name">备忘</div>
              <div class="value">这是一个重要事项</div>
            </div>
          </div>
          <div v-else>
            <div class="popitem">
              <img src="@/assets/img/主题.png" />
              <div class="name">主题</div>
              <el-input
                placeholder="请输入主题"
                v-model="input.theme"
                clearable
              >
              </el-input>
            </div>
            <div class="popitem">
              <img src="@/assets/img/日期.png" />
              <div class="name">日期</div>
              <el-date-picker
                name="datetimePicker"
                v-model="input.time"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择时间日期"
                style="width: 100%"
              >
              </el-date-picker>
            </div>
            <div class="popitem">
              <img src="@/assets/img/备忘.png" />
              <div class="name">备忘</div>
              <el-input
                type="textarea"
                autosize
                placeholder="请输入备忘"
                v-model="input.memo"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div
            slot="reference"
            class="mybackground"
            :style="isPast(data, date)"
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
            <div class="calendar-item">
              <span>{{ date.getDate() }}</span>
            </div>
          </div>
        </el-popover>
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
      input: {
        theme: "",
        time: new Date(),
        memo: "",
      },
      cellWidth: 0,
      cellHeight: 0,
    };
  },
  mounted() {
    this.$refs.calendar.$el.querySelector(".el-calendar__header").remove();
    window.onresize = () => {
      this.cellWidth =
        this.$refs.calendar.$el.querySelector(".el-calendar-day").offsetWidth +
        "px";
      this.cellHeight =
        this.$refs.calendar.$el.querySelector(".el-calendar-day").offsetHeight +
        "px";
    };
    this.cellWidth =
      this.$refs.calendar.$el.querySelector(".el-calendar-day").offsetWidth +
      "px";
    this.cellHeight =
      this.$refs.calendar.$el.querySelector(".el-calendar-day").offsetHeight +
      "px";

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
      if (date < new Date() && data.type === "current-month") {
        if (data.isSelected) {
          return {
            background: "rgb(255, 238, 185)",
            width: this.cellWidth,
            height: this.cellHeight
          };
        } else {
          return {
            background: "rgb(225, 245, 252)",
            width: this.cellWidth,
            height: this.cellHeight
          };
        }
      } else {
        return {
          background: "transparent",
          width: this.cellWidth,
          height: this.cellHeight
        };
      }
    },
  },
};
</script>

<style scoped>
.mycalendar {
  width: 400px;
  height: 500px;
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
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  position: absolute;
  right: 0;
  top: 0;
}

.mycalendar >>>.el-calendar{
  height: 100%;
}

.mycalendar >>> .el-calendar__body{
  padding: 0;
  height: 100%;
}

.mycalendar >>> .el-calendar-table{
  height: 100%;
}

.mycalendar >>> .el-calendar-table thead th:before {
  content: "周";
}

.mycalendar >>> .el-calendar-table thead th {
  background: #dadcdd;
  border: 5px solid #fff;
  color: black;
  padding: 5px 0;
  font-weight: bold;
}

.mycalendar >>> .el-calendar-table .el-calendar-day {
  height: 100%;
  padding: 3px;
}

.mycalendar >>> .el-calendar-table .el-calendar-day:hover {
  background-color: transparent;
}

.mycalendar >>> .el-calendar-table td {
  border: 5px solid #fff;
}

.mycalendar >>> .el-calendar-table tr td:first-child {
  border: 5px solid #fff;
}

.mycalendar >>> .el-calendar-table tr:first-child td {
  border: 5px solid #fff;
}

.mycalendar >>> .el-calendar-table td.is-selected {
  background-color: rgb(255, 238, 185);
  border: 5px solid #fff;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.pop {
  display: flex;
  flex-direction: column;
}
.popitem {
  display: flex;
  padding: 2px 0;
  align-items: center;
}
.name {
  font-weight: bold;
  width: 45px;
}
.value {
  color: gray;
}
img {
  height: 17px;
  width: 15px;
  margin-right: 5px;
}
</style>

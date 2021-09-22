import Mock from 'mockjs'
//todo 更改为后端实现，可在network中记录
Mock.mock('\/api\/getScheduleList', {
  "state": 0,
  "data": {
    "mtime|100": ['@DATETIME("2021-MM-dd")'],
  }
})
Mock.setup({
  timeout: '200-600'
})

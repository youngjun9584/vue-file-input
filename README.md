## 정의
vue-file-input는 첨부파일에 대한 리스트를 보여주는 vue-component 입니다. vue2와 bootstrap4에 dependencies 가 있음 주의 바랍니다.
 - 첨부파일 데이터를 배열로 리턴
 - 파일사이즈 및 파일갯수를 제한 할 수 있음


![결과화면](img/screenshot.PNG)


## Getting Started
```shell
npm install vue-file-input
```

### Usage
#### Example
```html
<template>
  <vueFileInput
    :fileCount = 5
    :filelimitSizeByte = 10485760
    @getFileInfoArray = "fromFileInfoArray"
    :horizontal = true
  ></vueFileInput>
</template>

<script>
import vueFileInput from 'vue-file-input'
import  'vue-file-input/dist/vue-file-input.esm.css' //bootstrap4

export default {
  name: 'App',
  components: { vueFileInput },
  data () {
        return {
            fileInfo:[],
        }
    },
  methods:
  {
    fromFileInfoArray(array)
    {
        this.fileInfo = [...array];
    },
  }
}
</script>
```
----

#### Properties
| Property name | Type      | Default   | Required |Description                                                                                         |
| ------------- | --------- | --------- | -------- | -------------------------------------------------------------------------------------------------- |
| fileCount          | `Number`  | `5`         | ❌         |제한하는 파일갯수|
| filelimitSizeByte         | `Number`  | `10485760`         | ❌        | 제한하는 파일 크기|
| horizontal   | `Boolean`  | `false` | ❌        | 파일 리스트를 수평,수직으로 보여주는 설정 |
| getFileInfoArray     | `function` | ❌   | ✅       | 첨부파일 데이터를 배열로 리턴하는 함수|

----
### License
MIT
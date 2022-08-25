<!-- 
    작업자:park
    날짜:2021-04-08
    내용:여러 파일첨부에 대하여 리스트 및 삭제
 -->
<template>
    <div>
        <div class="custom-file" style="margin-bottom: 20px;">
            <input type="file" class="custom-file-input" ref='fileInfoArray' id="validatedCustomFile" @change='bindFileData()' multiple :disabled = "fileInfoArray.length> fileCount-1" >
            <label class="custom-file-label" for="validatedCustomFile">첨부파일 추가</label>
        </div>
        <ul class="list-group" :class="{'list-group-horizontal':horizontal}" style="margin-bottom: 15px;">
            <li class="list-group-item" v-for="(fileInfoArray , index) in fileInfoArray" :key="index">
                <div>
                    <span>{{fileInfoArray.name}}</span>
                    <span>-({{formatByteSizeString(fileInfoArray.size, 2)}})</span>
                    <button 
                            type="button" 
                            class="btn btn-outline-secondary btn-sm" 
                            style="float: right; border-color: #6c757d;"
                            @click="deleteFileArray(index)"
                    >
                        X
                    </button>
                </div>
            </li>
        </ul>
        <div class="progress" style="margin-bottom: 15px;">
            <div 
                    class="progress-bar" 
                    :class="{'bg-success':progressBarPercentage<50, 'bg-warning': (progressBarPercentage<70&&progressBarPercentage>50),'bg-danger':progressBarPercentage>70}" 
                    role="progressbar" 
                    v-bind:style="{width: progressBarPercentage+'%'}" 
                    aria-valuenow="25" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
            >
                {{formatByteSizeString(fileSumByte, 2)}}
            </div>
        </div>
        <small class="form-text text-muted">-첨부파일은 최대 {{fileCount}}개, {{formatByteSizeString(filelimitSizeByte, 2)}}까지 등록 가능합니다.</small>
    </div>
</template>

<script>
import './bootstrap_file_input.css';

export default {
    name: '',
    components: 
    {
    },
    props:
    {
        //초기값은 5개, 파일갯수
		fileCount:
		{
			type: Number,
			default: () => (5)
        },
        //초기값은 5개, 파일크기제한
		filelimitSizeByte:
		{
			type: Number,
			default: () => (10485760)
        },
        //파일 목록 가로 세로 여부
		horizontal:
		{
			type: Boolean,
			default: () => (false)
        },
    },
    data(){
        return {
            fileInfoArray:[],
            fileSumByte:0,
            progressBarPercentage: 0
        }
    },
    computed:
    {

    },
    watch: 
    {
        fileInfoArray: function()
        {
            //퍼센트 초기값 
            let sum = 0;
            let percentage = 0;
            for(var i=0; i< this.fileInfoArray.length; i++)
            {
                sum = sum + this.fileInfoArray[i].size;
            }
            percentage = (sum/this.filelimitSizeByte)*100;
            if(percentage < 100)
            {
                this.progressBarPercentage = percentage
                this.fileSumByte = sum
            }
            else
            {
                alert(`${this.formatByteSizeString(this.filelimitSizeByte, 2)}가 이상 입니다.`)
                this.deleteFileArray(this.fileInfoArray.length-1);
            }
            this.sendFileInfoArray();
        },
    },
    methods:
    {
        /* 
        - Date:2021-04-08
        - park
        - 파일첨부가 되어있을때 실행하는 메소드
        - return:X
        */
        bindFileData()
        {
            for(var i=0; i<this.$refs.fileInfoArray.files.length; i++)
            {
                if(this.fileInfoArray.length < this.fileCount)
                {
                    if(this.$refs.fileInfoArray.files[i])
                    {
                        //파일 바인딩
                        this.fileInfoArray.push(this.$refs.fileInfoArray.files[i]);
                    }
                    else
                    {
                        this.fileInfoArray = '';
                    }

                }
                else
                {
                    alert(`파일갯수는 최대 ${this.fileCount}개 입니다.`)
                    break;
                }
            }
        },
        /* 
        - Date:2021-04-08
        - park
        - 파일첨부가 배열에서 삭제하는 메소드
        - return:X
        */
        deleteFileArray(index)
        {
            this.fileInfoArray.splice(index,1);
        },
        /* 
        - Date:2021-04-08
        - park
        - 바이트 표시하는 메소드
        - return: string
        */
        formatByteSizeString(bytes, decimals)
        {
            if (bytes === 0) 
            {
                return '0 Byte';
            }
            const k = 1024;
            const dm = decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
        },
        sendFileInfoArray()
        {
            this.$emit('getFileInfoArray', this.fileInfoArray);
        },

    },
    created: function()
    {
    },
    mounted: function()
    {
    },
}
</script>

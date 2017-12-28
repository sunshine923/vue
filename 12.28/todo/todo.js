Vue.directive('focus',{
    inserted:function (val) {
        val.focus();
    }
})
new Vue({
    el:"#app",
    data:{
        all:localStorage.todo?JSON.parse(localStorage.todo):[],
        con:'',
        status:"all"
    },
    methods:{
        changestatus(a){
            this.status = a;
        },
        changestate(val){
            if(val.status==0){
                val.status=1;
            }else if(val.status==1){
                val.status=0;
            }
            localStorage.todo=JSON.stringify(this.all)
        },
        submit(){
            if(!this.con){
                alert("请输入内容");
                return;
            }
            let obj = {};
            obj.id=Math.random()+new Date().getTime();
            obj.title = this.con;
            obj.status = 0;
            obj.edit=true;
            this.all.push(obj);
            localStorage.todo=JSON.stringify(this.all)
            this.con=""
        },
        del(id){
            this.all = this.all.filter(ele=>{
                return ele.id!=id;
            })
            localStorage.todo=JSON.stringify(this.all)
        },
        edit(obj){
            obj.edit = !obj.edit;
            localStorage.todo=JSON.stringify(this.all)
        }
    },
    computed:{
        datas(){
            return this.all.filter((ele)=>{
                if(this.status=="all"){
                    return ele;
                }else{
                    return ele.status==this.status;
                }
            })
        }
    }
})
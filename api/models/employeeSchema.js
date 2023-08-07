const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//create the chema to stor the value of employee
const userschema= new Schema({
    //all the field for the employee data
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    joindate:{
        type:String,
        required:true
    }
    ,
    title:{
        type:String,
        required:true
    }
    ,
    department:{
        type:String,
        required:true
    },
    employeetype:{
        type:String,
        required:true
    },
    currentstatus:{
        type:String,
        required:true,
        default:1
    }

})
//naming the schema that will reflect in your mongodb database
const employee= mongoose.model('employee',userschema)
module.exports=employee;
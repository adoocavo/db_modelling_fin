/////////////////////////////////////
/////기본 셋팅/////////////////////////
/////서버 띄우기 + (DB-서버)-ODM 연결/////
////////////////////////////////////

//서버 띄우기
const express = require('express');
const app = express();

//body-parser 라이브러리 사용 셋팅
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

// application/JSON type 으로 들어오는 데이터를 req.body로 파싱 
app.use(express.json());
const PORT = 8181
app.listen(PORT, ()=>{
    console.log('server listening on ' + PORT);
  });

//몽고디비랑 몽구스(ODM) connect
const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://adoocavo:rkdwn%403521@cavo.avwd3gl.mongodb.net/cavo?retryWrites=true&w=majority';

mongoose.connect( dbUrl, {
    dbName:'pairProgramming_new',
    useNewUrlParser: true,
    useUnifiedTopology: true,
},  (err) => {
    if(err){return console.log(err);}
    else{console.log("DB/ODM is connected");}
}
);
//모듈(모델) 가져오기
const Questions = require('./Models/questionsModel');

//idePage router
app.use('/test', require('./Routes/idePage.js'));    


/////////////////////////////////////
/////기본 셋팅/////////////////////////
/////서버 띄우기 + (DB-서버)-ODM 연결_end/////
////////////////////////////////////


/////////////////////////////////////
//////DB에 잘 저장됐나 확인_페어프로그래밍에는_의미없는 코드//////////////
////////////////////////////////////
Questions.findOne({problem_id: 1}, (err, result)=>{
    if(err){console.log(err);}
    else{
        console.log(result);
    
    //배열로 들어간 testCase_input 확인 
    // for(var i = 0; i < result.testCase.testCase_input.length; i++){ 
    //     for(var j = 0; j < result.testCase.testCase_input[i].length; j++){
    //     console.log(result.testCase.testCase_input[i][j]);
    //     }
    // }    
    }
});


//problem_level 넘겨준다 -> 2개 aggreate 해서 주기
//problem_level 전달받아서 해당하는 2개 Document 무작위로 배열 리턴
run()
async function run() {
const test_plz_1 = await Questions.aggregate([
                { $match: { problem_level :3 }},
                { $sample: {size: 2}}

            ]);            
            console.log("여기 알고싶어: ")
            console.log(test_plz_1);
            console.log("여기까지 ");
            
}

/////////////////////////////////////
//////DB에 잘 저장됐나 확인_의미없는 코드_end//////////////
////////////////////////////////////
            
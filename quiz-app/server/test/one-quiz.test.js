const _ = require('lodash')
const expect = require('chai').expect;
const axios = require('axios')

// create new quiz
// get the quiz
// get the questions and make sure they're right
// we answer two questions
// ensure results returns the correct # of answers
// delete the quiz

const testingQuiz = {
    id: "5",
    name: "Republican or democrat house",
    questions: [
        { id: 0, text: "republican or democrat?", hiddenText: "Ted Cruz", photoId: "Republican_(TedCruz).jpg", answers: [
            {answerId: 0, answerText: "republican", correct: true}, 
            {answerId: 1, answerText: "democratic", correct: false}
        ]},
        { id: 1, text: "republican or democrat?", hiddenText: "Bernie Sanders", photoId: "Democrat_(BernieSanders).png", answers: [
            {answerId: 0, answerText: "republican", correct: false}, 
            {answerId: 1, answerText: "democratic", correct: true}
        ]}
    ],
    instructions: "test instructions"
}

const testingAnswer1 = {
    quiz_id: 3,
    answer_number: 0,
    question_id: 0,
    area_selected:{
        x: 3,
        y: 8
    }
}

const testingAnswer2 = {
    quiz_id: 3,
    answer_number: 1,
    question_id: 1,
    area_selected:{
        x: 7,
        y: 7
    }
}


describe('Basic Quiz Functionality', () => {
    var response_id
    it('should succsesfully create a quiz', (done) => {
        axios.post('http://localhost:3000/api/schema', testingQuiz).then(res => {
            expect(res.status).to.equal(201)
            expect(res.data.success).to.be.true
            expect(res.data.id).to.be.a('string')
            expect(res.data.message).to.equal('Quiz created!')
            done()
        }).catch(err => {
            done(err)
        })
    });
    it('should successfully get the quiz', (done) => {
        axios.get('http://localhost:3000/api/schema/'+testingQuiz.id).then(res => {
            expect(res.status).to.equal(200)
            expect(res.data.success).to.be.true
            expect(res.data.data.quiz.quiz_id).to.equal("" + testingQuiz.id) 
            expect(res.data.data.quiz.quiz_name).to.equal(testingQuiz.name)
            expect(res.data.data.quiz.quiz_instructions).to.equal(testingQuiz.instructions)
            expect(res.data.data.quiz.questions).to.deep.equal(_.map(testingQuiz.questions, (v) => v.id))
            response_id = res.data.data.response_id
            done()
        }).catch(err => {
            done(err)
        })
    });
    it('should successfully get the second question', (done) => {
        axios.get('http://localhost:3000/api/question/' + testingQuiz.id + '/' + testingQuiz.questions[1].id).then(res => {
            expect(res.status).to.equal(200)
            expect(res.data.success).to.be.true
            expect(res.data.data.question_text).to.equal(testingQuiz.questions[1].text)
            expect(res.data.data.question_photo_id).to.equal(testingQuiz.questions[1].photoId)
            expect(res.data.data.hiddenText).to.equal(testingQuiz.questions[1].hiddenText)
            _.forEach(res.data.data.answers, (answer, index) => {
                const model_answer = testingQuiz.questions[1].answers[index]
                expect(answer.answerId).to.equal(model_answer.answerId)
                expect(answer.answerText).to.equal(model_answer.answerText)
                expect(answer.correct).to.equal(model_answer.correct)
                expect(answer.percentOfAnswer).to.be.a('number')
            })
            done()
        }).catch(err => {
            done(err)
        })
    });
    it('should successfully answer two questions', (done) => {
        const testingAnswer1WithResponseId = _.assign({ 'response_id': response_id }, testingAnswer1)
        console.log(response_id)
        axios.post('http://localhost:3000/api/answer', testingAnswer1WithResponseId).then(res => {
            expect(res.status).to.equal(200)
            expect(res.data.success).to.be.true
            expect(res.data.id).to.be.a('string')
            expect(res.data.message).to.equal('Response updated!')
            const testingAnswer2WithResponseId = _.assign({ 'response_id': response_id }, testingAnswer2)
            axios.post('http://localhost:3000/api/answer', testingAnswer2WithResponseId).then(res => {
                expect(res.status).to.equal(200)
                expect(res.data.success).to.be.true
                expect(res.data.id).to.be.a('string')
                expect(res.data.message).to.equal('Response updated!')
                done()
            }).catch(err => {
                done(err)
            })
        }).catch(err => {
            done(err)
        })
    });
    it('should successfully ensure results returns the correct # of answers', (done) => {
        axios.get('http://localhost:3000/api/results/' + testingQuiz.id + "/" + response_id).then(res => {
            expect(res.status).to.equal(200)
            console.log(res.data)
            expect(res.data.success).to.be.true
            expect(res.data.data.numWrong).to.equal(0)
            expect(res.data.data.numCorrect).to.equal(2)
            done()
        }).catch(err => {
            done(err)
        })
    });
    it('should succsesfully delete the quiz', (done) => {
        axios.delete('http://localhost:3000/api/schema/' + testingQuiz.id).then(res => {
            expect(res.status).to.equal(201)
            expect(res.data.success).to.be.true
            expect(res.data.message).to.equal('Quiz deleted!')
            done()
        }).catch(err => {
            done(err)
        })
    });
});
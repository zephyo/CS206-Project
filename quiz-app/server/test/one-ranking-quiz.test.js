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
    id: "6",
    name: "Covid Vaccine Priority Ranking",
    photo_base_url: "stateflags",
    questions: [
        { id: 0, question_type: "ranking", text: "Rank the COVID Vaccine Priority in the state of Georgia", photoId: "Republican_(TedCruz).jpg", answers: [
            {answerId: 0, answerPhoto: "Republican_(TedCruz).jpg", answerText: "Healthcare worker", correct: 0}, 
            {answerId: 1, answerPhoto: "Republican_(TedCruz).jpg", answerText: "55 year old person", correct: 1},
            {answerId: 2, answerPhoto: "Republican_(TedCruz).jpg", answerText: "Teenager", correct: 2}
        ]},
        { id: 1, question_type: "ranking", text: "Rank the COVID Vaccine Priority in the state of Florida", photoId: "Democrat_(BernieSanders).png", answers: [
            {answerId: 0, answerPhoto: "Republican_(TedCruz).jpg", answerText: "Healthcare worker", correct: 1}, 
            {answerId: 1, answerPhoto: "Republican_(TedCruz).jpg", answerText: "55 year old person", correct: 0},
            {answerId: 2, answerPhoto: "Republican_(TedCruz).jpg", answerText: "Teenager", correct: 2}
        ]}
    ],
    instructions: "Drag and rank the quiz"
}

const testingAnswer1 = {
    quiz_id: 6,
    question_id: 0,
    answer: {
        answer_order: [0, 1, 2]
    }
}

const testingAnswer2 = {
    quiz_id: 6,
    question_id: 1,
    answer: {
        answer_order: [0, 1, 2]
    }
}


describe('Basic Ranking Quiz Functionality', () => {
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
            expect(res.data.data.question_type).to.equal(testingQuiz.questions[1].question_type)
            expect(res.data.data.question_photo_id).to.equal("http://localhost:8000/photos/" + testingQuiz.photo_base_url + "/" + testingQuiz.questions[1].photoId)
            expect(res.data.data.hidden_text).to.be.an('undefined')
            _.forEach(res.data.data.answers, (answer, index) => {
                const model_answer = testingQuiz.questions[1].answers[index]
                expect(answer.answerId).to.equal(model_answer.answerId)
                expect(answer.answerText).to.equal(model_answer.answerText)
                expect(answer.answerPhoto).to.equal("http://localhost:8000/photos/" + testingQuiz.photo_base_url + "/" + model_answer.answerPhoto)
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
            expect(res.data.success).to.be.true
            expect(res.data.data.numWrong).to.equal(2)
            expect(res.data.data.numCorrect).to.equal(4)
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
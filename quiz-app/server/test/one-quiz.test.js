const expect = require('chai').expect;
const axios = require('axios')

// create new quiz
// get the quiz
// get the questions and make sure they're right
// we answer two questions
// ensure results returns the correct # of answers
// delete the quiz

const testingQuiz = {
    id: 3,
    name: "Republican or democrat house",
    questions: [
        { id: 0, text: "republican or democrat?", photoId: "Republican_(TedCruz).jpg", answers: [
            {answerId: 0, answerText: "republican", correct: true}, 
            {answerId: 1, answerText: "democratic", correct: false}
        ]},
        { id: 1, text: "republican or democrat?", photoId: "Democrat_(BernieSanders).png", answers: [
            {answerId: 0, answerText: "republican", correct: false}, 
            {answerId: 1, answerText: "democratic", correct: true}
        ]}
    ],
}


describe('Basic Quiz Functionality', () => {

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
    it('should succsesfully get the quiz', (done) => {
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
    it('should succsesfully get the questions and make sure they"re right', (done) => {
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
    it('should succsesfully answer two questions', (done) => {
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
    it('should succsesfully ensure results returns the correct # of answers', (done) => {
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
    it('should succsesfully delete the quiz', (done) => {
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
});
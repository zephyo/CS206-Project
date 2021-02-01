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

    it('should be a succsesful search', (done) => {
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
    // it('should be a succsesful search', (done) => {
    //     runSmoothieSearch((error, response, body) => {
    //         expect(response.statusCode).to.equal(200);    
    //         expect(body.success).to.equal(true);
    //         done();
    //     })
    // });
    // it('should return at least one result', (done) => {
    //     runSmoothieSearch((error, response, body) => {
    //         expect(body.data).to.have.length.of.at.least(1);
    //         done();
    //     })
    // });
    // it('should include correct properties', (done) => {
    //     runSmoothieSearch((error, response, body) => {
    //         expect(body.data[0].name).to.be.a('string')
    //         expect(body.data[0].readyInMinutes).to.be.a('number')
    //         expect(body.data[0].servings).to.be.a('number')
    //         expect(body.data[0].imageUrl).to.be.a('string')
    //         expect(body.data[0].recipeUrl).to.be.a('string')
    //         done();
    //     })
    // });
});
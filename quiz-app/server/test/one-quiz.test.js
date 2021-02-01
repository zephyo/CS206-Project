const expect = require('chai').expect;
var request = require('request')

const runSmoothieSearch = (callback) => {
    request('http://localhost:3000/api/search/smoothie' , function(error, response, body) {
        callback(error, response, JSON.parse(body))
    });
}
describe('Recipe Search', () => {
    it('should be a succsesful search', (done) => {
        runSmoothieSearch((error, response, body) => {
            expect(response.statusCode).to.equal(200);    
            expect(body.success).to.equal(true);
            done();
        })
    });
    it('should return at least one result', (done) => {
        runSmoothieSearch((error, response, body) => {
            expect(body.data).to.have.length.of.at.least(1);
            done();
        })
    });
    it('should include correct properties', (done) => {
        runSmoothieSearch((error, response, body) => {
            expect(body.data[0].name).to.be.a('string')
            expect(body.data[0].readyInMinutes).to.be.a('number')
            expect(body.data[0].servings).to.be.a('number')
            expect(body.data[0].imageUrl).to.be.a('string')
            expect(body.data[0].recipeUrl).to.be.a('string')
            done();
        })
    });
});
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

//our API
export const getQuizSchema = (quiz_id) => api.get(`/schema/${quiz_id}`)
//We keep track of responses based on your session. Need to call getQuizSchema each time a new quiz is started
/*
{
    "quiz": {
        "quiz_id": integer
        "questions": [integer (of questionIDs)],
        "quiz_name": string,
        "quiz_instructions": string
    },
    "response_id": integer
}
*/
export const getQuestionById = (quiz_id, question_id) => api.get(`/question/${quiz_id}/${question_id}`)
/*
{
    "question_text": string,
    "question_photo_id": string,
    "answers" : [{answerId: Number, answerText: String, correct: Boolean}]
}
*/
export const getPhotoById = id => api.get(`/photo/${id}`)
/*
{
    "url": url
}
*/
export const sendAnswer = payload => api.post(`/answer`, payload)
/*
payload:
{
    "quiz_id": integer,
    "response_id": integer,
    "answer_number": integer,
    "question_id": integer,
    "area_selected":{
        "x": integer,
        "y": integer
    }
}
*/
export const getEndResults = (quiz_id, response_id) => api.get(`/results/${quiz_id}/${response_id}`)
/*
{
    "numCorrect": integer,
    "numWrong": integer
}
*/

//old API
export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,

    getQuizSchema,
    getQuestionById,
    getPhotoById,
    sendAnswer,
    getEndResults
}

export default apis
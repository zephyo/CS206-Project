import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

//our API
export const getQuizSchema = (quiz_id) => api.get(`/schema/${quiz_id}`)
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
//correct is a 0 or 1 if question type is mutliple_choice or a zero indexed index corresponding to the correct order if it’s a ranking question
/*
{
    "question_text": string,
    "question_photo_id": string,
    "question_type": multiple_choice | ranking
    "answers" : [{answerId: Number, answerPhoto: String, answerText: String, correct: Number, percentOfAnswer: Number}],
    "hidden_text": string
}
*/
export const getPhotoById = (quiz_id, photo_id) => api.get(`/photo/${quiz_id}/${id}`)
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
    "question_id": integer,
    "response_id": integer,
    "answer": multiple_choice: {
        "answer_number": integer,
        "area_selected":{
            "x": integer,
            "y": integer
        }
    } | ranking: {
        answer_order: [answer_ids]
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
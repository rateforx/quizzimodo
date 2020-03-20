import React, { useState }                                    from 'react';
import { Button, ButtonGroup, Form, FormGroup, Input, Label } from 'reactstrap';
import axios                                                  from 'axios';

const categories = JSON.parse(
    `[{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]`,
);

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle ( a ) {
    for ( let i = a.length - 1; i > 0; i-- ) {
        const j            = Math.floor( Math.random() * ( i + 1 ) );
        [ a[ i ], a[ j ] ] = [ a[ j ], a[ i ] ];
    }
    return a;
}

export default function Quiz ( props ) {

    const [ category, setCategory ]     = useState( 9 );
    const [ difficulty, setDifficulty ] = useState( 'easy' );
    const [ questions, setQuestions ]             = useState( [] );
    // let questions                       = [];
    // const [ currentQuestion, setCurrentQuestion ] = useState( 0 );
    let currentQuestion                 = 0;
    // const [ answers, setAnswers ]       = useState( [] );
    let answers                         = [];
    // const [ correctAnswer, setCorrectAnswer ]     = useState( undefined );
    let correctAnswer                   = undefined;

    async function handleSubmit ( event ) {
        event.preventDefault();
        let url =
                `https://opentdb.com/api.php?\
                amount=10&\
                type=multiple&\
                category=${ category }&\
                difficulty=${ difficulty }`
        ;

        let { data : { results } } = await axios.get( url );
        setQuestions( results );
        // questions                  = results;
        // await setCurrentQuestion( 0 );
        currentQuestion            = 0;
        // setCorrectAnswer( questions[ currentQuestion ].correct_answer );
        // correctAnswer              = questions[ currentQuestion ].correct_answer;
        // setAnswers( shuffle( [
        // answers                    = shuffle( [
        //     ...questions[ correctAnswer ].incorrect_answers,
        //     correctAnswer,
        // ] );
    }

    function handleAnswer ( event ) {
    }

    function renderAnswersShuffled( ) {
        answers                    = shuffle( [
            ...questions[ correctAnswer ].incorrect_answers,
            correctAnswer,
        ] );
        return answers.map( answer => {
            return <Button
                color = 'warning'
                className = 'text-black col-12 col-md-6'
            >{ answer }</Button>;
        } );
    }

    return (
        <div className = 'quiz'>
            { questions.length === 0 ? (
                <Form onSubmit = { handleSubmit }>
                    <FormGroup>
                        <Label for = 'categorySelect'>Category</Label>
                        <Input type = 'select'
                               name = 'category'
                               id = 'categorySelect'
                               defaultValue = { categories[ 0 ].id }
                               onChange = { event => {
                                   setCategory( event.target.value );
                               } }
                        >
                            { categories.map( category => {
                                return (
                                    <option key = { category.id } value = { category.id }>{ category.name }</option>
                                );
                            } ) }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for = 'difficultySelect'>Difficulty</Label>
                        <Input type = 'select'
                               name = 'difficulty'
                               id = 'difficultySelect'
                               defaultValue = 'easy'
                               onChange = { event => {
                                   setDifficulty( event.target.value );
                               } }
                        >
                            <option value = 'easy'>Easy</option>
                            <option value = 'medium'>Medium</option>
                            <option value = 'hard'>Hard</option>
                        </Input>
                    </FormGroup>
                    <Button color = 'success' size = 'lg'>Start</Button>
                </Form>
            ) : (
                <div className = 'question'>
                    <h3>{ questions[ currentQuestion ].question }</h3>
                    { renderAnswersShuffled() }
                </div>
            ) }
        </div>
    );

}
import React, { Component }                                from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import axios                                               from 'axios';

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

export default class Quiz extends Component {

    state = {
        category        : 9,
        difficulty      : 'easy',
        questions       : [],
        currentQuestion : 0,
        answers         : [],
        correctAnswer   : undefined,
    };

    async handleSubmit ( event ) {
        event.preventDefault();
        let url = `\
                https://opentdb.com/api.php?\
                amount=10&\
                type=multiple&\
                category=${ this.state.category }&\
                difficulty=${ this.state.difficulty }\
                `
        ;

        let { data : { results } } = await axios.get( url );

        this.setState( {
            questions       : results,
            currentQuestion : 0,
            answers         : shuffle( [
                ...results[ 0 ].incorrect_answers,
                results[ 0 ].correct_answer,
            ] ),
            correctAnswer   : results[ 0 ].correct_answer,
        } );
    }

    handleAnswer ( event ) {

    }

    render () {
        return (
            <div className = 'quiz'>
                { this.state.questions.length === 0 ? (
                    <Form onSubmit = { event => { this.handleSubmit( event ); } }>
                        <FormGroup>
                            <Label for = 'categorySelect'>Category</Label>
                            <Input type = 'select'
                                   name = 'category'
                                   id = 'categorySelect'
                                   defaultValue = { categories[ 0 ].id }
                                   onChange = { event => {
                                       this.setState( { category : event.target.value } );
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
                                       this.setState( { difficulty : event.target.value } );
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
                        <h3>
                            { decodeURI( this.state.questions[ this.state.currentQuestion ].question ) }
                        </h3>
                        <div className = 'answers'>
                            { this.state.questions[ this.state.currentQuestion ].answers.map( answer => {
                                return (
                                    <Col xs='6'>
                                        { answer }
                                    </Col>
                                );
                            } ) }
                        </div>
                    </div>
                ) }
            </div>
        );
    }

}
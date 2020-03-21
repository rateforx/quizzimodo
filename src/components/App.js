import React          from 'react';
import { Container }  from 'reactstrap';
import logo           from '../assets/quiz.svg';
import '../styles/App.css';
import Quiz from './Quiz';

function App () {
    return (
        <Container>
            <div className = "app">
                <header className='py-5'>
                    <img src = { logo } alt = 'quiz logo' height = '100' width = 'auto'/>
                </header>
                <Quiz/>
            </div>
        </Container>
    );
}

export default App;

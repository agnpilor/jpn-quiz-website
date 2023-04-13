import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactMarkdown from 'react-markdown';
import "../styles/Examples.css";

const Example = () => {
    const { chapterId } = useParams();
    const [examples, setExamples] = useState([]);
    const [showExamples, setShowExamples] = useState(false);

    const fetchExamples = async () => {
        const quizDoc = doc(db, "quizlist", "quiz", "Chapters", chapterId);
        const quizDocData = await getDoc(quizDoc);
        const examplesData = quizDocData.data().examples || [];
        setExamples(examplesData);
    }
    
    useEffect(() => {
        fetchExamples();
    }, []);

    const handleToggleExamples = () => {
        setShowExamples(!showExamples);
    }

    return (
        <div className="quizview-examples">
            {examples.length > 0 && (
                <button onClick={handleToggleExamples}>{showExamples ? 'Hide Examples' : 'Show Examples'}</button>
            )}
            <div className="quizview-body">
                {showExamples && examples.map((example, index) => (
                    <div key={index}>
                        <ReactMarkdown>{example}</ReactMarkdown>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Example;

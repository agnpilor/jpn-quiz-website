import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import ReactMarkdown from 'react-markdown';

const Example = () => {
    const { chapterId } = useParams();
    const [examples, setExamples] = useState([]);

    const fetchExamples = async () => {
        const quizDoc = doc(db, "quizlist", "quiz", "Chapters", chapterId);
        const quizDocData = await getDoc(quizDoc);
        const examplesData = quizDocData.data().examples || [];
        setExamples(examplesData);
    }
    
    useEffect(() => {
        fetchExamples();
    }, []);

    return (
        <div className="quizview-examples">
            {examples.map((example, index) => (
                <div key={index}>
                    <ReactMarkdown>{example}</ReactMarkdown>
                </div>
            ))}
        </div>
    )
}

export default Example;